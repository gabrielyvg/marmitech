const menuOptions = [
    {
        id: "clientes",
        title: "Clientes",
        subtitle: 'Listar clientes',
        url: '/clientes',
        subitem: {
            id: "cadastrar-cliente",
            title: "Adicionar cliente",
            url: '/clientes/cadastrar-cliente',
        }
    },
    {
        id: "pedidos",
        title: "Pedidos",
        subtitle: 'Listar pedidos',
        url: '/pedidos',
        subitem: {
            id: "cadastrar-pedidos",
            title: "Adicionar Pedidos",
            url: '/pedidos/cadastrar-pedidos',
        }
    },
    {
        id: "produtos",
        title: "Produtos",
        subtitle: 'Listar produtos',
        url: '/produtos',
        subitem: {
            id: "cadastrar-produtos",
            title: "Adicionar produtos",
            url: '/produtos/cadastrar-produtos',
        }
    },
    {
        id: "financeiro",
        title: "Financeiro",
        url: '/financeiro'
    },
]

const marmitasTamanho = [
    {
        id: 1,
        tamanho: 'P'
    },
    {
        id: 2,
        tamanho: 'M'
    },
    {
        id: 3,
        tamanho: 'G'
    }
]

const tableCliente = [
    {
        id: 1,
        nome: 'Nome',
    },
    {
        id: 2,
        nome: 'Telefone',
    },
    {
        id: 3,
        nome: 'Bairro',
    },
    {
        id: 4,
        nome: 'Cidade',
    },
    {
        id: 5,
        nome: 'Endereço',
    },
    {
        id: 7,
        nome: 'Paga Mensalmente'
    },
    {
        id: 8,
        nome: 'NFe'
    },
    {
        id: 9,
        nome: 'Ações',
    }
]

const tableGastos = [
    {
        id: 1,
        nome: 'Fatura',
    },
    {
        id: 2,
        nome: 'R$',
    },
    {
        id: 3,
        nome: 'Dia',
    }
]

const empresas = [
    {
        id: 1,
        nome: 'Empresa Ficticia'
    },
    {
        id: 2,
        nome: 'Empresa Teste'
    },
    {
        id: 3,
        nome: 'Empresa mais uma'
    }
]

const tiposProdutos = [
    {
        id: 1,
        nome: 'Marmita'
    },
    {
        id: 2,
        nome: 'Bebida'
    },
    {
        id: 3,
        nome: 'Doce'
    }
]

const tableProdutos = [
    {
        id: 1,
        nome: 'Nome produto',
    },
    {
        id: 2,
        nome: 'Tipo produto',
    },
    {
        id: 3,
        nome: 'Valor produto',
    },
    {
        id: 4,
        nome: 'Ações',
    }
]

export default { menuOptions, marmitasTamanho, tableCliente, tableGastos, empresas, tiposProdutos, tableProdutos };