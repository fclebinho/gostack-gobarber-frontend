import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Input, Button, useToast } from '../../components';
import { useAuth } from '../../hooks';
import { api } from '../../services';
import logo from '../../assets/images/logo.svg';
import { Container, Content, AnimationContent, Background } from './styles';

import { getValidatorError } from '../../utils/validator-error';

export interface SignUpFormDataProps {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignUpFormDataProps): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);

        addToast({
          title: 'Cadastro realizado com sucesso.',
          type: 'success',
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidatorError(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro inesperado',
          description: 'Ocorreu erro no servidor',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input type="text" name="name" icon={FiUser} placeholder="Nome" />
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
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Já possuo uma conta
          </Link>
        </AnimationContent>
      </Content>
    </Container>
  );
};

export default SignUp;
