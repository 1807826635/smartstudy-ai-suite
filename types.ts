
export type AppView = 'login' | 'editor' | 'export' | 'dashboard';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'idle' | 'offline';
  currentTask: string;
  lastActive: string;
  idleTime?: string;
  offlineTime?: string;
}

export interface Activity {
  time: string;
  type: 'Input' | 'Delete' | 'Format' | 'Paste';
  detail: string;
}
