import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products');
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE"
            });
            result = await result.json();
            if (result) {
                getProducts();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;
        setSearchKey(key);
        if (key) {
            try {
                let result = await fetch(`http://localhost:5000/search/${key}`);
                result = await result.json();
                if (result) {
                    setProducts(result);
                }
            } catch (error) {
                console.error("Error searching for products:", error);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list">
            <h2 style={{ margin: '15px' }}>Product List</h2>
            <input onChange={searchHandle} type="text" placeholder="Search product" value={searchKey} />

            {products.length > 0 ? (
                <ul>
                    {products.map((item, index) => (
                        <li key={item._id}>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link className="update" to={`/update/${item._id}`}>Update</Link>
                            {item.name} - {item.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <h1>No results found</h1>
            )}
        </div>
    );
};

export default ProductList;
