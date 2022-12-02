let buttons = document.querySelectorAll('.btn')

if (localStorage.getItem('products') === null) {
    localStorage.setItem('products', JSON.stringify([]));
}

for (const btn of buttons) {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        
        let Id = this.parentElement.parentElement.id;
        let Image = this.parentElement.previousElementSibling.firstElementChild.src;
        let Title = this.previousElementSibling.previousElementSibling.innerHTML;
        let Price = this.previousElementSibling.innerHTML;

        let basket = JSON.parse(localStorage.getItem('products'));

        let cntcart = document.getElementById('cart-count').innerHTML

        let findElement = basket.find((x => x.Id == Id));
        
        if (findElement === undefined) {
            basket.push({
                Id: Id,
                Image: Image,
                Title: Title,
                Price: Price.replace(' AZN', ''),
                Count: 1
            })
            ShowToast('Məhsul əlavə olundu');
        }else{
            findElement.Count++;
            ShowToast('Məhsulun sayı artırıldı');
        }

        localStorage.setItem('products', JSON.stringify(basket));

        ShowItemCount();
    })
    
}


function ShowItemCount() {
    let cntcart = document.getElementById('cart-count')
    cntcart.innerHTML = JSON.parse(localStorage.getItem('products')).length;
}

ShowItemCount();


function ShowToast(msg){
    let toast = document.querySelector('#Toast');
    let txt = document.querySelector('#Toast p');
    txt.innerHTML = msg;
    toast.style.right = '20px'
    setTimeout(() => {
        toast.style.right = '-500px'
    }, 1500);
}