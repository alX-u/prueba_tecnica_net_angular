using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaBackend.API.Services;
using PruebaTecnicaBackend.Contracts.Auth;

namespace PruebaTecnicaBackend.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(IAuthService authService, IUserRoleService userRoleService) : ControllerBase
    {

        private readonly IAuthService _authService = authService;
        private readonly IUserRoleService _userRoleService = userRoleService;

        [HttpPost("login")]
        public async Task<IActionResult> LoginWithEmailAndPassword(AuthRequest request)
        {
            var user = await _authService.ValidateUser(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var roleName = await _userRoleService.GetRoleNameById(user.RoleId);

            var token = _authService.GenerateToken(user.Id, user.Email, roleName);

            return Ok(new { token, roleName });
        }
    }
}