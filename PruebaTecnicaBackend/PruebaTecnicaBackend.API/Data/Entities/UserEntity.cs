using System;
using System.Collections.Generic;
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
        public string PasswordHash { get; set; } = string.Empty;

        // Foreign Key for UserRole
        public Guid RoleId { get; set; }
        public UserRoleEntity Role { get; set; }

        // Collection of tasks assigned to the user
        public ICollection<UserTaskEntity> AssignedTasks { get; set; } = new List<UserTaskEntity>();
    }
}