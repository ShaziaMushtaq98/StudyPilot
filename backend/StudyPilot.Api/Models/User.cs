using System.ComponentModel.DataAnnotations;
using System.Data;

namespace StudyPilot.Api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required, MaxLength(256)]
        public string Identifier { get; set; } = string.Empty; //login field for both
        [Required, MaxLength(256)]
        public string NormalizedIdentifier { get; set; } = string.Empty;//keeping both lower & upper case child names

        [Required, MaxLength(100)]
        public string DisplayName { get; set; } = string.Empty;  //for child dashboard
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public Role Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        public ParentProfile? ParentProfile { get; set; }
        public StudentProfile? StudentProfile { get; set; }
    }
}
