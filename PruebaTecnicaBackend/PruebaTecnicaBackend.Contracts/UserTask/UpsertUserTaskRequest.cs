using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.UserTask;

public record UpsertUserTaskRequest(
string Title,
string Description,
UserTaskStatus Status,
DateTime StartDateTime,
DateTime EndDateTime
);
