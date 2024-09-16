export interface UpdateUserTaskRequest {
  title: string;
  description: string;
  status: number;
  assignedTo: string | null;
}
