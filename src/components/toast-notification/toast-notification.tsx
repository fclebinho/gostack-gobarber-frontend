import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import { Toast } from './toast';

export interface ToastBaseProps {
  type?: 'info' | 'success' | 'error';
}

export interface ToastMessageProps extends ToastBaseProps {
  id: string;
  title: string;
  description?: string;
}

export interface ToastStyleProps extends ToastBaseProps {
  hasDescription: boolean;
}

export interface ToastNotificationProps {
  messages: ToastMessageProps[];
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  messages,
}) => {
  const messagesWithTransistions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransistions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastNotification;
