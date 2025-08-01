import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { LoginRequest } from '../../types/auth';
import { validators, validateForm } from '../../utils/validation';
import { Button, Input, Label, ErrorMessage, FormGroup } from '../../styles';
import { Loading } from '../common/Loading';

const LoginFormContainer = styled.form`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

export const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const formProps = useForm<LoginRequest>({
    initialValues: {
      email: '',
      senha: '',
    },
    onSubmit: async (formValues) => {
      await login(formValues);
    },
    validate: (formValues) => validateForm(formValues, {
      email: [validators.required, validators.email],
      senha: [validators.required],
    }),
  });

  const { values, errors, isSubmitting, handleChange, handleSubmit } = formProps;

  if (isSubmitting) {
    return <Loading text="Fazendo login..." />;
  }

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <Title>Entrar</Title>

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Sua senha"
          value={values.senha}
          onChange={(e) => handleChange('senha', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
        Entrar
      </SubmitButton>
    </LoginFormContainer>
  );
};
