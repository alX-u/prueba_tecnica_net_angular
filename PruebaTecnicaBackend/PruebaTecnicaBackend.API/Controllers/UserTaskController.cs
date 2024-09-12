using PruebaTecnicaBackend.Contracts.UserTask;
using PruebaTecnicaBackend.API.Domain.Models;
using PruebaTecnicaBackend.API.Services.UserTasks;
using Microsoft.AspNetCore.Mvc;

namespace PruebaTecnicaBackend.API.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTasksService _userTasksService;

        public UserTaskController(IUserTasksService userTasksService)
        {
            _userTasksService = userTasksService;
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateTask(CreateUserTaskRequest request)
        {
            //Map the request
            var task = new UserTaskModel(
                Guid.NewGuid(),
                request.Title,
                request.Description,
                request.Status,
                request.StartDateTime,
                request.EndDateTime,
                DateTime.UtcNow);

            // Save the task to the database
            await _userTasksService.CreateUserTask(task);

            // Map the task to the response
            var response = new UserTaskResponse(
                task.Id,
                task.Title,
                task.Description,
                task.Status,
                task.StartDateTime,
                task.EndDateTime,
                task.LastModifiedDateTime);

            return CreatedAtAction(
                actionName: nameof(GetTask),
                routeValues: new { id = task.Id },
                value: response
            );
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            UserTaskModel userTask = await _userTasksService.GetUserTaskById(id);

            //Map the userTask to the response
            var response = new UserTaskResponse(
                userTask.Id,
                userTask.Title,
                userTask.Description,
                userTask.Status,
                userTask.StartDateTime,
                userTask.EndDateTime,
                userTask.LastModifiedDateTime);

            return Ok(response);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpsertTask(Guid id, UpsertUserTaskRequest request)
        {
            //TODO: implement upsert task service
            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            //TODO: implement delete task service
            return Ok();
        }
    }
}
