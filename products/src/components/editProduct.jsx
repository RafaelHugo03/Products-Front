import { useEffect, useState } from 'react';
import '../resources/style/style.css';
import { getUsersService } from '../services/userService';

export default function Editproduct({ isOpen, isEdit, product, title, setOpen, setProduct, setIsEdit }){

    const [users, setUsers] = useState([])

    useEffect(() => {
        reloadUsers()
    }, [])

    const reloadUsers = () => {
        getUsersService()
        .then(res => setUsers(res))
    }
    
    const[formData, setFormData] = useState({
        id: '00000000-0000-0000-0000-000000000000',
        name: '',
        price: null,
        userId: ''
    });

    if (isEdit && formData.id !== product.id) {
        setFormData(prevFormData => ({
          ...prevFormData,
          id: product.id,
          name: product.name,
          price: product.price,
          userId: product.userId
        }));
      }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleCloseModel = () => {
        window.location.reload();
        setProduct({})
        setIsEdit(false)
        setOpen(false)
    }
    

    if(isOpen){
        return(
            <div className='modal-background'>
                <div className='modal-default'>
                    <h2 className='title-modal'>{title}</h2>
                    <div className="input-field">
                        <input 
                            placeholder='Nome'
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            type="text"
                            required/>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder='Preço'
                            name="email" 
                            value={formData.price} 
                            onChange={handleInputChange} 
                            type="number"
                            required/>
                    </div>
                    <div className="input-field">
                        <select>
                            <option value="1">Choose your option</option>
                            {
                                users.map(u => 
                                    <option value={u.id}>{u.name}</option>
                                )
                            }
                        </select>
                        <label>Materialize Select</label>
                    </div>
                    <div className='left-items'>
                        <a className='btn-large red' onClick={() => handleCloseModel()}>
                            Cancelar
                        </a>
                    </div>
                    <div className='right-items'>
                        <a className='btn-large blue' onClick={() => handleSendForm()}>
                            Salvar
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return <></>
    }
}