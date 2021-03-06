import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks';
import { getValidatorError } from '../../utils/validator-error';
import logo from '../../assets/images/logo.svg';
import { Container, Content, AnimationContent, Background } from './styles';
import { Input, Button } from '../../components';
import { useToast } from '../../components/toast-notification/toast-hooks';

export interface SignInFormDataProps {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormDataProps): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidatorError(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro inesperado',
          description: 'Ocorreu erro no servidor',
          type: 'error',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input
              type="text"
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              type="password"
              name="password"
              icon={FiLock}
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            <Link to="forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="sign-up">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
