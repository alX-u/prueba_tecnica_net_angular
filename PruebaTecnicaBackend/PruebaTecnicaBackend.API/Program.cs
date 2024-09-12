using PruebaTecnicaBackend.API.Services.UserTasks;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddScoped<IUserTasksService, UserTasksServiceImpl>();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}


