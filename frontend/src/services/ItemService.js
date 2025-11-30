import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/items';

const getAuthHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.authdata) {
        return { Authorization: 'Basic ' + user.authdata };
    } else {
        return {};
    }
};

const getAllItems = () => {
    return axios.get(API_URL, { headers: getAuthHeader() });
};

const createItem = (itemData) => {
    // itemData can be JSON or FormData
    return axios.post(API_URL, itemData, { headers: getAuthHeader() });
};

const getItemById = (itemId) => {
    return axios.get(API_URL + '/' + itemId, { headers: getAuthHeader() });
};

const updateItem = (itemId, itemData) => {
    return axios.put(API_URL + '/' + itemId, itemData, { headers: getAuthHeader() });
};

const deleteItem = (itemId) => {
    return axios.delete(API_URL + '/' + itemId, { headers: getAuthHeader() });
};

export default {
    getAllItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem
};
