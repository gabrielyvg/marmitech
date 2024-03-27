export const produtoService = {
    async listar() {
        const response = await fetch('http://localhost:3001/produtos/listar', {
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
            const response = await fetch('http://localhost:3001/produtos/salvar', {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao salvar produto!');
            }
            
            const responseBody = await response.json();
            return responseBody;
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            throw error;
        }
    }
}