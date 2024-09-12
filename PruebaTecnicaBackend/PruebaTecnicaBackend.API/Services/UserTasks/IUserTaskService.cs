using PruebaTecnicaBackend.API.Models;
using System.Threading.Tasks;

namespace PruebaTecnicaBackend.API.Services.UserTasks
{
    public interface IUserTasksService
    {
        Task CreateUserTask(UserTask userTask);
        Task<UserTask> GetUserTaskById(Guid id);
        Task UpdateUserTask(UserTask userTask);
        Task DeleteUserTask(Guid id);
    }
}
