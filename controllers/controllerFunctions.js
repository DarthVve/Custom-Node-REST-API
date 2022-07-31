const prod = require('../model/product-model');
const {getData} = require('../utility')

//Gets all products. Route: GET
async function getProducts(request, response) {
    try {
        const products = await prod.findAll()

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(products, null, 2));

    } catch (error) { console.log(error) }
}


//Gets a product using it's id. Route: GET
async function getProduct(request, response, id) {
    try {
        const product = await prod.findById(id);

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(product));
        }

    } catch (error) { console.log(error) }
}


//Creates a product. Route: POST
async function createProduct(request, response) {
    try {

        const data = await getData(request);
        const { title, description, price } = JSON.parse(data);

        const product = {
            title, 
            description,
            price
        }
        const newProduct = await prod.create(product)

        response.writeHead(201, { 'Content-type': 'application/json' });
        return response.end(JSON.stringify(newProduct));

    } catch (error) {console.log(error)}
}

//Edits the fields of a product. Route: PUT
async function editProduct(request, response, id) {
    try {
        const product = await prod.findById(id);

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({message: "Product Not Found"}))
        } else {
            const data = await getData(request);

            const { title, description, price } = JSON.parse(data);

            const productInfo = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const modProduct = await prod.edit(id, productInfo);

            return response.writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(modProduct));
        }
    } catch (err) { console.log(err) };
}


//Deletes a product. Route: DELETE
async function delProduct(request, response, id) {
    try {
        const product = await prod.findById(id);

        if (!product) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            await prod.delProd(id)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ message: `Product with id: ${id} has been deleted` }));
        }
    } catch (err) { console.log(err) };
}


module.exports = {getProducts, getProduct, createProduct, editProduct, delProduct};