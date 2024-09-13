using PruebaTecnicaBackend.API.Data;
using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.API.Domain.Models;

namespace PruebaTecnicaBackend.API.Services.UserTasks;

public class UserTasksServiceImpl : IUserTasksService
{

    private readonly DataContext _context;

    public UserTasksServiceImpl(DataContext context)
    {
        _context = context;
    }

    public async Task CreateUserTask(UserTaskModel userTask)
    {
        var entity = userTask.ToEntity();
        await _context.UserTasks.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserTask(Guid id)
    {
        var task = await _context.UserTasks.FindAsync(id);  // Find task by ID
        if (task != null)
        {
            _context.UserTasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<UserTaskModel?> GetUserTaskById(Guid id)
    {
        var entity = await _context.UserTasks.FindAsync(id);
        return entity?.ToModel();
    }

    public async Task<bool> UpdateUserTask(UserTaskModel userTask)
    {
        var existingTask = await _context.UserTasks.FindAsync(userTask.Id);

        if (existingTask != null)
        {
            existingTask.Title = userTask.Title;
            existingTask.Description = userTask.Description;
            existingTask.Status = userTask.Status;
            existingTask.LastModifiedDateTime = userTask.LastModifiedDateTime;

            _context.UserTasks.Update(existingTask);
            await _context.SaveChangesAsync();

            return true;
        }
        else
        {
            // La tarea no existe
            return false;
        }
    }
}