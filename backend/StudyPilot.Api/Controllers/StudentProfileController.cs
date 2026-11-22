using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using StudyPilot.Api.Data;

namespace StudyPilot.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Student")]
public class StudentProfileController : ControllerBase
{
    private readonly AppDb _db;

    public StudentProfileController(AppDb db)
    {
        _db = db;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (studentId == null)
            return Unauthorized();

        var student = await _db.Users
            .Include(u => u.StudentProfile)
            .FirstOrDefaultAsync(u => u.Id.ToString() == studentId);

        if (student == null || student.StudentProfile == null)
            return NotFound("Student profile not found.");

        return Ok(new
        {
            student.Id,
            student.DisplayName,
            student.Identifier,
            ClassLevel = student.StudentProfile.ClassLevel,
            SchoolName = student.StudentProfile.SchoolName,
            PassMarkPercent = student.StudentProfile.PassMarkPercent,
            MaxAttempts = student.StudentProfile.MaxAttempts
        });
    }
}