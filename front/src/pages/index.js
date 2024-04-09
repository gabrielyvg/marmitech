import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { authService } from "../services/authService";

export default function Login() {
  const titulo = "Flor de sal";
  const subtitulo = "Marmitech";
  const router = useRouter();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (values.username == '' || values.password == '') {
      alert("Necessário preencher ambos os campos!");
    }

    authService
      .login({
        username: values.username,
        password: values.password,
      })
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Usuário ou a senha estão inválidos')
      })
  };

  return (
    <>
      <Head>
        <title>Marmitech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className='fixed inset-0 flex items-center justify-center border rounded'>
          <div className='w-full max-w-md p-6 rounded-md'>
            <div>
              <h1>{titulo}</h1>
              <span className="text-2xl font-semibold"> Bem-vindo de volta!</span>
            </div>
            <small className="text-indigo-600">Use o formulário abaixo para acessar sua conta</small>
            <form className="grid mt-2" onSubmit={onSubmit}>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                values={values.username}
                placeholder="Usuário"
                className="p-4 mb-2 rounded-md focus:outline-indigo-600 shadow-md shadow-indigo-500/40"
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={values.password}
                placeholder="Senha"
                className="p-4 mb-2 rounded-md focus:outline-indigo-600 shadow-md shadow-indigo-500/40"
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  className="text-indigo-600"
                >
                  Esqueceu a senha?
                </button>
                <button
                  type="submit"
                  className="bg-indigo-400 
                    text-white p-2 w-32 
                    rounded-md shadow-sm 
                    shadow-indigo-600
                    font-semibold
                    hover:bg-slate-100 hover:text-black hover:border-solid hover:border-1 hover:border-indigo-400 hover:ease-in hover:duration-300"
                >
                  Entrar
                </button>
              </div>
            </form>
            <span className="flex place-content-center mt-6 text-indigo-600">Não possui conta?
              <button className="font-semibold text-indigo-800">
                Criar conta
              </button>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
