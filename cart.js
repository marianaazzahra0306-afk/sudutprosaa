let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}
function renderCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML =
            "<h2 style='text-align:center;'>Keranjang masih kosong 🛒</h2>";
        totalEl.textContent = "Total : Rp 0";
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        const qty = item.qty || 1;
        const subtotal = item.price * qty;
        total += subtotal;
        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Harga : ${formatRupiah(item.price)}</p>
                <div class="qty-box">
                    <span>Jumlah :</span>
                    <button onclick="kurangQty(${index})">➖</button>
                    <strong>${qty}</strong>
                    <button onclick="tambahQty(${index})">➕</button>
                </div>
                <p>
                    <strong>Subtotal :</strong>
                    ${formatRupiah(subtotal)}
                </p>
                <button class="hapus-btn" onclick="hapusItem(${index})">
                    🗑 Hapus
                </button>
            </div>
        </div>
        `;
    });
    totalEl.textContent = "Total : " + formatRupiah(total);
}
function tambahQty(index) {
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function kurangQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function hapusItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function goCheckout() {
    window.location.href = "checkout.html";
}
renderCart();