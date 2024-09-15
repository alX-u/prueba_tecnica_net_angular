namespace PruebaTecnicaBackend.Contracts.User;

public record CreateUserRequest(
    string Name,
    string Email,
    string Password,
    Guid? RoleId
);
