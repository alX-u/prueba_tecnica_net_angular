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
            AssignedTo = model.AssignedTo == Guid.Empty ? null : model.AssignedTo,
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
            entity.AssignedTo = entity.AssignedTo == Guid.Empty ? null : entity.AssignedTo,
            entity.CreatedDateTime,
            entity.LastModifiedDateTime
        );
    }
}
