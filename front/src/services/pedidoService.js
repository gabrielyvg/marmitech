export const pedidoService = {
    async listar() {
        const response = await fetch('http://localhost:3001/pedido/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

        const data = await response.json();
        return data;
    },

    async salvar(dados) {
        try {
            const response = await fetch('http://localhost:3001/pedido/salvar', {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            if (!response.ok) {
                throw new Error('Erro ao salvar cliente!');
            }

            const responseBody = await response.json();
            return responseBody;
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            throw error;
        }
    }
}