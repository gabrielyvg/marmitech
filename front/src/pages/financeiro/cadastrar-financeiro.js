import { useRouter } from 'next/router';
import { useState } from "react";

export default function CadastrarFinanceiro() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        nomeFatura: '',
        dinheiroGasto: '',
        dia: '',
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
        const data = new FormData();
        Object.entries(dadosFormulario).forEach(([key, value]) => {
            data.append(key, value);
        })
      /*   pedidoService
            .salvar({
                data: data,
            })
            .catch((err) => {
                console.log(err);
            }) */
    };

    const voltar = () => {
        router.push('/financeiro/');
    }


    return (
        <section className="bg-neutral-100">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Registrar fatura</h2>
                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <label htmlFor="nomeFatura" className="block mb-2 text-sm font-medium text-gray-900">Nome fatura</label>
                            <input type="text"
                                name="nomeFatura"
                                placeholder='Nome Fatura'
                                value={dadosFormulario.nomeFatura}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="dinheiroGasto" className="block mb-2 text-sm font-medium text-gray-900">R$</label>
                            <input type="text"
                                name="dinheiroGasto"
                                placeholder='R$'
                                value={dadosFormulario.dinheiroGasto}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />

                        </div>
                        <div className='mt-4'>
                            <label htmlFor="dia" className="block mb-2 text-sm font-medium text-gray-900">Dia da compra</label>
                            <input type="text"
                                name="dia"
                                placeholder='Dia'
                                value={dadosFormulario.dia}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button className='border-solid border-2 text-white rounded-md px-5 py-1 mr-3 bg-gray-400 hover:bg-gray-500' onClick={voltar}>Voltar</button>
                        <button className='border-solid border-2 text-white rounded-md px-5 py-1 bg-emerald-500 hover:bg-emerald-600' type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}