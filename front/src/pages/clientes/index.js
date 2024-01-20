import React, { useState, useEffect } from 'react';
import { clienteService } from '../../services/clienteService';
import { useRouter } from 'next/router';

export default function Clientes() {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            clienteService.listar()
                .then((response) => {
                    setClientes(response);
                    setCarregando(false);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    }, []);

    const addCliente = () => {
        router.push('/clientes/cadastrar-cliente');
    }

    return (
        <>
            <div className='align-right'>
                <h1>Lista de clientes</h1>
                <button className='btn' onClick={addCliente}>Adicionar Cliente</button>
            </div>
            {
                carregando ? (
                    <p>Carregando dados...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </>
    )
}