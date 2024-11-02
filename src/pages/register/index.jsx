import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleLogin, SubtitleLogin, Row, Wrapper, CriarText } from './styles';

const Register = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });
    const [error, setError] = useState('');

    const onSubmit = async (formData) => {
        try {
            await api.post('/users', formData);
            navigate('/login');
        } catch (e) {
            console.error('Houve um erro ao tentar realizar o cadastro:', e);
            setError('Ocorreu um erro ao tentar realizar o cadastro. Por favor, tente novamente mais tarde.');
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
                        <TitleLogin>Crie sua conta</TitleLogin>
                        <SubtitleLogin>Preencha os campos abaixo para criar sua conta.</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                placeholder="Nome completo"
                                leftIcon={<MdPerson />}
                                name="nome"
                                control={control}
                                rules={{ required: 'Nome completo é obrigatório' }}
                                error={errors.nome}
                            />
                            {errors.nome && <span>{errors.nome.message}</span>}
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
                            <Button title="Criar Minha Conta" variant="secondary" type="submit" />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                        <Row>
                            <CriarText onClick={() => navigate('/login')}>Já tenho uma conta</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Register };
