const bar = document.getElementById('bar');
const close=document.querySelector('.close')
const nav= document.querySelector('.navbar');
   


if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })

}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })

}
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let buttons = document.querySelectorAll(".normal");

buttons.forEach(btn => {
    btn.onclick = () => {
        let name = btn.dataset.name;
        let price = parseFloat(btn.dataset.price);
        let img = btn.dataset.img;

        let item = { name, price, img, quantity: 1 };

        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart!");
        window.location.href = "cart.html";
    };
});


let cartDiv = document.querySelector(".cart-body");

if (cartDiv) {
    if (cart.length === 0) {
        cartDiv.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">No items in cart</td>
            </tr>
        `;
    } else {
        cartDiv.innerHTML = "";
        cart.forEach((p, index) => {
            cartDiv.innerHTML += `
                <tr class="item">
                    <td>
                        <a href="#" onclick="removeItem(${index})">
                            <i class="fa-regular fa-circle-xmark cross"></i>
                        </a>
                    </td>
                    <td><img src="${p.img}" width="60"/></td>
                    <td>${p.name}</td>
                    <td class="unit-price">${p.price}</td>
                    <td>
                        <input type="number" value="${p.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td class="row-total">${p.price * p.quantity}</td>
                </tr>
            `;
        });
    }
    updateCartTotal();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function updateQuantity(index, newQty) {
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
function updateCartTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalBox = document.querySelector(".cart-total");

    if (totalBox) {
        totalBox.innerText = "Total: Rs " + total;
    }
}