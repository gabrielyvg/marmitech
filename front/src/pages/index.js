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
      <div className={styles.container}>
        <div className={styles.box}>
          <div>
            <h1>{titulo}</h1>
            <span className={styles.subtitulo}>{subtitulo}</span>
          </div>
          <div className='containerElements'>
            <form onSubmit={onSubmit}>
              <input onChange={handleChange} type="text"
                name="username" values={values.username}
                placeholder="Usuário" />
              <input onChange={handleChange} type="password"
                name="password" value={values.password}
                placeholder="Senha" />
              <button type="submit">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
