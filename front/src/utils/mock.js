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
        subtitle: 'Listar lançamentos',
        url: '/financeiro/lancamentos',
        subitem: {
            id: "cadastrar-lancamentos",
            title: "Adicionar lancamentos",
            url: '/financeiro/cadastrar-lancamentos',
        }
    },
    {
        id: "instituicao",
        title: "Instituição",
        subtitle: 'Listar Instituição',
        url: '/instituicao',
        subitem: {
            id: "cadastrar-instituicao",
            title: "Adicionar Instituição",
            url: '/instituicao/cadastrar-instituicao',
        }
    },
    {
        id: "usuario",
        title: "Usuários",
        subtitle: 'Listar Usuário',
        url: '/usuario',
        subitem: {
            id: "cadastrar-usuario",
            title: "Adicionar Usuário",
            url: '/usuario/cadastrar-usuario',
        }
    },
    {
        id: "relatorios",
        title: "Relatórios",
        subtitle: "Relatórios",
        url: '/relatorios',
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
        nome: 'Paga Mensalmente'
    },
    {
        id: 4,
        nome: 'Paga Semanalmente'
    },
    {
        id: 5,
        nome: 'NFe'
    },
    {
        id: 6,
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

const tablePedidos = [
    {
        id: 1,
        nome: 'Cliente',
    },
    {
        id: 2,
        nome: 'Produto'
    },
    {
        id: 3,
        nome: 'Quantidade'
    },
    {
        id: 4,
        nome: 'Pago'
    },
    {
        id: 5,
        nome: 'Data'
    }
]

const tipoInstituicao = [
    {
        id: 1,
        nome: 'Restaurante'
    },
    {
        id: 2,
        nome: 'Lava-car'
    }
]

const tipoUsuario = [
    {
        id: 1,
        nome: 'Administrador'
    },
    {
        id: 2,
        nome: 'Financeiro'
    }
]

const permissao = [
    {
        id: 1,
        tipoUsuario: 1,
        nome: 'Acesso Administrador'
    },
    {
        id: 2,
        tipoUsuario: 2,
        nome: 'Acesso Financeiro'
    }
]

export default { menuOptions, marmitasTamanho, tableCliente, tableGastos, empresas, tiposProdutos, tableProdutos, tablePedidos, tipoInstituicao, tipoUsuario, permissao };