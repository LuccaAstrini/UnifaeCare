import React, { useEffect } from 'react';
import { useRequest } from './useRequest';
import { useAuth } from '../context/AuthContext';

export function useLogin(navigation, route) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { loading, error, clearError, setError, run } = useRequest();
    const { signIn } = useAuth();

    useEffect(() => {
        if (route.params?.sessionExpiredMessage) {
            setError(route.params.sessionExpiredMessage);
        }
    }, [route.params?.sessionExpiredMessage]);

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    async function handleLogin() {
        if (email.trim() === '' || password.trim() === '') {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        if (password.length < 6) {
            setError('A senha deve conter pelo menos 6 caracteres.');
            return;
        }

        await run(async () => {
            await signIn(email, password);
            navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
        }, (e) => {
            if (e.status === 400) return 'Email inválido. Por favor, verifique o formato do seu e-mail.';
            if (e.status === 401) return 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.';
            return 'Erro ao realizar login!';
        });
    }

    function handleNavigateToRecover() {
        navigation.navigate('RecoverPasswordView');
    }

    return { email, setEmail, password, setPassword, loading, error, clearError, handleLogin, handleNavigateToRecover };
}
