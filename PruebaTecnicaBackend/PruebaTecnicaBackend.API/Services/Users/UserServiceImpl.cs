using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.API.Data;
using PruebaTecnicaBackend.API.Domain.Models;

namespace PruebaTecnicaBackend.API.Services;

public class UserServiceImpl(DataContext context) : IUserService
{
    private readonly DataContext _context = context;

    public async Task CreateUser(UserModel userModel)
    {
        var userEntity = userModel.ToEntity();
        _context.Users.Add(userEntity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(Guid id)
    {
        var userEntity = await _context.Users.FindAsync(id) ?? throw new Exception("User not found");
        _context.Users.Remove(userEntity);
        await _context.SaveChangesAsync();
    }

    public async Task<List<UserModel>> GetUsers()
    {
        var userEntities = await _context.Users.ToListAsync();

        return userEntities.Select(userEntity => userEntity.ToModel()).ToList();
    }

    public async Task<UserModel?> GetUserById(Guid id)
    {
        var userEntity = await _context.Users.FindAsync(id);

        return userEntity?.ToModel();
    }

    public async Task<List<UserModel>> GetEmployees()
    {
        var role = await _context.UserRoles
            .FirstOrDefaultAsync(r => r.Name == "Empleado");

        if (role == null)
        {
            return [];
        }

        var users = await _context.Users
            .Where(u => u.RoleId == role.Id)
            .ToListAsync();

        return users.Select(user => user.ToModel()).ToList();
    }

    public async Task<List<UserTaskModel>?> GetUserTasks(Guid userId)
    {
        var userTasksEntities = await _context.UserTasks
        .Where(task => task.AssignedTo == userId)
        .ToListAsync();

        Console.WriteLine("User tasks: " + userTasksEntities);

        var userTasks = userTasksEntities.Select(taskEntity => taskEntity.ToModel()).ToList();

        return userTasks;
    }


    public async Task<bool> UpdateUser(UserModel userModel)
    {
        var userEntity = await _context.Users.FindAsync(userModel.Id);
        if (userEntity == null)
        {
            return false;
        }

        userEntity.Name = userModel.Name;
        userEntity.Email = userModel.Email;
        userEntity.PasswordHash = userModel.PasswordHash;
        userEntity.RoleId = userModel.RoleId;
        userEntity.LastModifiedDateTime = userModel.LastModifiedDateTime;

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync();
        return true;
    }
}
