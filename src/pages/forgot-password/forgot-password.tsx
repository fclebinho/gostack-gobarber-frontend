import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { getValidatorError } from '../../utils/validator-error';
import logo from '../../assets/images/logo.svg';
import { Container, Content, AnimationContent, Background } from './styles';
import { Input, Button, useToast } from '../../components';
import { api } from '../../services';

export interface ForgotPasswordFormDataProps {
  email: string;
  password: string;
}

export const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormDataProps): Promise<void> => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um email válido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/retrieve', {
          email: data.email,
        });

        addToast({
          title: 'Recuperação de senha.',
          type: 'success',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidatorError(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um eo tentar realizar a recuperação de senha, tente novamente.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input
              type="text"
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="sign-up">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContent>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
