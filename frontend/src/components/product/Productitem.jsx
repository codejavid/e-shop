import { Link } from 'react-router-dom';


const Productitem = ({ product }) => {
    return (
        <div className='col-sm-12 col-md-6 col-lg-3'>
            <div className='card p-3 rounded'>
                <img className='card-img-top' src={product.images[0].url} alt="product" />
                <div className='card-body ps-3 d-flex justify-content-center flex-column'>
                    <h5 className='card-title'>
                        <a href="#">{product.name}</a>
                    </h5>

                    <div className='ratings mt-auto d-flex align-items-center'>
                        <div className="star-ratings">
                            <i className="fa fa-star star-active"></i>
                            <i className="fa fa-star star-active"></i>
                            <i className="fa fa-star star-active"></i>
                            <i className="fa fa-star star-active"></i>
                            <i className="fa fa-star star-active"></i>
                        </div>
                        <span id="no_of_reviews" className="pt-2 ps-2"> (0) </span>
                    </div>
                    <p className='card-text mt-2'>$ {product.price}</p>
                    <Link to={`/product/${product._id}`} id='view_btn' className='btn btn-block'>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Productitem