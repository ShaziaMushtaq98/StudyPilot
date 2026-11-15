namespace StudyPilot.Api.Models
{
    public class ParentChild
    {
        public Guid ParentUserId { get; set; }
        public Guid StudentUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User Parent { get; set; } = null!;
        public User Student { get; set; } = null!;
    }
}
