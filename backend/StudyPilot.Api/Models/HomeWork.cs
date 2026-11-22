namespace StudyPilot.Api.Models
{
    public class Homework
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid StudentUserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User Student { get; set; } = null!;
    }
}