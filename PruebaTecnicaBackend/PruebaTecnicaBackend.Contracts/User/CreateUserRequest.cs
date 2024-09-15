namespace PruebaTecnicaBackend.Contracts.User;

public record CreateUserRequest(
    string Name,
    string Email,
    string PasswordHash,
    Guid? RoleId
);
