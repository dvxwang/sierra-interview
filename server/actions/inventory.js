const { ProductCatalog } = require("../database/ProductCatalog.js");

// Get ProductCatalog items but removes Inventory information
const getProductList = () => {
    return ProductCatalog.map((p) => {
        const product = {...p};
        delete product.Inventory;
        return product
    });
}

const fetchProduct = (product) => {
    const products = ProductCatalog.filter((p) => p.ProductName === product);
    return formatInventoryMessage(products);
}

const formatInventoryMessage = (products) => {
    if(!products.length){
        return "I'm sorry, we do not carry that product. Do you want me to check another product?"
    } else if(products.length === 1){
        const product = products[0];

        let message = '';
        if(product.Inventory > 0){
            message = `Yes! We currently have ${product.Inventory} units of ${product.ProductName} in stock.`;
        } else {
            message = `We're sorry, but ${product.ProductName} is not currently in stock.`;
        }
        return message + " Do you want me to check another product?";
    } else {
        throw new Error("Invalid data! Multiple orders found!");
    }
}

module.exports = { fetchProduct, getProductList };