import query from "./doQuery.js";

const doGetAllCatalogItems = async () => {
    const products = [];
    const sql = "SELECT * FROM product";

    try {
        // Get all catalog items, then calculate maxPrice, minPrice, inStockCount, outOfStockCount
        const results = await query(sql);

        // No products found, return 400 status code with message and null data field
        if (results === null) {
            return JSON.stringify({
                status: 400,
                message: "No products found"
            });
        }

        // Products found, calculate maxPrice, minPrice, inStockCount, outOfStockCount and return the available data
        const discountedPrices = results.map(product => {
            if (product.is_Discounted) {
                return product.Price - (product.Price * product.discount_rate);
            }
            return product.Price;
        });

        const maxPrice = Math.max(...discountedPrices);
        const minPrice = Math.min(...discountedPrices);

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
                maxPrice: maxPrice,
                minPrice: minPrice,
                total: total
            }
        });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default doGetAllCatalogItems;
