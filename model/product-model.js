const products = require('../data/products');
const { v4: uuid } = require('uuid');
const fs = require('node:fs')
const { writeData } = require('../utility')

function findAll() {
    return new Promise((resolve) => { resolve(products) });
}

function findById(id) {
    return new Promise((resolve) => {
        const product = products.find(p => p.id === id);
        resolve(product);
    } )
}

function create(product) {
    return new Promise((resolve) => {
        const newProduct = { id: uuid(), ...product };
        products.push(newProduct);
        writeData('./data/products.json', products);
        resolve(newProduct); 
    })
}

function edit(id, product) {
    return new Promise((resolve) => {
        const index = products.findIndex(p => p.id === id);
        products[index] = { id, ...product };
        writeData('./data/products.json', products);
        resolve(products[index]);  
    })
}

function delProd(id) {
    return new Promise((resolve) => {
        const index = products.findIndex(p => p.id === id);
        products.splice(index, 1);
        writeData('./data/products.json', products);
        resolve();
    })
}

module.exports = {findAll, findById, create, edit, delProd};