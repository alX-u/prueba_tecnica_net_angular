using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Data.Entities;

public class UserRoleEntity
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public DateTime CreatedDateTime { get; set; }
}