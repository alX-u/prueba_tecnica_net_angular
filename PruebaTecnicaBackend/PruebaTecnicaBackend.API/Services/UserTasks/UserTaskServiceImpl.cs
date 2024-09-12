using PruebaTecnicaBackend.API.Domain.Models;

namespace PruebaTecnicaBackend.API.Services.UserTasks;

public class UserTasksServiceImpl : IUserTasksService
{
    //TODO: implement all the configuration for the database service with entity framework
    public async Task CreateUserTask(UserTaskModel userTask)
    {
        Console.WriteLine("UserTask ID: " + userTask.Id);
    }

    public async Task DeleteUserTask(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<UserTaskModel> GetUserTaskById(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateUserTask(UserTaskModel userTask)
    {
        throw new NotImplementedException();
    }
}