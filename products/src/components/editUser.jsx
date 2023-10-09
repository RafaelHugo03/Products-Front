import { useState } from 'react';
import '../resources/style/style.css'
import { createUserService, editUserService } from '../services/userService';

export default function EditUser({ isOpen, isEdit, user, title, setOpen, setUser, setIsEdit }){
    
    const[formData, setFormData] = useState({
        id: '00000000-0000-0000-0000-000000000000',
        name: '',
        email: '',
        cpf: ''
    });

    if (isEdit && formData.id !== user.id) {
        setFormData(prevFormData => ({
          ...prevFormData,
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf
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
        setUser({})
        setIsEdit(false)
        setOpen(false)
    }

    const handleSendForm = () => {
        debugger
        if(isEdit){
            editUserService(formData)
            .then(res => alert('Usuário editado com sucesso'))
            .catch(err => alert(err))
        }
        else{
            createUserService(formData)
            .then(res => alert('Usuário criado com sucesso'))
            .catch(err => alert(err))
        }
        
        debugger
        handleCloseModel()
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
                            placeholder='E-mail'
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            type="text"
                            required/>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder='CPF'
                            name="cpf" 
                            value={formData.cpf} 
                            onChange={handleInputChange} 
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            type="number" 
                            required/>
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