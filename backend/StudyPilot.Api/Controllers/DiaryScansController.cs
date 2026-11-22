using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyPilot.Api.Data;
using StudyPilot.Api.Models;
using System.Security.Claims;
using StudyPilot.Api.DTOs;
namespace StudyPilot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Student")]
    public class DiaryScansController : ControllerBase
    {
        private readonly AppDb _db;
        private readonly IWebHostEnvironment _environment;

        public DiaryScansController(
            AppDb db,
            IWebHostEnvironment environment)
        {
            _db = db;
            _environment = environment;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetDiaryScan(Guid id)
        {
            var studentIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(studentIdClaim, out var studentId))
                return Unauthorized();

            var scan = await _db.DiaryScans
                .Where(d => d.Id == id &&
                            d.StudentUserId == studentId)
                .Select(d => new DiaryScanResponse
                {
                    Id = d.Id,
                    Status = d.Status.ToString(),
                    ExtractedText = d.ExtractedText,
                    UploadedAt = d.UploadedAt,
                    ConfirmedAt = d.ConfirmedAt
                })
                .FirstOrDefaultAsync();
            if (scan == null)
                return NotFound("Diary scan not found.");
            return Ok(scan);
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadDiary(
            IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Please select a diary image.");

            // Maximum file size: 5 MB
            if (file.Length > 5 * 1024 * 1024)
                return BadRequest("Image size cannot exceed 5 MB.");

            var allowedTypes = new[]
            {
                "image/jpeg",
                "image/png",
                "image/webp"
            };

            if (!allowedTypes.Contains(file.ContentType))
                return BadRequest("Only JPG, PNG, and WEBP images are allowed.");

            var studentIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(studentIdClaim, out var studentId))
                return Unauthorized();

            // Create a private folder for diary images
            var uploadFolder = Path.Combine(
                _environment.ContentRootPath,
                "App_Data",
                "DiaryUploads"
            );

            Directory.CreateDirectory(uploadFolder);

            var extension = file.ContentType switch
            {
                "image/jpeg" => ".jpg",
                "image/png" => ".png",
                "image/webp" => ".webp",
                _ => throw new InvalidOperationException()
            };

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var scan = new DiaryScan
            {
                StudentUserId = studentId,
                ImageUrl = $"DiaryUploads/{fileName}",
                Status = DiaryScanStatus.Uploaded,
                UploadedAt = DateTime.UtcNow
            };

            _db.DiaryScans.Add(scan);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Diary image uploaded successfully.",
                scanId = scan.Id,
                status = scan.Status
            });
        }
    }
}
