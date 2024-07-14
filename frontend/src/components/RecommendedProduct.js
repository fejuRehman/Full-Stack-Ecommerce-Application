import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const RecommendedProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct.data);
  };

  const { fetchUserAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCartCount();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container mx-auto px-4 py-6 relative'>
      <p className='text-2xl font-semibold py-4'>{heading}</p>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-3 justify-between gap-2 md:gap-6 overflow-scroll scrollbar-hidden transition-all'>
        {loading ? (
          loadingList.map((product, index) => (
            <div
              key={index}
              className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'
            >
              <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'></div>

              <div className='p-4 grid gap-3'>
                <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 bg-slate-200 w-full animate-pulse rounded-full'></h2>
                <p className='capitalize text-slate-500 p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>

                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                  <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                </div>

                <button className='text-md text-white bg-slate-200 rounded-full cursor-pointer px-3 py-2 animate-pulse'></button>
              </div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <Link
              key={index}
              to={'/product/' + product?._id}
              className='w-full min-w-[280px] md:min-w-[250px] max-w-[280px] md:max-w-[280px] bg-white rounded-sm shadow'
            >
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <img
                  src={product.productImage[0]}
                  className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply'
                  alt={product?.productName}
                />
              </div>

              <div className='p-4 grid gap-3'>
                <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                  {product?.productName}
                </h2>
                <p className='capitalize text-slate-500'>{product.category}</p>

                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className='text-slate-500 line-through'>
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>

                <button
                  className='text-md bg-red-600 hover:bg-red-700 text-white rounded-full cursor-pointer px-3 py-1'
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedProduct;
