// localStorage.setItem('firstName','Niloy')
// localStorage.setItem('LastName','Shakil')

// const person = {
//     firstName : 'samim',
//     lastname : 'Niloy'
// }
// localStorage.setItem('person', JSON.stringify(person))
// console.log(JSON.parse(localStorage.getItem('person', person)))

// console.log(localStorage.getItem('firstName'))

//selected

const filterInput = document.querySelector('#filter')
const productListUl = document.querySelector('.collection')
const nameInput = document.querySelector('.product-name')
const priceInput = document.querySelector('.product-price')
const addBtn = document.querySelector('.add-product')
const deleteBtn = document.querySelector('.delete-product')
const msg = document.querySelector('.msg');

//data /state

let productData = getDataFromLocalStorage();

function getDataFromLocalStorage(){
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('productItems'))
    }
    return items;
}