using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.API.Domain.Models;

public static class UserMapper
{

    public static UserEntity ToEntity(this UserModel model)
    {
        return new UserEntity
        {
            Id = model.Id,
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            RoleId = model.RoleId,
            CreatedDateTime = model.CreatedDateTime,
            LastModifiedDateTime = model.LastModifiedDateTime
        };
    }

    public static UserModel ToModel(this UserEntity entity)
    {
        return new UserModel(
            entity.Id,
            entity.Name,
            entity.Email,
            entity.Password,
            entity.RoleId,
            entity.CreatedDateTime,
            entity.LastModifiedDateTime
        );
    }
}