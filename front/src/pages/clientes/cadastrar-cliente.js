import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from "react";
import { clienteService } from '../../services/clienteService';

export default function CadastrarCliente() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
    });

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setDadosFormulario((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const formURL = event.target.action;
        const data = new FormData();

        Object.entries(dadosFormulario).forEach(([key, value]) => {
            data.append(key, value);
        })

        clienteService
            .salvar({
                data: data,
            })
            .catch((err) => {
                console.log(err);
                alert('Erro ao salvar');
            })
    };

    const voltar = () => {
        router.push('/clientes/');
    }

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='grid-cols-2'>
                    <button className='btn-back' onClick={voltar}>back
                        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
                    </button>
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className='containerElements form'>
                    <form onSubmit={onSubmit} className='items-center'>
                        <div>
                            <input type="text"
                                name="nome"
                                placeholder="Nome"
                                value={dadosFormulario.nome}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <input type="phone"
                                name="telefone"
                                placeholder="Telefone"
                                value={dadosFormulario.telefone}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <input type="text"
                                name="endereco"
                                placeholder="Endereço"
                                value={dadosFormulario.endereco}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <input type="text"
                                name="numero"
                                placeholder="Número"
                                value={dadosFormulario.numero}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <input type="text"
                                name="bairro"
                                placeholder="Bairro"
                                value={dadosFormulario.bairro}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <input type="text"
                                name="cidade"
                                placeholder="Cidade"
                                value={dadosFormulario.cidade}
                                onChange={handleInput} />
                        </div>
                        <div>
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}