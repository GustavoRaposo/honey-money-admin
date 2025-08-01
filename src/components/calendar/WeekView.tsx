import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../../types/calendar';

interface WeekViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDateClick: (date: Date) => void;
  events: CalendarEvent[];
}

const WeekContainer = styled.div`
  width: 100%;
`;

const WeekHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const WeekTitle = styled.h3`
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

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 1px;
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
`;

const TimeSlot = styled.div`
  background-color: #2a2a2a;
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #b3b3b3;
  border-right: 1px solid #333;
`;

const DayHeader = styled.div<{ isToday: boolean }>`
  background-color: #2a2a2a;
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  color: ${props => props.isToday ? '#ffa500' : '#b3b3b3'};
  font-size: 12px;
`;

const HourCell = styled.div<{ isCurrentHour: boolean }>`
  background-color: #1e1e1e;
  padding: 4px 8px;
  min-height: 60px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-bottom: 1px solid #333;

  ${props => props.isCurrentHour && `
    background-color: rgba(255, 165, 0, 0.1);
    border-left: 3px solid #ffa500;
  `}

  &:hover {
    background-color: #2a2a2a;
  }
`;

const EventBlock = styled.div<{ type: 'task' | 'event' }>`
  background-color: ${props => props.type === 'task' ? '#4caf50' : '#2196f3'};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  margin: 1px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CurrentTimeIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ffa500;
  z-index: 10;
`;

const WeekGridWrapper = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  border-radius: 8px;
  background: #333;
`;

export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  onDateChange,
  onDateClick,
  events
}) => {
  const today = new Date();
  const currentHour = today.getHours();

  // Calcular o início da semana (domingo) - com tipagem explícita
  const startOfWeek = new Date(selectedDate);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day);

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDays.push(date);
  }

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  };

  const getWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    const startStr = `${start.getDate()}/${start.getMonth() + 1}`;
    const endStr = `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
    return `${startStr} - ${endStr}`;
  };

  const getEventsForDayAndHour = (date: Date, hour: number) => {
    return events.filter(event => {
      if (event.date.toDateString() !== date.toDateString()) return false;

      if (event.time) {
        const eventHour = parseInt(event.time.split(':')[0]);
        return eventHour === hour;
      }

      // Se não tem horário específico, mostrar na primeira hora do dia
      return hour === 0;
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentHour = (date: Date, hour: number) => {
    return isToday(date) && hour === currentHour;
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  return (
    <WeekContainer>
      <WeekHeader>
        <NavButton onClick={goToPreviousWeek}>‹</NavButton>
        <WeekTitle>{getWeekRange()}</WeekTitle>
        <NavButton onClick={goToNextWeek}>›</NavButton>
      </WeekHeader>

      <WeekGridWrapper>
        <WeekGrid>
          {/* Header da grade */}
          <TimeSlot></TimeSlot>
          {weekDays.map((date, index) => (
            <DayHeader key={index} isToday={isToday(date)}>
              <div>{dayNames[index]}</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px' }}>
                {date.getDate()}
              </div>
            </DayHeader>
          ))}

          {/* Linhas de horas */}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <TimeSlot>{formatHour(hour)}</TimeSlot>
              {weekDays.map((date, dayIndex) => {
                const dayEvents = getEventsForDayAndHour(date, hour);
                const isCurrent = isCurrentHour(date, hour);

                return (
                  <HourCell
                    key={`${dayIndex}-${hour}`}
                    isCurrentHour={isCurrent}
                    onClick={() => {
                      const clickDate = new Date(date);
                      clickDate.setHours(hour, 0, 0, 0);
                      onDateClick(clickDate);
                    }}
                  >
                    {isCurrent && <CurrentTimeIndicator />}
                    {dayEvents.map(event => (
                      <EventBlock key={event.id} type={event.type}>
                        {event.title}
                      </EventBlock>
                    ))}
                  </HourCell>
                );
              })}
            </React.Fragment>
          ))}
        </WeekGrid>
      </WeekGridWrapper>
    </WeekContainer>
  );
};