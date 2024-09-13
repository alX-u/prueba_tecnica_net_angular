using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Domain.Models;

public class UserTaskModel
{
    public Guid Id { get; }
    public string Title { get; }

    public string Description { get; }

    public UserTaskStatus Status { get; }

    public DateTime CreatedDateTime { get; }

    public DateTime LastModifiedDateTime { get; }

    public UserTaskModel(Guid id, string title, string description, UserTaskStatus status, DateTime createdDateTime, DateTime lastModifiedDateTime)
    {
        Id = id;
        Title = title;
        Description = description;
        Status = status;
        CreatedDateTime = createdDateTime;
        LastModifiedDateTime = lastModifiedDateTime;
    }

}