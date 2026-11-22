using System.ComponentModel.DataAnnotations;

namespace StudyPilot.Api.Models
{
    public class DiaryScan
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid StudentUserId { get; set; }

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        public string? ExtractedText { get; set; }

        public DiaryScanStatus Status { get; set; }
            = DiaryScanStatus.Uploaded;

        public DateTime UploadedAt { get; set; }
            = DateTime.UtcNow;

        public DateTime? ConfirmedAt { get; set; }

        public User Student { get; set; } = null!;
    }
}