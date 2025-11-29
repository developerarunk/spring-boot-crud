import axios from 'axios';

const API_URL = 'http://localhost:8080/api/items';

const getAllItems = () => {
    return axios.get(API_URL);
};

const createItem = (item) => {
    return axios.post(API_URL, item);
};

const updateItem = (id, item) => {
    return axios.put(`${API_URL}/${id}`, item);
};

const deleteItem = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};
