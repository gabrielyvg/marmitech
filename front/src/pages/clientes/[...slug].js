import { useRouter } from 'next/router';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { Toast } from 'primereact/toast';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

export default function CadastrarCliente() {
    const router = useRouter();
    const idCliente = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;
    const toast = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        telefone: '',
        bairro: '',
        cidade: '',
        endereco: '',
        numero: '',
        paga_mensalmente: false,
        paga_semanalmente: false,
        nfe: false,
    });

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setDadosFormulario((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            dadosFormulario.paga_mensalmente = dadosFormulario.paga_mensalmente ? 1 : 0;
            dadosFormulario.paga_semanalmente = dadosFormulario.paga_semanalmente ? 1 : 0;
            dadosFormulario.nfe = dadosFormulario.nfe ? 1 : 0;
            const result = await clienteService.salvar({
                data: dadosFormulario,
            })

            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Salvo', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erro!', life: 3000 });
        } finally {
            setIsLoading(false);
            voltar();
        }
    }

    const voltar = () => {
        router.push('/clientes/');
    }

    useEffect(() => {
        if (idCliente) {
            getClienteById(idCliente)
        }
    }, [idCliente]);

    const getClienteById = async (idCliente) => {
        const fetchedClienteData = await clienteService.getById({
            id: idCliente,
        });
        const updatedData = {
            ...fetchedClienteData,
            nfe: fetchedClienteData.nfe === '1' ? true : false,
            paga_mensalmente: fetchedClienteData.paga_mensalmente === 1 ? true : false,
            paga_semanalmente: fetchedClienteData.paga_semanalmente === 1 ? true : false
        };

        setDadosFormulario(updatedData);
    }

    return (
        <section className="flex justify-center">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Cadastrar cliente</h2>
                <form onSubmit={onSubmit} className='items-center'>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <FloatLabel>
                                <InputText type="text" className="p-inputtext-md"
                                    name="nome"
                                    value={dadosFormulario.nome}
                                    onChange={handleInput} />
                                <label htmlFor={'nome'}>Nome</label>
                            </FloatLabel>
                        </div>
                        <div className='ml-4'>
                            <FloatLabel>
                                <InputText type="text" className="p-inputtext-md"
                                    name="telefone"
                                    value={dadosFormulario.telefone}
                                    onChange={handleInput} />
                                <label htmlFor={'telefone'}>Telefone</label>
                            </FloatLabel>
                        </div>
                        <div className='mr-4 mt-4'>
                            <FloatLabel>
                                <InputText type="text"
                                    name="endereco"
                                    value={dadosFormulario.endereco}
                                    onChange={handleInput} />
                                <label htmlFor={'endereco'}>Endereço</label>
                            </FloatLabel>
                        </div>
                        <div className='ml-4 mt-4'>
                            <FloatLabel>
                                <InputText type="text"
                                    name="numero"
                                    value={dadosFormulario.numero}
                                    onChange={handleInput} />
                                <label htmlFor={'numero'}>Número</label>
                            </FloatLabel>
                        </div>
                        <div className='mr-4 mt-4'>
                            <FloatLabel>
                                <InputText type="text"
                                    name="bairro"
                                    value={dadosFormulario.bairro}
                                    onChange={handleInput} />
                                <label htmlFor={'bairro'}>Bairro</label>
                            </FloatLabel>
                        </div>
                        <div className='ml-4 mt-4'>
                            <FloatLabel>
                                <InputText type="text"
                                    name="cidade"
                                    value={dadosFormulario.cidade}
                                    onChange={handleInput} />
                                <label htmlFor={'cidade'}>Cidade</label>
                            </FloatLabel>
                        </div>
                        <div className="ml-4 mt-4 flex align-items-center">
                            <Checkbox type="checkbox"
                                inputId="paga_mensalmente"
                                name="paga_mensalmente"
                                value={dadosFormulario.paga_mensalmente}
                                checked={dadosFormulario.paga_mensalmente}
                                onChange={handleInput} />
                            <label htmlFor="paga_mensalmente" className="ml-2">Paga mensalmente</label>
                        </div>
                        <div className="ml-4 mt-4 flex align-items-center">
                            <Checkbox type="checkbox"
                                inputId="paga_semanalmente"
                                name="paga_semanalmente"
                                value={dadosFormulario.paga_semanalmente}
                                checked={dadosFormulario.paga_semanalmente}
                                onChange={handleInput} />
                            <label htmlFor="paga_semanalmente" className="ml-2">Paga semanalmente</label>
                        </div>
                        <div className="ml-4 mt-4 flex align-items-center">
                            <Checkbox type="checkbox"
                                 inputId="nfe"
                                 name="nfe"
                                 value={dadosFormulario.nfe}
                                 checked={dadosFormulario.nfe}
                                 onChange={handleInput} />
                            <label htmlFor="nfe" className="ml-2">Necessário tirar nota?</label>
                        </div>
                    </div>
                    <Buttons
                        voltar={voltar}
                        isLoading={isLoading}
                    />
                </form>
            </div>
            <Toast ref={toast} position="bottom-right" />
        </section>
    );
}