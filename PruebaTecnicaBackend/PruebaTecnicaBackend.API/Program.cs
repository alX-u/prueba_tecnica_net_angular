using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.API.Data;
using PruebaTecnicaBackend.API.Services;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddDbContext<DataContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    builder.Services.AddScoped<IUserRoleService, UserRoleServiceImpl>();
    builder.Services.AddScoped<IUserService, UserServiceImpl>();
    builder.Services.AddScoped<IUserTasksService, UserTasksServiceImpl>();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}


