
namespace StudyPilot.Api.Models
{
    public class HomeWork
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid StudentUserId { get; set; }
        public Guid? DiaryScanId { get; set; }
        public string Title { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }
        public HomeworkPriority? SuggestedPriority { get; set; }
        public int SortOrder { get; set; }
        public bool IsGradedTest { get; set; } = false;
        public HomeworkStatus Status { get; set; }
            = HomeworkStatus.Locked;
        public int AttemptsUsed { get; set; } = 0;

        public decimal? LastScore { get; set; }

        public bool HasLearningGap { get; set; } = false;

        public DateTime CreatedAt { get; set; }
            = DateTime.UtcNow;

        public User Student { get; set; } = null!;

        public DiaryScan? DiaryScan { get; set; }
        public int EstimatedMinutes { get; set; }

        public int XpReward { get; set; }
    }

    public enum HomeworkPriority
    {
        Low = 1,
        Medium = 2,
        High = 3
    }

    public enum HomeworkStatus
    {
        Locked = 1,
        Available = 2,
        InProgress = 3,
        Passed = 4,
        Skipped = 5
    }
}
