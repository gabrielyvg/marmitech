export const produtoService = {
  async listar() {
      const response = await fetch(BACKEND_URL + '/produto/listar', {
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
      const response = await fetch(BACKEND_URL + '/produto/salvar', {
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