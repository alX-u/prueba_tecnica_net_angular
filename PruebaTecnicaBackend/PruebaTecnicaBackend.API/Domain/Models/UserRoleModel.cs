using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Domain.Models;

public class UserRoleModel(
    Guid id,
    string name,
    DateTime createdDateTime
    )
{
    public Guid Id { get; } = id;
    public string Name { get; } = name;
    public DateTime CreatedDateTime { get; } = createdDateTime;

}