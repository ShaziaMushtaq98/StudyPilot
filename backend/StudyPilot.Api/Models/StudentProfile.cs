using System.ComponentModel.DataAnnotations;

namespace StudyPilot.Api.Models
{
    public class StudentProfile
    {
        public Guid UserId { get; set; }

        public int ClassLevel { get; set; }

        [Required, MaxLength(200)]
        public string SchoolName { get; set; } = string.Empty;
        public int PassMarkPercent { get; set; } = 70;
        public int MaxAttempts { get; set; } = 3;

        public User User { get; set; } = null!;
    }
}
