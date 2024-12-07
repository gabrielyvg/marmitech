export const usuarioService = {
  async listar() {
      const response = await fetch('http://localhost:3001/usuario/listar', {
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
          const response = await fetch('http://localhost:3001/usuario/salvar', {
              method: 'POST',
              body: JSON.stringify(dados),
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
          })
          if (!response.ok) {
              throw new Error('Erro ao salvar Usuário!');
          }

          const responseBody = await response.json();
          return responseBody;
      } catch (error) {
          console.error('Erro ao salvar usuario:', error);
          throw error;
      }
  },

  async getById(id) {
      try {
          const response = await fetch(`http://localhost:3001/usuario/listar/${JSON.stringify(id)}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
          });

          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Erro ao buscar usuario:', error);
          throw error;
      }
  },

  async remover(id) {
      try {
          const response = await fetch(`http://localhost:3001/usuario/remover/${JSON.stringify(id)}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
          });

          if (!response.ok) {
              throw new Error('Erro ao remover usuario!');
          }

          const responseBody = await response.json();
          return responseBody;
      } catch (error) {
          console.error('Erro ao remover usuario:', error);
          throw error;
      }
  },
}