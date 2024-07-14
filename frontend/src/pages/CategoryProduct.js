import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
        setLoading(false);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryName => selectCategory[categoryName]);
        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => {
            if (arrayOfCategory.length - 1 === index) {
                return `category=${el}`;
            } else return `category=${el}&&`;
        });

        navigate('/product-category?' + urlFormat.join(""));
    }, [selectCategory]);


    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);
        setData(prev => {
            const sortedData = [...prev].sort((a, b) => {
                if (value === 'asc') {
                    return a.sellingPrice - b.sellingPrice;
                } else if (value === 'dsc') {
                    return b.sellingPrice - a.sellingPrice;
                }
                return 0; // default case, no sorting applied
            });
            return sortedData;
        });
    };

    return (
        <div className='container mx-auto p-4'>
            {/* desktop version  */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/* left side  */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* sort by  */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Sort By</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex gap-2'>
                                <input type='radio' name='sortBy'   onChange={handleOnChangeSortBy} value={'asc'} />
                                <label>Price - Low to High </label>
                            </div>
                            <div className='flex gap-2'>
                                <input type='radio' name='sortBy'  onChange={handleOnChangeSortBy}  value={'dsc'} />
                                <label>Price - High to Low </label>
                            </div>
                        </form>
                    </div>

                    {/* filter by  */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {/* here i will show all category  */}
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className='flex items-center gap-3' key={index}>
                                            <input type='checkbox' name={"category"} checked={!!selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={categoryName?.value} >{categoryName?.label}</label>
                                        </div>
                                    );
                                })
                            }
                        </form>
                    </div>
                </div>

                {/* right side product */}
                <div>
                    <p className='text-slate-800 text:lg mb-2 px-4 font-medium'>Search Results: {data.length}</p>
                    <div className='min-h-[calc(120vh-120px)] overflow-scroll max-h-[calc(120vh-120px)]'>
                        {
                            data.length !== 0 && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
