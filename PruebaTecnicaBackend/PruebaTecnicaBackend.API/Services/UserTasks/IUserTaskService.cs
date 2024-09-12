using PruebaTecnicaBackend.API.Domain.Models;
using System.Threading.Tasks;

namespace PruebaTecnicaBackend.API.Services.UserTasks
{
    public interface IUserTasksService
    {
        Task CreateUserTask(UserTaskModel userTask);
        Task<UserTaskModel> GetUserTaskById(Guid id);
        Task UpdateUserTask(UserTaskModel userTask);
        Task DeleteUserTask(Guid id);
    }
}
