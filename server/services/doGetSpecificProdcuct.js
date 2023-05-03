import query from "./doQuery.js";

const doGetSpecificProdcuct = async (id) => {
    const product = [];
    const sql = "SELECT * FROM product WHERE productID = ?";
    try {

        const results = await query(sql , [id]);

        if (results === null) {
            return JSON.stringify({
                status: 400,
                message: "Product not found"
            });
        }
        const discountedPrices = results.map(product => {
            if (product.is_Discounted) {
                return product.Price - (product.Price * product.discount_rate);
            }
            return product.Price;
        });
        const inStock = results.filter(product => product.Stock > 0).length;
        const outStock = results.filter(product => product.Stock === 0).length;
        const total = results.length;

        return JSON.stringify({
            status: 200,
            message: "Success",
            data: {
                products: results,
                inStock: inStock,
                outStock: outStock,
            }
        });
    } catch (error) {
        console.error(error);
        return error;
    }


}

export default doGetSpecificProdcuct;