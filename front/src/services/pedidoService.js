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
        console.log('dados', dados)
        const response = await fetch('http://localhost:3001/pedido/salvar', {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(async (respostaDoServidor) => {
            if (!respostaDoServidor.ok) throw new Error('Erro ao salvar pedido!')
            const body = respostaDoServidor.body;
            return body;
        })
    }
}