import { useEffect, useState } from "react";
import { getProductsService } from "../services/productService";
import '../resources/style/style.css'
import Editproduct from "./editProduct";

export default function Products(){
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState()
    const [isOpenModal, setOpen] = useState(false);
    const [titleModal, setTitle] = useState();
    const [isEdit, setIsEdit] = useState();

    useEffect(() => {
        reloadProducts()
    }, [])

    const reloadProducts = () => {
        getProductsService()
        .then(res => setProducts(res))
        .catch(err => setErrors(err))
    }


    return(
        <div>
            <h2 className='title'>Produtos</h2>
            <div className='App-header'>
                <div className='container blue-grey' style={{ overflowY: 'scroll', height: '600px' }}>
                    <div className='row'> 
                        <table className='centered'>
                            <thead>
                                <tr> 
                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Criado Por</th>
                                    <th>Criado em</th>
                                    <th>
                                        <a 
                                            class="btn blue" 
                                            onClick={ () => { 
                                                setOpen(!isOpenModal) 
                                                setTitle('Cadastrar')}
                                            }>
                                            <i class="material-icons">add</i>
                                        </a>
                                        <Editproduct isOpen={isOpenModal} title={titleModal}/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}