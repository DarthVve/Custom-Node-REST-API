const http = require('http');
const { getProducts, getProduct, createProduct, editProduct, delProduct } = require('./controllers/controllerFunctions');
const products = require('./data/products');

const server = http.createServer((request, response) => {
    if (request.url === '/api/products' && request.method === 'GET') {
        getProducts(request, response)
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'GET') {
        const id = request.url.split('/')[3];
        getProduct(request, response, id);
    } else if (request.url === '/api/products' && request.method === 'POST') {
        createProduct(request, response);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'PUT') {
        const id = request.url.split('/')[3];
        editProduct(request, response, id);
    } else if (request.url.match(/\/api\/products\/([0-9]+)/) && request.method === 'DELETE') {
        const id = request.url.split('/')[3];
        delProduct(request, response, id);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({message: 'Route Unavailable'}))
    }
})

const PORT = process.env.PORT || 4001

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))