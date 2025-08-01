import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Layout } from '../components/layout/Layout';
import { Header } from '../components/layout/Header';
import { Container, Button } from '../styles';
import { Loading } from '../components/common/Loading';
import { useAuth } from '../contexts/AuthContext';

import { CalendarView } from '../components/calendar/CalendarView';
import { CreateTaskModal } from '../components/calendar/CreateTaskModal';
import { CreateEventModal } from '../components/calendar/CreateEventModal';
import { CalendarActionModal } from '../components/calendar/CalendarActionModal';
import { SuccessMessage } from '../components/SuccessMessage';

export type CalendarViewType = 'month' | 'week';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'event';
  date: Date;
  time?: string;
  description?: string;
  completed?: boolean;
}

export const CalendarPage: React.FC = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Modal states
  const [showActionModal, setShowActionModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateForAction, setSelectedDateForAction] = useState<Date | null>(null);

  const [successMessage, setSuccessMessage] = useState('');

  const fetchEvents = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      // Aqui você faria a chamada para a API
      // const data = await apiService.getUserEvents(userId);
      // setEvents(data);

      // Mock data para exemplo
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Reunião de projeto',
          type: 'event',
          date: new Date(),
          time: '14:00',
          description: 'Discussão sobre o andamento do projeto'
        },
        {
          id: '2',
          title: 'Finalizar relatório',
          type: 'task',
          date: new Date(),
          completed: false
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      toast.error('Erro ao carregar eventos');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  const handleDateClick = (date: Date) => {
    setSelectedDateForAction(date);
    setShowActionModal(true);
  };

  const handleCreateTask = () => {
    setShowActionModal(false);
    setShowTaskModal(true);
  };

  const handleCreateEvent = () => {
    setShowActionModal(false);
    setShowEventModal(true);
  };

  const handleTaskCreated = async (taskData: any) => {
    try {
      // Aqui você faria a chamada para a API
      // await apiService.createTask(taskData);

      const newTask: CalendarEvent = {
        id: Date.now().toString(),
        title: taskData.title,
        type: 'task',
        date: selectedDateForAction || new Date(),
        description: taskData.description,
        completed: false
      };

      setEvents(prev => [...prev, newTask]);
      setShowTaskModal(false);
      setSelectedDateForAction(null);
      setSuccessMessage('Tarefa criada com sucesso!');
      toast.success('Tarefa criada com sucesso!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      toast.error('Erro ao criar tarefa');
    }
  };

  const handleEventCreated = async (eventData: any) => {
    try {
      // Aqui você faria a chamada para a API
      // await apiService.createEvent(eventData);

      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventData.title,
        type: 'event',
        date: selectedDateForAction || new Date(),
        time: eventData.time,
        description: eventData.description
      };

      setEvents(prev => [...prev, newEvent]);
      setShowEventModal(false);
      setSelectedDateForAction(null);
      setSuccessMessage('Evento criado com sucesso!');
      toast.success('Evento criado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      toast.error('Erro ao criar evento');
    }
  };

  const handleCloseModals = () => {
    setShowActionModal(false);
    setShowTaskModal(false);
    setShowEventModal(false);
    setSelectedDateForAction(null);
  };

  return (
    <Layout activeMenuItem="calendar">
      <Header />
      <div style={{ padding: '32px 0' }}>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 32 
          }}>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
              Calendário
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <Button
                variant={viewType === 'month' ? 'primary' : 'secondary'}
                onClick={() => setViewType('month')}
              >
                Mês
              </Button>
              <Button
                variant={viewType === 'week' ? 'primary' : 'secondary'}
                onClick={() => setViewType('week')}
              >
                Semana
              </Button>
            </div>
          </div>

          {successMessage && <SuccessMessage message={successMessage} />}

          {loading ? (
            <Loading text="Carregando calendário..." />
          ) : (
            <CalendarView
              viewType={viewType}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onDateClick={handleDateClick}
              events={events}
            />
          )}
        </Container>
      </div>

      <CalendarActionModal
        isOpen={showActionModal}
        onClose={handleCloseModals}
        onCreateTask={handleCreateTask}
        onCreateEvent={handleCreateEvent}
        selectedDate={selectedDateForAction}
      />

      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={handleCloseModals}
        onSubmit={handleTaskCreated}
        selectedDate={selectedDateForAction}
      />

      <CreateEventModal
        isOpen={showEventModal}
        onClose={handleCloseModals}
        onSubmit={handleEventCreated}
        selectedDate={selectedDateForAction}
      />
    </Layout>
  );
};