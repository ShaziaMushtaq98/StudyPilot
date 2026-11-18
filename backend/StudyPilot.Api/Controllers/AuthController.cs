
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudyPilot.Api.Data;
using StudyPilot.Api.Models;

namespace StudyPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDb _db;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(
            AppDb db,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration)
        {
            _db = db;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("StudyPilot API is working!");
        }

        // Parent Registration
        [HttpPost("register-parent")]
        public async Task<IActionResult> RegisterParent(
            ParentRegisterRequest request)
        {
            string normalizedIdentifier =
                request.Identifier.Trim().ToUpperInvariant();

            bool exists = await _db.Users.AnyAsync(
                u => u.NormalizedIdentifier == normalizedIdentifier);

            if (exists)
            {
                return Conflict(new
                {
                    message = "Identifier already registered."
                });
            }

            var user = new User
            {
                Identifier = request.Identifier.Trim(),
                NormalizedIdentifier = normalizedIdentifier,
                DisplayName = request.DisplayName.Trim(),
                Role = Role.Parent,
                IsActive = true
            };

            user.PasswordHash = _passwordHasher.HashPassword(
                user, request.Password);

            var parentProfile = new ParentProfile
            {
                UserId = user.Id,
                PinHash = string.Empty
            };

            _db.Users.Add(user);
            _db.ParentProfiles.Add(parentProfile);

            await _db.SaveChangesAsync();

            return Created("", new
            {
                message = "Parent registered successfully!",
                userId = user.Id,
                displayName = user.DisplayName
            });
        }

        // Parent Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            ParentLoginRequest request)
        {
            string normalizedIdentifier =
                request.Identifier.Trim().ToUpperInvariant();

            var user = await _db.Users.FirstOrDefaultAsync(
                u => u.NormalizedIdentifier == normalizedIdentifier);

            if (user == null || !user.IsActive)
            {
                return Unauthorized(new
                {
                    message = "Invalid identifier or password."
                });
            }

            if (user.Role != Role.Parent)
            {
                return Unauthorized(new
                {
                    message = "Invalid identifier or password."
                });
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);

            if (passwordResult == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message = "Invalid identifier or password."
                });
            }

            string jwtKey = _configuration["Jwt:Key"]!;
            string jwtIssuer = _configuration["Jwt:Issuer"]!;
            string jwtAudience = _configuration["Jwt:Audience"]!;

            int expiryMinutes =
                _configuration.GetValue<int>("Jwt:ExpiryMinutes");

            DateTime expiresAt =
                DateTime.UtcNow.AddMinutes(expiryMinutes);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.DisplayName),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey));

            var credentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials
            );

            string tokenString =
                new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                message = "Login successful!",
                token = tokenString,
                expiresAt = expiresAt,
                user = new
                {
                    id = user.Id,
                    displayName = user.DisplayName,
                    identifier = user.Identifier,
                    role = user.Role.ToString()
                }
            });
        }
    }

    public class ParentRegisterRequest
    {
        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.MaxLength(256)]
        public string Identifier { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.MaxLength(100)]
        public string DisplayName { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.MinLength(8)]
        public string Password { get; set; } = string.Empty;
    }

    public class ParentLoginRequest
    {
        [System.ComponentModel.DataAnnotations.Required]
        public string Identifier { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required]
        public string Password { get; set; } = string.Empty;
    }
}
