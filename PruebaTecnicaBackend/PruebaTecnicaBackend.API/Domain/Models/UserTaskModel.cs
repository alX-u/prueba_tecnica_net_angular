using PruebaTecnicaBackend.API.Data.Entities;
using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Domain.Models;

public class UserTaskModel(
    Guid id,
    string title,
    string description,
    UserTaskStatus status,
    Guid? assignedTo,
    DateTime createdDateTime,
    DateTime lastModifiedDateTime)
{
    public Guid Id { get; } = id;
    public string Title { get; } = title;

    public string Description { get; } = description;

    public UserTaskStatus Status { get; } = status;

    public Guid? AssignedTo { get; } = assignedTo ?? Guid.Empty;

    public DateTime CreatedDateTime { get; } = createdDateTime;

    public DateTime LastModifiedDateTime { get; } = lastModifiedDateTime;
}