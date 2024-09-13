using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.API.Domain.Models;

public static class UserTaskMapper
{
    public static UserTaskEntity ToEntity(this UserTaskModel model)
    {
        return new UserTaskEntity
        {
            Id = model.Id,
            Title = model.Title,
            Description = model.Description,
            Status = model.Status,
            CreatedDateTime = model.CreatedDateTime,
            LastModifiedDateTime = model.LastModifiedDateTime
        };
    }

    public static UserTaskModel ToModel(this UserTaskEntity entity)
    {
        return new UserTaskModel(
            entity.Id,
            entity.Title,
            entity.Description,
            entity.Status,
            entity.CreatedDateTime,
            entity.LastModifiedDateTime
        );
    }
}
