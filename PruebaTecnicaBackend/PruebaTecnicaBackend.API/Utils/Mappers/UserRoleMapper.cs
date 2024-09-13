using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.API.Domain.Models;

public static class UserRoleMapper
{
    public static UserRoleModel ToModel(this UserRoleEntity entity)
    {
        return new UserRoleModel(
            entity.Id,
            entity.Name,
            entity.CreatedDateTime
        );
    }
}