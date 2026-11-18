
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public AuthController(
            AppDb db,
            IPasswordHasher<User> passwordHasher)
        {
            _db = db;
            _passwordHasher = passwordHasher;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("StudyPilot API is working!");
        }

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
}
