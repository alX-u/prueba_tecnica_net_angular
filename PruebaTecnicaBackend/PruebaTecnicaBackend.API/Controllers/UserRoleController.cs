using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaBackend.API.Services;

namespace PruebaTecnicaBackend.API.Controllers
{
    [ApiController]
    [Route("roles")]
    public class UserRoleController(IUserRoleService userRoleService) : ControllerBase
    {

        private readonly IUserRoleService _userRoleService = userRoleService;

        [HttpGet("")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _userRoleService.GetRoles();
            return Ok(roles);
        }
    }
}