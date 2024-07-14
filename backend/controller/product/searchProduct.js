const productModel = require("../../models/productModel");

const SearchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'ig'); // 'i' for case-insensitive, 'g' for global search

        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });
        // console.log("products",products)
        
        res.json({
            data: products,
            message: "Search product list", 
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = SearchProduct;
