namespace PruebaTecnicaBackend.Contracts.User;

public record UpdateUserRequest(
    string Name,
    string Email,
    string Password,
    Guid RoleId
);
