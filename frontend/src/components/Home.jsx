import React from 'react'
import productImage from "../assets/images/default_product.png"
import {useGetProductsQuery} from "../redux/api/productsApi";
import Productitem from './product/Productitem';

const Home = () => {

  const {data, isLoading, error} = useGetProductsQuery();
  
  if(isLoading){
    return (
        <h4>Loading...</h4>
    )
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12 col-sm-6 col-md-12'>
                <h1 id='products_heading' className='text-secondary'>Latest Products</h1>

                <section id='products' className='mt-5'>
                    <div className='row'>
                       {data?.products?.map((product) => (
                         <Productitem key={product._id} product={product}/>
                       ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Home