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

function saveDataTolocalStorage(item){
    let items = '';
    if(localStorage.getItem('productItems') === null){
        items = [];
        items.push(item)
        localStorage.setItem('productItems',JSON.stringify(items))
    } else {
        items = JSON.parse(localStorage.getItem('productItems'))
        items.push(item)
        localStorage.setItem('productItems',JSON.stringify(items))
    }
}

function deleteItemFromLocalStorage(id){
    const items = JSON.parse(localStorage.getItem('productItems'))
    const result = items.filter((productItem) => {
        return productItem.id !== id
    });
    localStorage.setItem('productItems',JSON.stringify(result))
    if(result.length ===0) location.reload();
    // productData = result;
}

function loadEventListener(){
    addBtn.addEventListener('click', addItem);
    productListUl.addEventListener('click', deleteProduct)
    filterInput.addEventListener('keyup', filterProduct)

    window.addEventListener('DOMContentLoaded',getData.bind((null,productData)))
}



function getData(productList){
    if(productData.length > 0){
        msg.innerHTML = ''
        productList.forEach(product => {
            const {id,name,price} = product
            li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${id}`
            li.innerHTML = `<strong>${name}</strong>
            <span class="price">${price}</span>
            <i class="fa fa-trash float-right delete-product"></i>`;
            productListUl.appendChild(li)
        });
    } else {
        //msg.innerHTML = 'No item to show'
        //showMessage(true, null)

        showMessage('please add item catalog')
    }


    
}

getData(productData)

function showMessage(message = ''){
    msg.innerHTML = message;
}


const addItem = e => {
    
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    let id;
    if(productData.length === 0){
        id = 0;
    } else {
        id = productData[productData.length - 1].id +1;
    }

    if(name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))){
        alert('please fill Up The Information')
    } else {
        const data = {
            id,
            name,
            price
        }
        saveDataTolocalStorage(data);
        productData.push(data);
        productListUl.innerHTML = '';
        getData(productData)
        nameInput.value = '';
        priceInput.value = '';
    }
 
}





//delete item
const deleteProduct = e => {
    if(e.target.classList.contains('delete-product')){
        //e.target.parentElement.remove();
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);
        //console.log('you want to delete the item')

        const id = parseInt(target.id.split('-')[1]);
        deleteItemFromLocalStorage(id);
        //console.log(id)
        const result = productData.filter((product) => {
            return product.id !== id
        });
        //console.log(result)

        productData = result;
    }
    //console.log(e.target)
}


//filter search
const filterProduct =  e => {
    const text = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLowerCase();
        if(productName.indexOf(text) === -1){
            // msg.innerHTML = 'No Item to show';
            item.style.display = 'none';
        } else {
            // msg.innerHTML = '';
            item.style.display = 'block';
            ++itemLength;
        }
    });
    console.log(itemLength)
    itemLength > 0 ? showMessage() : showMessage('No Item Found');
}

loadEventListener();




// function showMessage(fetchMessage, searchMessage){
//     // if(fetchMessage){
//     //     msg.innerHTML = 'please add item'
//     // } else if(searchMessage){
//     //     msg.innerHTML = 'No item your search'
//     // }
// }

