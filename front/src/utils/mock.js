const menuOptions = [
    {
        id: "home",
        title: "Inicio",
        url: '/home'
    },
    {
        id: "clientes",
        title: "Clientes",
        url: '/clientes',
        subitem: {
            id: "cadastrar-cliente",
            title: "Cadastrar cliente",
            url: '/clientes/cadastrar-cliente',
        }
    },
    {
        id: "pedidos",
        title: "Pedidos",
        url: '/pedidos'
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
        id: 6,
        nome: 'Quantidade',
    },
    {
        id: 7,
        nome: 'Paga Mensalmente'
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

export default { menuOptions, marmitasTamanho, tableCliente, tableGastos, empresas };