import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import { Link } from 'react-router-dom';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        ItemService.getAllItems()
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("Error fetching items", error);
            });
    };

    const deleteItem = (id) => {
        ItemService.deleteItem(id)
            .then(() => {
                loadItems();
            })
            .catch(error => {
                console.error("Error deleting item", error);
            });
    };

    return (
        <div className="container">
            <h2>Item List</h2>
            <Link to="/add" className="btn btn-primary mb-2">Add Item</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <Link to={`/edit/${item.id}`} className="btn btn-info mr-2">Edit</Link>
                                <button onClick={() => deleteItem(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
