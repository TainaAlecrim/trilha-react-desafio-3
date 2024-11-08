import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Login = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });
    const [error, setError] = useState('');

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                navigate('/feed');
                return;
            }

            setError('Usuário ou senha inválido');
        } catch (e) {
            console.error('Houve um erro ao tentar realizar a requisição:', e);
            setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
        }
    };

    console.log('errors', errors);

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Faça seu cadastro</TitleLogin>
                        <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                placeholder="E-mail"
                                leftIcon={<MdEmail />}
                                name="email"
                                control={control}
                                rules={{ required: 'Email é obrigatório' }}
                                error={errors.email}
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                            <Input
                                type="password"
                                placeholder="Senha"
                                leftIcon={<MdLock />}
                                name="senha"
                                control={control}
                                rules={{ required: 'Senha é obrigatória' }}
                                error={errors.senha}
                            />
                            {errors.senha && <span>{errors.senha.message}</span>}
                            <Button title="Entrar" variant="secondary" type="submit" />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                        <Row>
                            <EsqueciText>Esqueci minha senha</EsqueciText>
                            <CriarText>Criar Conta</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Login };
