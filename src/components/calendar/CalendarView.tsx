import React from 'react';
import styled from 'styled-components';
import { CalendarViewType, CalendarEvent } from '../../pages/CalendarPage';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';

interface CalendarViewProps {
  viewType: CalendarViewType;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDateClick: (date: Date) => void;
  events: CalendarEvent[];
}

const CalendarContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
`;

export const CalendarView: React.FC<CalendarViewProps> = ({
  viewType,
  selectedDate,
  onDateChange,
  onDateClick,
  events
}) => {
  return (
    <CalendarContainer>
      {viewType === 'month' ? (
        <MonthView
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          onDateClick={onDateClick}
          events={events}
        />
      ) : (
        <WeekView
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          onDateClick={onDateClick}
          events={events}
        />
      )}
    </CalendarContainer>
  );
};