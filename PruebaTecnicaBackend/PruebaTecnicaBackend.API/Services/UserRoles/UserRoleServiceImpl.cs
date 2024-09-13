using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.API.Data;
using PruebaTecnicaBackend.API.Domain.Models;

namespace PruebaTecnicaBackend.API.Services;

public class UserRoleServiceImpl(DataContext context) : IUserRoleService
{

    private readonly DataContext _context = context;

    public async Task<List<UserRoleModel>> GetRoles()
    {
        var roles = await _context.UserRoles.ToListAsync();

        return roles.Select(role => role.ToModel()).ToList();
    }
}