import { HttpClient } from '../utils/HttpClient';
import { tokenService } from './tokenService';

export const authService = {
    async login({ email, password }) {
        return HttpClient(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            body: { email, password }
        })
            .then(async (respostaDoServidor) => {
                if (!respostaDoServidor.ok) {
                    throw new Error('Usuário ou senha inválidos!');
                }
                const body = respostaDoServidor.body;

                tokenService.save(body.data.access_token);

                return body;
            })
            .then(async ({ data }) => {
                const { refresh_token } = data;

                const response = await HttpClient('/refresh', {
                    method: 'POST',
                    body: {
                        refresh_token
                    }
                })

                console.log(response);
            })
    },
    async getSession(ctx = null) {
        const token = tokenService.get(ctx);

        return HttpClient(`${process.env.BACKEND_URL}/session`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error('Não autorizado');

                return response.body.data;
            });
    }
}