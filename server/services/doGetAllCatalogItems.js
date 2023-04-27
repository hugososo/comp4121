import query from "./doQuery.js";

const doGetAllCatalogItems = async () => {
    const sql = "SELECT * FROM product";

    try {
        return await query(sql);
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default doGetAllCatalogItems;
