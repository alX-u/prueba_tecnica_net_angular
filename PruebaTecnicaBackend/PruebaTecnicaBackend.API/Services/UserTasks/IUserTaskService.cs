using PruebaTecnicaBackend.API.Domain.Models;
namespace PruebaTecnicaBackend.API.Services
{
    public interface IUserTasksService
    {
        Task CreateUserTask(UserTaskModel userTask);
        Task<List<UserTaskModel>> GetTasks();
        Task<UserTaskModel?> GetUserTaskById(Guid id);
        Task<bool> UpdateUserTask(UserTaskModel userTask);
        Task DeleteUserTask(Guid id);
    }
}
