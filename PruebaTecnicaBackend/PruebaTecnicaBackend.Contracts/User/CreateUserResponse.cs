using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.User;

public record UserResponse(
    Guid Id,
    string Name,
    string Email,
    string Password,
    Guid RoleId,
    DateTime CreatedDateTime,
    DateTime LastModifiedDateTime
);

