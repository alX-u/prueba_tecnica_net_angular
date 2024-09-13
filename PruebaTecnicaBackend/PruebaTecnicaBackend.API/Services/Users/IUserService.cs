
using PruebaTecnicaBackend.API.Domain.Models;

namespace PruebaTecnicaBackend.API.Services
{
    public interface IUserService
    {
        Task CreateUser(UserModel userModel);

        Task<List<UserModel>> GetUsers();

        Task<UserModel?> GetUserById(Guid id);

        Task<List<UserTaskModel>?> GetUserTasks(Guid id);

        Task<bool> UpdateUser(UserModel userModel);

        Task DeleteUser(Guid id);
    }
}
