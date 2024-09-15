using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaBackend.API.Data.Entities
{
    public class UserEntity
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        // Foreign Key for UserRole
        [Required]
        public Guid RoleId { get; set; }
        [Required]
        public UserRoleEntity Role { get; set; } = null!;

        public DateTime CreatedDateTime { get; set; }

        public DateTime LastModifiedDateTime { get; set; }

        // Collection of tasks assigned to the user
        public ICollection<UserTaskEntity> AssignedTasks { get; set; } = new List<UserTaskEntity>();
    }
}