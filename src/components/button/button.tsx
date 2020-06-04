import React from 'react';

import { Container } from './styles';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  ...rest
}: ButtonProps) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
