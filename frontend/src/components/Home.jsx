import React, { useEffect } from 'react'
import productImage from "../assets/images/default_product.png"
import {useGetProductsQuery} from "../redux/api/productsApi";
import Productitem from './product/Productitem';
import Loader from './layout/Loader';
import toast from 'react-hot-toast';

const Home = () => {

  const {data, isLoading, error, isError} = useGetProductsQuery();

  useEffect(() => {

    if(isError){
      toast.error(error?.data?.message);
    }

  }, [isError]);
  
  if(isLoading){
    return (
        <Loader/>
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