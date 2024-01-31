export const clienteService = {
    async listar() {
        const response = await fetch('http://localhost:3001/cliente/listar', {
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
        console.log('sdafasdf',dados);
        const response = await fetch('http://localhost:3001/cliente/salvar', {
            method: 'POST',
            body:  dados,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(async (respostaDoServidor) => {
            if (!respostaDoServidor.ok) throw new Error('Erro ao salvar cliente!');
            const body = respostaDoServidor.body;
            return body;
        })
    }
}