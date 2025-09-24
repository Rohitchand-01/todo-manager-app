export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TaskResponse {
  tasks: Task[];
  count: number;
}
