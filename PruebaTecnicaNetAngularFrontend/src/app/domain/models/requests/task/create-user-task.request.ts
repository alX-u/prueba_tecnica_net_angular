export interface CreateUserTaskRequest {
  title: string;
  description: string;
  status: number;
  assignedTo: string | null;
}
