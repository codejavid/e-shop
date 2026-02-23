import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import products from "./data.js";


dotenv.config({
    path:"backend/config/config.env"
});



const seedProducts = async() => {

    try{

        await mongoose.connect(process.env.DB_URI);

        // delete existing products

        await Product.deleteMany();

        // Insert new products
        await Product.insertMany(products);

        process.exit();

    }catch(error){
        console.log(error);
        process.exit(1);
    }


}

seedProducts();
