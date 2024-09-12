using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.UserTask;

public record CreateUserTaskRequest(
string Title,
string Description,
UserTaskStatus Status,
DateTime StartDateTime,
DateTime EndDateTime
);
