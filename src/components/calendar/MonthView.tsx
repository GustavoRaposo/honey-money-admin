import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../../pages/CalendarPage';

interface MonthViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDateClick: (date: Date) => void;
  events: CalendarEvent[];
}

const MonthContainer = styled.div`
  width: 100%;
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const MonthTitle = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background-color: #2a2a2a;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  color: #b3b3b3;
  font-size: 12px;
  text-transform: uppercase;
`;

const DayCell = styled.div<{ isCurrentMonth: boolean; isToday: boolean; hasEvents: boolean }>`
  background-color: #1e1e1e;
  padding: 12px 8px;
  min-height: 80px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  ${props => !props.isCurrentMonth && `
    opacity: 0.4;
  `}

  ${props => props.isToday && `
    background-color: rgba(255, 165, 0, 0.1);
    border: 1px solid #ffa500;
  `}

  ${props => props.hasEvents && `
    &::after {
      content: '';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 6px;
      height: 6px;
      background-color: #ffa500;
      border-radius: 50%;
    }
  `}

  &:hover {
    background-color: #2a2a2a;
  }
`;

const DayNumber = styled.div`
  color: #fff;
  font-weight: 500;
  margin-bottom: 4px;
`;

const EventDot = styled.div<{ type: 'task' | 'event' }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.type === 'task' ? '#4caf50' : '#2196f3'};
  margin: 1px 0;
`;

export const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  onDateChange,
  onDateClick,
  events
}) => {
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    onDateChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    onDateChange(newDate);
  };

  const getDayEvents = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return events.filter(event => 
      event.date.toDateString() === dayDate.toDateString()
    );
  };

  const isToday = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return dayDate.toDateString() === today.toDateString();
  };

  const renderCalendarDays = () => {
    const days = [];

    // Dias do mês anterior
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <DayCell
          key={`prev-${day}`}
          isCurrentMonth={false}
          isToday={false}
          hasEvents={false}
          onClick={() => {
            const date = new Date(currentYear, currentMonth - 1, day);
            onDateClick(date);
          }}
        >
          <DayNumber>{day}</DayNumber>
        </DayCell>
      );
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day);
      days.push(
        <DayCell
          key={day}
          isCurrentMonth={true}
          isToday={isToday(day)}
          hasEvents={dayEvents.length > 0}
          onClick={() => {
            const date = new Date(currentYear, currentMonth, day);
            onDateClick(date);
          }}
        >
          <DayNumber>{day}</DayNumber>
          {dayEvents.slice(0, 3).map(event => (
            <EventDot key={event.id} type={event.type} />
          ))}
        </DayCell>
      );
    }

    // Dias do próximo mês
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <DayCell
          key={`next-${day}`}
          isCurrentMonth={false}
          isToday={false}
          hasEvents={false}
          onClick={() => {
            const date = new Date(currentYear, currentMonth + 1, day);
            onDateClick(date);
          }}
        >
          <DayNumber>{day}</DayNumber>
        </DayCell>
      );
    }

    return days;
  };

  return (
    <MonthContainer>
      <MonthHeader>
        <NavButton onClick={goToPreviousMonth}>‹</NavButton>
        <MonthTitle>
          {monthNames[currentMonth]} {currentYear}
        </MonthTitle>
        <NavButton onClick={goToNextMonth}>›</NavButton>
      </MonthHeader>

      <CalendarGrid>
        {dayNames.map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {renderCalendarDays()}
      </CalendarGrid>
    </MonthContainer>
  );
};