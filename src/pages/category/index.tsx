import {useState, FormEvent } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

export default function Category(){
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === "") {
            toast.warning("Please fill in the fields!")
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success("Category successfully registered")
        setName('');
    }

    return(
        <>
            <Head>
                <title>Categoria - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header/>
                
                <main className={styles.container}>
                    <h1>Cadastrar novas categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                         type="text"
                         placeholder='Digite o nome da categoria'
                         className={styles.input}
                         value={name}
                         onChange={ (e) => setName(e.target.value) }
                          />

                          <button
                          className={styles.buttonAdd}
                           type='submit'>
                            Cadastrar
                          </button>

                    </form>

                </main>
            </div>
        </>
    )
}