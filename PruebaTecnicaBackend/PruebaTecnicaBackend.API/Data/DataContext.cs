using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.API.Data.Entities;
namespace PruebaTecnicaBackend.API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<UserTaskEntity> UserTasks { get; set; }
}