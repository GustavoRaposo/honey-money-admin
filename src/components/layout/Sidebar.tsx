import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../assets/bee.svg';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: #1a1a1a;
  border-right: 1px solid #333;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  touch-action: pan-y;

  @media (min-width: 768px) {
    transform: translateX(0);
    position: relative;
    width: 280px;
  }
`;

const SidebarHeader = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #333;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ active?: boolean }>`
  margin: 8px 0;
`;

const MenuLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: ${props => props.active ? '#ffa500' : '#b3b3b3'};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ffa500;
    background-color: rgba(255, 165, 0, 0.1);
  }
`;

const IconSpan = styled.span`
  margin-right: 12px;
  font-size: 20px;
  width: 20px;
  text-align: center;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (min-width: 768px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.h1`
  color: #ffa500;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

// Área invisível para detectar swipe da esquerda
const SwipeArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 100vh;
  z-index: 998;
  background: transparent;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface SidebarProps {
  activeItem?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'dashboard'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: '📈', 
      href: '/dashboard' 
    },
    { 
      id: 'calendar', 
      label: 'Calendário', 
      icon: '📅', 
      href: '/calendar' 
    },
    { 
      id: 'projects', 
      label: 'Projetos', 
      icon: '📁', 
      href: '/projects' 
    },
    { 
      id: 'finance', 
      label: 'Finanças', 
      icon: '💰', 
      href: '/finance' 
    },
    { 
      id: 'tasks', 
      label: 'Tarefas', 
      icon: '📋', 
      href: '/tasks' 
    },
    { 
      id: 'appointments', 
      label: 'Agenda', 
      icon: '📌', 
      href: '/appointments' 
    },
  ];

  // Função para detectar se é mobile
  const isMobile = () => window.innerWidth < 768;

  // Handlers para touch events
  const handleTouchStart = (e: TouchEvent) => {
    if (!isMobile()) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isMobile()) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX.current;
    const deltaY = Math.abs(touchY - touchStartY.current);
    
    // Só considera como swipe horizontal se o movimento vertical for menor
    if (deltaY < 50) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isMobile() || !isDragging.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const minSwipeDistance = 50;
    
    // Swipe da esquerda para direita (abrir)
    if (deltaX > minSwipeDistance && touchStartX.current < 50) {
      setIsOpen(true);
    }
    
    // Swipe da direita para esquerda (fechar) - só se o sidebar estiver aberto
    if (deltaX < -minSwipeDistance && isOpen && touchStartX.current > 100) {
      setIsOpen(false);
    }
    
    isDragging.current = false;
  };

  useEffect(() => {
    if (!isMobile()) return;

    // Adicionar event listeners para toda a tela
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen]);

  // Fechar sidebar ao clicar no overlay
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SwipeArea ref={swipeAreaRef} />
      
      <Overlay isOpen={isOpen} onClick={handleOverlayClick} />

      <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
        <SidebarHeader>
          <LogoWrapper>
            <LogoIcon width={60} height={60} />
            <Logo>{"HONEY MONEY"}</Logo>
          </LogoWrapper>
        </SidebarHeader>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
              <MenuLink 
                href={item.href} 
                active={activeItem === item.id}
                onClick={() => setIsOpen(false)}
              >
                <IconSpan>{item.icon}</IconSpan>
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </SidebarContainer>
    </>
  );
};