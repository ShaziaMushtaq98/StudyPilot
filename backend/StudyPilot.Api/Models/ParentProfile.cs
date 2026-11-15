using System.ComponentModel.DataAnnotations;

namespace StudyPilot.Api.Models
{
    public class ParentProfile
    {
        public Guid UserId { get; set; }

        [Required]
        public string PinHash { get; set; } = string.Empty;

        public int FailedPinAttempts { get; set; }
        public DateTime? PinLockedUntil { get; set; }

        public User User { get; set; } = null!;
    }
}
