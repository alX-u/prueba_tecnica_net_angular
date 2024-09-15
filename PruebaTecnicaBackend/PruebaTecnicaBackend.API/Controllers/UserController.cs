using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaBackend.API.Domain.Models;
using PruebaTecnicaBackend.API.Services;
using PruebaTecnicaBackend.Contracts.User;
using PruebaTecnicaBackend.Contracts.UserTask;

namespace PruebaTecnicaBackend.API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("")]
        public async Task<IActionResult> CreateUser(CreateUserRequest request)
        {
            try
            {
                //For brand new users set as No Role
                var roleId = request.RoleId ?? await _userService.GetRoleForBrandNewUser();

                //Hash user password
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                var user = new UserModel(
                    Guid.NewGuid(),
                    request.Name,
                    request.Email,
                    hashedPassword,
                    roleId,
                    DateTime.Now,
                    DateTime.Now);

                await _userService.CreateUser(user);

                var response = new UserResponse(
                    user.Id,
                    user.Name,
                    user.Email,
                    hashedPassword,
                    roleId,
                    user.CreatedDateTime,
                    user.LastModifiedDateTime);

                return CreatedAtAction(
                    actionName: nameof(GetUserById),
                    routeValues: new { id = user.Id },
                    response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating the user: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet("")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsers();

                if (users == null || users.Count == 0)
                {
                    return NotFound("No users found.");
                }

                var response = users.Select(user => new UserResponse(
                    user.Id,
                    user.Name,
                    user.Email,
                    user.PasswordHash,
                    user.RoleId,
                    user.CreatedDateTime,
                    user.LastModifiedDateTime
                )).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving users: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador, Supervisor")]
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var user = await _userService.GetUserById(id);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var response = new UserResponse(
                    user.Id,
                    user.Name,
                    user.Email,
                    user.PasswordHash,
                    user.RoleId,
                    user.CreatedDateTime,
                    user.LastModifiedDateTime);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error getting the user: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador, Supervisor")]
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees()
        {
            try
            {
                var employees = await _userService.GetEmployees();

                if (employees == null || employees.Count == 0)
                {
                    return NotFound("No employees found.");
                }

                var response = employees.Select(user => new UserResponse(
                    user.Id,
                    user.Name,
                    user.Email,
                    user.PasswordHash,
                    user.RoleId,
                    user.CreatedDateTime,
                    user.LastModifiedDateTime
                )).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving employees: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador, Supervisor, Empleado")]
        [HttpGet("{id:guid}/tasks")]
        public async Task<IActionResult> GetUserTasks(Guid id)
        {
            try
            {
                var tasks = await _userService.GetUserTasks(id);

                if (tasks == null || tasks.Count == 0)
                {
                    Console.WriteLine("No tasks");
                    return NotFound("No tasks found for this user.");
                }

                var response = tasks.Select(task => new UserTaskResponse(
                    task.Id,
                    task.Title,
                    task.Description,
                    task.Status,
                    task.AssignedTo,
                    task.CreatedDateTime,
                    task.LastModifiedDateTime
                )).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving user tasks: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, UpdateUserRequest request)
        {
            try
            {
                var userModel = new UserModel(
                    id,
                    request.Name,
                    request.Email,
                    request.PasswordHash,
                    request.RoleId,
                    DateTime.Now, // Value won't change
                    DateTime.Now);

                var isUpdated = await _userService.UpdateUser(userModel);

                if (!isUpdated)
                {
                    return NotFound("User not found.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error upodating the user: {ex.Message}");
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                await _userService.DeleteUser(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("User not found"))
                {
                    return NotFound("User not found.");
                }
                return StatusCode(500, $"Error deleting the user: {ex.Message}");
            }
        }
    }
}
