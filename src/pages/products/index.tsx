import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/Header';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

    const [avatar, setAvatar] = useState("");
    const[image, setImage] = useState(null);
    const [ categories, setCategories ] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

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

    //Quando selecionar uma nova categoria na lista
    function handleChangeCategory(e){
        console.log("Posição da categoria selecionada: ", e.target.value)
        setCategorySelected(e.target.value)
        
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


                        <select value={categorySelected} onChange={handleChangeCategory}>
                           {categories.map( (item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                           })}
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

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    console.log(response.data);

    return {
        props: {
            categoryList: response.data
        }
    }
})