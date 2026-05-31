import { useState } from 'react';

export function useRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function run(fn, onError) {
        try {
            setLoading(true);
            setError('');
            return await fn();
        } catch (e) {
            const msg = typeof onError === 'function'
                ? onError(e)
                : (onError ?? e.message ?? 'Ocorreu um erro inesperado.');
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, clearError: () => setError(''), setError, run };
}
