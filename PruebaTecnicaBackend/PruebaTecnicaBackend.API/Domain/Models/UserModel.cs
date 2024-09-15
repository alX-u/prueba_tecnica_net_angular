using PruebaTecnicaBackend.API.Data.Entities;

namespace PruebaTecnicaBackend.API.Domain.Models;

public class UserModel(
    Guid id,
    string name,
    string email,
    string password,
    Guid roleId,
    DateTime createdDateTime,
    DateTime lastModifiedDateTime)
{
    public Guid Id { get; } = id;
    public string Name { get; } = name;

    public string Email { get; } = email;

    public string Password { get; } = password;

    public Guid RoleId { get; } = roleId;

    public DateTime CreatedDateTime { get; } = createdDateTime;

    public DateTime LastModifiedDateTime { get; } = lastModifiedDateTime;
}