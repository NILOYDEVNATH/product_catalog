//selected

const filterInput = document.querySelector('#filter')
const productListUl = document.querySelector('.collection')
const nameInput = document.querySelector('.product-name')
const priceInput = document.querySelector('.product-price')
const addBtn = document.querySelector('.add-product')
const deleteBtn = document.querySelector('.delete-product')
const msg = document.querySelector('.msg');
const formElm = document.querySelector('form')

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
    productListUl.addEventListener('click', modifyOrDeleteItem)
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
            <div class="float-right">
            <i class="fa fa-pencil edit-product"></i>
            <i class="fa fa-trash  delete-product"></i>
            </div>`;
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
    const inputIsInValid = InputAndValidate(name,price)
    if(inputIsInValid){
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



function InputAndValidate(name,price){
    return name === '' || price === '' || !(!isNaN(parseFloat(price)) && isFinite(price))
}

function findProductById(id){
    return productData.find(productItem => productItem.id === id)
}

//delete item
const modifyOrDeleteItem = e => {
    const target = e.target.parentElement.parentElement;
    const id = parseInt(target.id.split('-')[1]);
    if(e.target.classList.contains('delete-product')){
        //e.target.parentElement.remove();
        e.target.parentElement.parentElement.parentElement.removeChild(target);
        //console.log('you want to delete the item')
        deleteItemFromLocalStorage(id);
        //console.log(id)
        const result = productData.filter((product) => {
            return product.id !== id
        });
        //console.log(result)

        productData = result;
    } else if(e.target.classList.contains('edit-product')){
        
        const foundProduct = findProductById(id)
        console.log(foundProduct)
        if(!foundProduct){
            alert('Invalid Data')
        } else {
            nameInput.value = foundProduct.name
            priceInput.value = foundProduct.price
            //hide add button
            addBtn.style.display = 'none'

            //create update button
            const updateButtonElm = `<button type='submit' class='btn btn-info update-product btn-block'>Update</button>`
            formElm.insertAdjacentHTML('beforeend',updateButtonElm)
            //add event listener to update btn get the input
            
            const updateBtnElm = document.querySelector('.update-product')
            updateBtnElm.addEventListener('click',(e) => {
                e.preventDefault()
                //validate the input
                
                const inputIsInValid = InputAndValidate(nameInput.value,priceInput.value)
                if(inputIsInValid){
                    alert('input is not valid')
                } else {
                    //add data to data source
                    productData = productData.map((productItem) => {
                        if(productItem.id === id){
                            return {
                                ...productItem,
                                name : nameInput.value,
                                price : priceInput.value
                            }} else {
                                return productItem
                            }
                    })
                    //add data to UI
                    getData(productData)
                    //change data to ui

                    nameInput.value = '' 
                    priceInput.value = ''
                    updateBtnElm.style.display = 'none'
                    addBtn.style.display = 'block'
                    //add update to localStorage
                    localStorage.setItem('productItems',JSON.stringify(productData))

                    productListUl.innerHTML = '';

                }
            })


        }
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

