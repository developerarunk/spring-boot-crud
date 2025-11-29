import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            ItemService.getAllItems().then((response) => {
                const item = response.data.find(i => i.id === parseInt(id));
                if (item) {
                    setName(item.name);
                    setDescription(item.description);
                    setPrice(item.price);
                }
            });
        }
    }, [id]);

    const saveItem = (e) => {
        e.preventDefault();
        const item = { name, description, price };

        if (id) {
            ItemService.updateItem(id, item).then(() => {
                navigate('/');
            });
        } else {
            ItemService.createItem(item).then(() => {
                navigate('/');
            });
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={saveItem}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success mt-2">Save</button>
            </form>
        </div>
    );
};

export default ItemForm;
