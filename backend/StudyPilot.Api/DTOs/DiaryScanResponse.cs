
namespace StudyPilot.Api.DTOs
{
    public class DiaryScanResponse
    {
        public Guid Id { get; set; }

        public string Status { get; set; } = string.Empty;

        public string? ExtractedText { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime? ConfirmedAt { get; set; }
    }
}
