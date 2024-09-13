using PruebaTecnicaBackend.API.Domain.Models;
using System.Threading.Tasks;

namespace PruebaTecnicaBackend.API.Services
{
    public interface IUserRoleService
    {
        Task<List<UserRoleModel>> GetRoles();
        Task<string> GetRoleNameById(Guid id);
    }
}
