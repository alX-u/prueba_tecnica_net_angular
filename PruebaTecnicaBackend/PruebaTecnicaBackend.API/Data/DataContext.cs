using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.API.Data.Entities;

namespace PruebaTecnicaBackend.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserRoleEntity> UserRoles { get; set; }
        public DbSet<UserTaskEntity> UserTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the relationship between UserEntity and UserRoleEntity
            modelBuilder.Entity<UserEntity>()
                .HasOne(u => u.Role)
                .WithMany()
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure the relationship between UserEntity and UserTaskEntity
            modelBuilder.Entity<UserEntity>()
                .HasMany(u => u.AssignedTasks)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.AssignedTo)
                .OnDelete(DeleteBehavior.SetNull);

            Guid adminRoleId = Guid.NewGuid();

            // Seed data for UserRoleEntity
            modelBuilder.Entity<UserRoleEntity>().HasData(
                new UserRoleEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "Sin rol",
                    CreatedDateTime = DateTime.UtcNow
                },
                new UserRoleEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "Supervisor",
                    CreatedDateTime = DateTime.UtcNow
                },
                new UserRoleEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "Empleado",
                    CreatedDateTime = DateTime.UtcNow
                },
                new UserRoleEntity
                {
                    Id = adminRoleId,
                    Name = "Administrador",
                    CreatedDateTime = DateTime.UtcNow
                }
            );

            modelBuilder.Entity<UserEntity>().HasData(
               new UserEntity
               {
                   Id = Guid.NewGuid(),
                   Name = "Admin",
                   Email = "admin@gmail.com",
                   Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                   RoleId = adminRoleId,
                   CreatedDateTime = DateTime.UtcNow,
                   LastModifiedDateTime = DateTime.UtcNow
               }
            );
        }
    }
}
