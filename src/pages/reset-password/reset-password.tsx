import React, { useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { getValidatorError } from '../../utils/validator-error';
import logo from '../../assets/images/logo.svg';
import { Container, Content, AnimationContent, Background } from './styles';
import { Input, Button, useToast } from '../../components';
import { api } from '../../services';

export interface ResetPasswordFormDataProps {
  password: string;
  password_confirmation: string;
}

export const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormDataProps): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        // Resetar

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error('Token inválido.');
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          title: 'Reset de senha realizado com sucesso.',
          type: 'success',
        });

        history.push('/sign-in');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidatorError(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Resetar senha',
          description: 'Ocorreu erro ao resetar sua senha, tente novemante.',
          type: 'error',
        });
      }
    },
    [addToast, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Nova senha"
            />
            <Input
              type="password"
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
