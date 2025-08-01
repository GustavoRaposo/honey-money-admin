// types/calendar.ts
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'event';
  date: Date;
  time?: string;
  description?: string;
  completed?: boolean;
  userId?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  date: Date;
  userId: string;
}

export interface CreateEventRequest {
  title: string;
  time: string;
  description?: string;
  date: Date;
  userId: string;
}

export type CalendarViewType = 'month' | 'week';

export interface CalendarFilters {
  showTasks: boolean;
  showEvents: boolean;
  showCompleted: boolean;
}