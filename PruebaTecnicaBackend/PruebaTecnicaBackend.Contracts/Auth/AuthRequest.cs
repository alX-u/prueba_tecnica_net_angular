namespace PruebaTecnicaBackend.Contracts.Auth;

public record AuthRequest(
    string Email,
    string Password
);