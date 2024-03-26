export const produtoService = {
  async listar() {
      const response = await fetch('http://localhost:3000/produto/listar', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
      });

      const data = await response.json();
      return data;
  },

  async salvar({ dados }) {
      const response = await fetch('http://localhost:3000/produto/salvar', {
          method: 'POST',
          body: dados,
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
      }).then(async (respostaDoServidor) => {
          if (!respostaDoServidor.ok) throw new Error('Erro ao salvar produto!')
          const body = respostaDoServidor.body;
          return body;
      })
  }
}