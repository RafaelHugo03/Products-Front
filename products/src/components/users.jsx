import { useEffect, useState } from 'react'
import '../resources/style/style.css'
import { getUsersService, deleteUserService } from '../services/userService'
import { formataCpf } from '../utils/utils';
import EditUser from './editUser';
export default function Users()
{
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState();
    const [isOpenModal, setOpen] = useState(false);
    const [titleModal, setTitle] = useState();
    const [isEdit, setIsEdit] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        reloadUsers()
    }, [])

    const reloadUsers = () => {
        getUsersService()
        .then(res => setUsers(res))
        .catch(err => setErrors(err))
    }

    function deleteUser(id) {
        const confirm = window.confirm('Tem certeza que deseja deletar esse usuário')

        if(confirm){
            deleteUserService(id)
                .then(res => setUsers(users.filter(u => u.id !== id)))
                .catch(err => alert(err))
        }

    }

    const handleEditUser = (user) => {
        setOpen(!isOpenModal);
        setIsEdit(true);
        setUser(user);
        setTitle('Editar')
      };

    return( 
        <div>
            <h2 className='title'>Usuários</h2>
            <div className='App-header'>
                <div className='container blue-grey' style={{ overflowY: 'scroll', height: '600px' }}>
                    <div className='row'> 
                        <table className='centered'>
                            <thead>
                                <tr> 
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Cpf</th>
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
                                        <EditUser isEdit={isEdit}
                                            user={user} 
                                            isOpen={isOpenModal} 
                                            title={titleModal}
                                            setOpen={setOpen}
                                            setUser={setUser}
                                            setIsEdit={setIsEdit}/>
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                errors 
                                ? 
                                    alert(errors)
                                :
                                users.map(u => 
                                    <tr key={u.id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{formataCpf(u.cpf)}</td>
                                        <td>{u.createdAt}</td>
                                        <td>
                                            <a className="btn-small" onClick={() => handleEditUser(u)}>
                                                <i className="material-icons">edit</i>
                                            </a>

                                            <br/>
                                            <a className="red btn-small" onClick={() => deleteUser(u.id)} >
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}