import React, { HTMLAttributes } from 'react';
import { Container } from './styles';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  ...rest
}: TooltipProps) => {
  return (
    <Container {...rest}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
