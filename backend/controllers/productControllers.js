import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";
import APIFilters from "../utils/apiFilters.js";


// Get api/v1/products

export const getProducts = async (req, res) => {

    const resPerPage = 1;

    const apiFilters = new APIFilters(
        Product, 
        req.query
    )
    .search()
    .filters();

    console.log("req-user", req?.user);

    let products = await apiFilters.query;
    let filteredProductCount = products.length;

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();
 

    res.status(200).json({
        resPerPage,
        products,
        filteredProductCount
    });
};



// Get api/v1/admin/products

export const newProduct = async(req, res) => {

    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
        product
    })

    
}


// Get single products details => api/v1/products/:id

export const getProductDetails = asyncHandler(async(req, res, next) => {

    const products = await Product.findById(req.params.id);

    if(!products){
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        products
    })

})

// Update product - api/v1/products/:id

export const updateProduct = async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    });

    res.status(200).json({
        product
    });

}


// Delete product - api/v1/products/:id

export const deleteProduct = async(req, res) => {
    const product = await Product.findById(req.params.id);


    if(!product){
        console.log("Product not found");
    }
    await product.deleteOne();

    res.status(200).json({
        message: "Product deleted successfully",
    });
}
