import api from '../config/apiconfig'

export const getUsersService = async () => {
    const response = await api.get('users')
    return response.data;
}

export const deleteUserService = async (id) => {
    const response = await api.delete(`users/delete/${id}`)
    return response.data;
}

export const createUserService = async(user) => {
    debugger
    const response = await api.post('users/create', user )
    return response.data
}

export const editUserService = async(user) => {
    const response = await api.post('users/edit', user)
    return response.data
}