
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyPilot.Api.Data;
using StudyPilot.Api.Models;

namespace StudyPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Parent")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDb _db;
        private readonly IPasswordHasher<User> _passwordHasher;

        public StudentsController(
            AppDb db,
            IPasswordHasher<User> passwordHasher)
        {
            _db = db;
            _passwordHasher = passwordHasher;
        }

        [HttpGet("my-children")]
        public async Task<IActionResult> GetMyChildren()
        {
            // Get logged-in parent's ID from JWT
            string? parentIdString =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(parentIdString, out Guid parentId))
            {
                return Unauthorized();
            }

            // Get students linked to this parent
            var children = await _db.ParentChildren
                .Where(pc => pc.ParentUserId == parentId)
                .Include(pc => pc.Student)
                .ThenInclude(s => s.StudentProfile)
                .Select(pc => new
                {
                    id = pc.Student.Id,
                    displayName = pc.Student.DisplayName,
                    identifier = pc.Student.Identifier,
                    classLevel = pc.Student.StudentProfile!.ClassLevel,
                    schoolName = pc.Student.StudentProfile.SchoolName
                })
                .ToListAsync();

            return Ok(children);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterStudent(
            StudentRegisterRequest request)
        {
            // Get the logged-in parent's ID from the JWT
            string? parentIdString =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(parentIdString, out Guid parentId))
            {
                return Unauthorized(new
                {
                    message = "Invalid parent identity."
                });
            }

            // Verify that this parent exists
            var parent = await _db.Users.FirstOrDefaultAsync(
                u => u.Id == parentId && u.Role == Role.Parent);

            if (parent == null)
            {
                return Unauthorized(new
                {
                    message = "Parent account not found."
                });
            }

            // Normalize student identifier
            string normalizedIdentifier =
                request.Identifier.Trim().ToUpperInvariant();

            // Check if identifier is already registered
            bool exists = await _db.Users.AnyAsync(
                u => u.NormalizedIdentifier == normalizedIdentifier);

            if (exists)
            {
                return Conflict(new
                {
                    message = "This identifier is already registered."
                });
            }

            // Create student user
            var student = new User
            {
                Identifier = request.Identifier.Trim(),
                NormalizedIdentifier = normalizedIdentifier,
                DisplayName = request.DisplayName.Trim(),
                Role = Role.Student,
                IsActive = true
            };

            // Hash student password
            student.PasswordHash = _passwordHasher.HashPassword(
                student, request.Password);

            // Create student profile
            var studentProfile = new StudentProfile
            {
                UserId = student.Id,
                ClassLevel = request.ClassLevel,
                SchoolName = request.SchoolName.Trim(),
                PassMarkPercent = 70,
                MaxAttempts = 3
            };

            // Link student to the currently logged-in parent
            var parentChild = new ParentChild
            {
                ParentUserId = parent.Id,
                StudentUserId = student.Id
            };

            // Save all three records
            _db.Users.Add(student);
            _db.StudentProfiles.Add(studentProfile);
            _db.ParentChildren.Add(parentChild);

            await _db.SaveChangesAsync();

            return Created("", new
            {
                message = "Student registered and linked successfully!",
                student = new
                {
                    id = student.Id,
                    displayName = student.DisplayName,
                    identifier = student.Identifier,
                    role = student.Role.ToString()
                },
                profile = new
                {
                    classLevel = studentProfile.ClassLevel,
                    schoolName = studentProfile.SchoolName,
                    passMarkPercent = studentProfile.PassMarkPercent,
                    maxAttempts = studentProfile.MaxAttempts
                }
            });
        }
    }

    public class StudentRegisterRequest
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

        [System.ComponentModel.DataAnnotations.Range(1, 12)]
        public int ClassLevel { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.MaxLength(200)]
        public string SchoolName { get; set; } = string.Empty;
    }
}
