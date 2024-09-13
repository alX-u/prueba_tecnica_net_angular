using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.UserTask;

public record UpdateUserTaskRequest(
    string Title,
    string Description,
    UserTaskStatus Status,
    Guid? AssignedTo
);
