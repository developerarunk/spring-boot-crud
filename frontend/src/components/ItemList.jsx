import React, { useState, useEffect } from 'react';
import ItemService from '../services/ItemService';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        getAllItems();
    }, [navigate]);

    const getAllItems = () => {
        ItemService.getAllItems().then((response) => {
            setItems(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                AuthService.logout();
                navigate('/login');
            }
        });
    };

    const deleteItem = (itemId) => {
        ItemService.deleteItem(itemId).then((response) => {
            getAllItems();
        }).catch(error => {
            console.log(error);
        });
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center">Items List</h2>
                <div>
                    <button className="btn btn-primary me-2" onClick={() => navigate('/add-item')}>Add Item</button>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Item Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(
                                item =>
                                    <tr key={item.id}>
                                        <td>
                                            {item.imageUrl && (
                                                <img
                                                    src={`http://localhost:8080/uploads/${item.imageUrl}`}
                                                    alt={item.name}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            )}
                                        </td>
                                        <td> {item.name} </td>
                                        <td> {item.description}</td>
                                        <td> {item.price}</td>
                                        <td>
                                            <button onClick={() => navigate(`/edit-item/${item.id}`)} className="btn btn-info me-2">Update</button>
                                            <button onClick={() => deleteItem(item.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
