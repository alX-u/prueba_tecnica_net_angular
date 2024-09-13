using PruebaTecnicaBackend.Contracts.UserTask;
using PruebaTecnicaBackend.API.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaBackend.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace PruebaTecnicaBackend.API.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class UserTaskController(IUserTasksService userTasksService) : ControllerBase
    {
        private readonly IUserTasksService _userTasksService = userTasksService;

        [Authorize(Roles = "Administrador")]
        [HttpPost("")]
        public async Task<IActionResult> CreateTask(CreateUserTaskRequest request)
        {
            //Map the request
            var userTask = new UserTaskModel(
                Guid.NewGuid(),
                request.Title,
                request.Description,
                request.Status,
                request.AssignedTo,
                DateTime.Now,
                DateTime.Now
               );

            // Save the task to the database
            await _userTasksService.CreateUserTask(userTask);

            // Map the task to the response
            var response = new UserTaskResponse(
                userTask.Id,
                userTask.Title,
                userTask.Description,
                userTask.Status,
                userTask.AssignedTo == Guid.Empty ? null : userTask.AssignedTo, // Show as null instead of empty guid
                userTask.CreatedDateTime,
                userTask.LastModifiedDateTime);

            return CreatedAtAction(
                actionName: nameof(GetTask),
                routeValues: new { id = userTask.Id },
                value: response
            );
        }

        [Authorize(Roles = "Administrador, Supervisor")]
        [HttpGet("")]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var tasks = await _userTasksService.GetTasks();

                if (tasks == null || tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }

                var response = tasks.Select(task => new UserTaskResponse(
                    task.Id,
                    task.Title,
                    task.Description,
                    task.Status,
                    task.AssignedTo == Guid.Empty ? null : task.AssignedTo,
                    task.CreatedDateTime,
                    task.LastModifiedDateTime
                )).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tasks: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador, Supervisor")]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            var userTask = await _userTasksService.GetUserTaskById(id);

            if (userTask == null)
            {
                return NotFound(new { Message = $"UserTask with ID {id} not found" });
            }

            var response = new UserTaskResponse(
                userTask.Id,
                userTask.Title,
                userTask.Description,
                userTask.Status,
                userTask.AssignedTo == Guid.Empty ? null : userTask.AssignedTo,
                userTask.CreatedDateTime,
                userTask.LastModifiedDateTime);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador, Supervisor, Empleado")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateTask(Guid id, UpdateUserTaskRequest request)
        {

            var userTask = new UserTaskModel(
                id,
                request.Title,
                request.Description,
                request.Status,
                request.AssignedTo,
                DateTime.Now, //This value is not modified
                DateTime.Now
            );

            bool userTaskUpdated = await _userTasksService.UpdateUserTask(userTask);

            if (userTaskUpdated)
            {
                return NoContent();
            }
            else
            {
                return NotFound(new { Message = $"UserTask with ID {id} not found" });
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var existingTask = await _userTasksService.GetUserTaskById(id);

            if (existingTask == null)
            {
                return NotFound(new { Message = $"UserTask with ID {id} not found" });
            }

            await _userTasksService.DeleteUserTask(id);

            return NoContent();
        }
    }
}
