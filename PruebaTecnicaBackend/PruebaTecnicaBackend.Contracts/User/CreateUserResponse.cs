using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.User;

public record UserResponse(
    Guid Id,
    string Name,
    string Email,
    string PasswordHash,
    Guid RoleId,
    DateTime CreatedDateTime
);

