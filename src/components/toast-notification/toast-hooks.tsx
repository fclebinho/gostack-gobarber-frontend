import React, { createContext, useContext, useState, useCallback } from 'react';
import { uuid } from 'uuidv4';

import { ToastNotification, ToastMessageProps } from '..';

export interface ToastHooksProps {
  addToast(message: Omit<ToastMessageProps, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastHooksProps>({} as ToastHooksProps);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageProps[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageProps, 'id'>) => {
      const toast = {
        id: uuid(),
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastNotification messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastHooksProps => {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error('useToast must be used within an ToastProvider');

  return context;
};

export default ToastProvider;
