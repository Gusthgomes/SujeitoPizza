import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi';

export default function Product(){

    const [avatar, setAvatar] = useState("");
    const[image, setImage] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === "image/png"){
            setImage(image);
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }

    return(
        <>
            <Head>
                <title>Novos Produtos - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.label}>
                            <span>
                                <FiUpload size={30} color="#fff"/>
                            </span>

                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatar && (
                                <img
                                    src={avatar}
                                    className={styles.preview}
                                    alt="Foto"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>


                        <select>
                            <option>Bebidas</option>
                            <option>Pizzas</option>
                        </select>

                        <input
                         type="text"
                         placeholder='Digite o nome do produto:'
                         className={styles.input}
                        />

                        <input
                         type="text"
                         placeholder='Digite o preço do produto:'
                         className={styles.input}
                        />

                        <textarea
                         placeholder='Descreva o seu produto:'
                         className={styles.input}
                        />

                        <button  className={styles.buttonAdd} type='submit'>
                            Cadastrar
                        </button>

                    </form>
                </main>

                
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})