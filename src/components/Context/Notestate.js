import Notecontext from "./Notecontext";
import { json } from "react-router-dom";
import React, { useState } from 'react'
// import Product from "../Product";


function Notestate(props) {

    const host = "http://localhost:5000"
    const productinitial = []

    const [products, setProducts] = useState(productinitial);

    // ADD product
    const addProduct = async (title, brand, description, quantity, price, image) => {
        try {
            const response = await fetch(`${host}/api/product2/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, brand, description, quantity, price}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const product = await response.json();
            setProducts(products.concat({...product, image}))
            console.log(json)
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }


    // GET ALL products
    const getallProducts = async () => {
        try {
            const response = await fetch(`${host}/api/product2/read`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();
            console.log(json)
            setProducts(json)
        } catch {
            console.error('Fetch operation failed:');
        }
    }

    // Update product

    const updateProduct = async (id, title, brand, description, quantity, price, image) => {

        const response = await fetch(`${host}/api/product2/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, brand, description, quantity, price }),
        });
        const json = await response.json();
        console.log(json)


        let newProducts = JSON.parse(JSON.stringify(products))
        for (let index = 0; index < newProducts.length; index++) {
            const element = newProducts[index];
            if (element._id === id) {
                newProducts[index].title = title;
                newProducts[index].brand = brand;
                newProducts[index].description = description;
                newProducts[index].quantity = quantity;
                newProducts[index].price = price;
                newProducts[index].image = image;
                break;
            }
        }
        setProducts(newProducts)
    }
    

    // DELETE product
    const deleteProduct = async (id) => {

        const response = await fetch(`${host}/api/product2/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json)

        // console.log("deleted product is : " + id)
        const newProducts = products.filter((product) => {
            return product._id !== id
        })
        setProducts(newProducts)
    }
  
    return (
        <Notecontext.Provider value={{ products, addProduct, getallProducts, updateProduct, deleteProduct,}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate
