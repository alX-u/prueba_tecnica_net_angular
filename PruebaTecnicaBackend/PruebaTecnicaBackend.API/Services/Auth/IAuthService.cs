using PruebaTecnicaBackend.API.Domain.Models;
using System.Threading.Tasks;

namespace PruebaTecnicaBackend.API.Services
{
    public interface IAuthService
    {
        string GenerateToken(Guid userId, string email, string role);

        Task<UserModel?> ValidateUser(string email, string password);
    }
}
