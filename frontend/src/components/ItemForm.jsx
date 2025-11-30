import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
import AuthService from '../services/AuthService';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }

        if (id) {
            ItemService.getItemById(id).then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id, navigate]);

    const saveOrUpdateItem = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        if (id) {
            ItemService.updateItem(id, formData).then((response) => {
                navigate('/items');
            }).catch(error => {
                console.log(error);
            });
        } else {
            ItemService.createItem(formData).then((response) => {
                console.log(response.data);
                navigate('/items');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const title = () => {
        if (id) {
            return <h2 className="text-center">Update Item</h2>;
        } else {
            return <h2 className="text-center">Add Item</h2>;
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {title()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> Name :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Description :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Description"
                                    name="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Price :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    name="price"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Image :</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>

                            <button className="btn btn-success" onClick={(e) => saveOrUpdateItem(e)}>Submit </button>
                            <Link to="/items" className="btn btn-danger ms-2"> Cancel </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;;
