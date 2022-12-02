let buttons = document.querySelectorAll('.btn')
let countOfItems = 0;
let totalPrice = 0;

if (localStorage.getItem('products') === null) {
    localStorage.setItem('products', JSON.stringify([]));
    let notfound = document.querySelector('#NotFound');
    let content = document.querySelector('#Content');
    notfound.classList.remove('d-none');
    content.classList.add('d-none');
}else{
    let html = '';

    let basket = JSON.parse(localStorage.getItem('products'));
    if (basket.length === 0) {
        let notfound = document.querySelector('#NotFound');
        let content = document.querySelector('#Content');
        notfound.classList.remove('d-none');
        content.classList.add('d-none');
    }else{
        let card_content = document.querySelector('#card-content-div');
    for (const item of basket) {
        html += `
        <div class="carditem card mb-20px">
            <div class="row align-items-center">
                <div class="id-div col-lg-1 d-flex justify-content-center align-items-center">
                    <p>${item.Id}</p>
                </div>
                <div class="img-div col-lg-2">
                    <img src="${item.Image}" alt="">
                </div>
                <div class="title-div col-lg-5">
                    <h3>${item.Title}</h3>
                </div>
                <div class="cnt-div col-lg-1-5 d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center">
                        <i id="RemoveItem" class="fa-solid fa-minus"></i>
                        <p>${item.Count}</p>
                        <i id="AddItem" class="fa-solid fa-plus"></i>
                    </div>
                </div>
                <div class="price-div col-lg-1-5 d-flex justify-content-center align-items-center">
                    <p>${item.Price * item.Count} <span>AZN</span></p>
                </div>
                <div class="close-btn-div col-lg-1 d-flex justify-content-center align-items-center">
                    <i id="DeleteItem" class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>            
        `
        countOfItems += item.Count;
        totalPrice += item.Count * item.Price;
    }

    let selected = document.querySelector('#Selected');
    selected.innerHTML = countOfItems;

    let total = document.querySelector('#Total');
    total.innerHTML = totalPrice + " AZN";

    card_content.innerHTML = html;
    let cards = document.querySelectorAll('.carditem');
    
    for (const card of cards) {
        let itemRemove = card.firstElementChild.querySelector(':nth-child(4) #RemoveItem');
        let itemAdd = card.firstElementChild.querySelector(':nth-child(4) #AddItem');
        let itemDelete = card.firstElementChild.querySelector(':nth-child(6) #DeleteItem');

        itemRemove.addEventListener('click', function(){
            let pr_id = card.querySelector('.row .id-div p').innerHTML;
            let element = basket.find(x => x.Id == pr_id)

            if (element.Count == 1) {
                console.log('bir dene var onsuz');
            }else{
                element.Count--;
                localStorage.setItem('products', JSON.stringify(basket));
                location.reload();
            }
        })

        itemAdd.addEventListener('click', function(){
            let pr_id = card.querySelector('.row .id-div p').innerHTML;
            let element = basket.find(x => x.Id == pr_id)

            element.Count++;
            localStorage.setItem('products', JSON.stringify(basket));  
            location.reload();
        })

        itemDelete.addEventListener('click', function(){
            let pr_id = card.querySelector('.row .id-div p').innerHTML;
            let element = basket.find(x => x.Id == pr_id)

            basket.splice(basket.indexOf(element), 1); 
            localStorage.setItem('products', JSON.stringify(basket));  
            location.reload();
        })
    }
    }
    
    

}


function ShowItemCount() {
    let cntcart = document.getElementById('cart-count')
    cntcart.innerHTML = JSON.parse(localStorage.getItem('products')).length;
}

ShowItemCount();








