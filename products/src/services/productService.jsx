import api from '../config/apiconfig'

export const getProductsService = async () => {
    const response = await api.get('products')
    return response.data
}