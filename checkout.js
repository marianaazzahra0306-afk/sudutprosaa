let cart = JSON.parse(localStorage.getItem("cart")) || [];
let metodeDipilih = "qris";
let bankDipilih = "";
let ongkir = 0;
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const paymentDetail = document.getElementById("paymentDetail");
const paymentRadio = document.querySelectorAll(
    'input[name="payment"]'
);
function formatRupiah(angka){
    return "Rp " + angka.toLocaleString("id-ID");
}
function getCartTotal(){
    let total = 0;
    cart.forEach(item=>{
        total += item.price * item.qty;
    });
    return total;
}
function getFinalTotal(){
    return getCartTotal() + ongkir;
}
function renderCheckout(){
    if(!checkoutItems) return;
    let html = "";
    cart.forEach(item=>{
        html += `
        <div class="checkout-item">
            <img src="${item.image}">
            <div class="checkout-item-info">
                <h3>${item.name}</h3>
                <p>
                ${item.qty} x ${formatRupiah(item.price)}
                </p>
                <b>
                ${formatRupiah(item.price * item.qty)}
                </b>
            </div>
        </div>
        `;
    });
    checkoutItems.innerHTML = html;
    updateTotal();
}
renderCheckout();
function updateTotal(){
    if(checkoutTotal){
        checkoutTotal.innerHTML =
        formatRupiah(getFinalTotal());
    }
}
paymentRadio.forEach(radio=>{
    radio.addEventListener("change",function(){
        metodeDipilih = this.value;
        if(this.value === "qris"){
            paymentDetail.innerHTML = `
            <div class="payment-info">
                <h3>
                💜 QRIS DANA
                </h3>
                <button
                type="button"
                class="pay-btn"
                onclick="openQris()">
               Pilih QRIS
                </button>
            </div>
            `;
        }
        else if(this.value === "bank"){
            paymentDetail.innerHTML = `
            <div class="payment-info">
                <h3>
                🏦 Transfer Bank
                </h3>
                <button
                type="button"
                class="pay-btn"
                onclick="openBank()">
                Pilih Bank
                </button>
            </div>
            `;
        }
        else{
            paymentDetail.innerHTML = `
            <div class="payment-info">
                <h3>
                🚚 COD
                </h3>
                <p>
                Bayar ketika barang diterima
                </p>
            </div>
            `;
        }
        updatePaymentSummary();
    });
});
function openQris(){
    metodeDipilih = "qris";
    let popup = document.getElementById("qrisPopup");
    if(popup){
        popup.style.display = "flex";
    }
}
function closeQris(){
    let popup = document.getElementById("qrisPopup");
    if(popup){
        popup.style.display = "none";
    }
}
function openBank(){
    let popup = document.getElementById("bankPopup");
    if(popup){
        popup.style.display = "flex";
    }
}
function closeBank(){
    let popup = document.getElementById("bankPopup");
    if(popup){
        popup.style.display = "none";
    }
}
function pilihBank(bank){
    bankDipilih = bank;
    let title =
    document.getElementById("bankTitle");
    let rekening =
    document.getElementById("rekening");
    if(bank === "BNI"){
        title.innerHTML =
        " Bank BNI";
        rekening.innerHTML =
        "1804300502";
    }
    else{
        title.innerHTML =
        " Bank Mandiri";
        rekening.innerHTML =
        "1307202602";
    }
    closeBank();
    let detail =
    document.getElementById("bankDetailPopup");
    if(detail){
        detail.style.display = "flex";
    }
}
function closeBankDetail(){
    let popup =
    document.getElementById("bankDetailPopup");
    if(popup){
        popup.style.display = "none";
    }
}
function lanjutBayar(){
    closeBankDetail();
    metodeDipilih = "bank";
    updatePaymentSummary();
    alert(
    "Metode pembayaran " 
    + bankDipilih 
    + " berhasil dipilih"
    );
}
function updatePaymentSummary(){
    let summaryPayment =
    document.getElementById("summaryPayment");
    let summaryBank =
    document.getElementById("summaryBank");
    if(!summaryPayment) return;
    if(metodeDipilih === "bank"){
        summaryPayment.innerHTML =
        "Transfer Bank";
        if(summaryBank){
            summaryBank.innerHTML =
            "Bank : " + (bankDipilih || "-");
        }
    }
    else if(metodeDipilih === "qris"){
        summaryPayment.innerHTML =
        "QRIS DANA";
        if(summaryBank){
            summaryBank.innerHTML = "";
        }
    }
    else{
        summaryPayment.innerHTML =
        "COD";
        if(summaryBank){
            summaryBank.innerHTML = "";
        }
    }
}
function updateShippingCost(){
    let shipping =
    document.getElementById("shipping");
    if(!shipping) return;
    let pilihan = shipping.value;
    if(pilihan === "JNE"){
        ongkir = 12000;
    }
    else if(pilihan === "J&T Express"){
        ongkir = 10000;
    }
    else if(pilihan === "SiCepat"){
        ongkir = 11000;
    }
    else if(pilihan === "AnterAja"){
        ongkir = 9000;
    }
    else{
        ongkir = 0;
    }
    let shippingCost =
    document.getElementById("shippingCost");
    if(shippingCost){
        shippingCost.innerHTML =
        formatRupiah(ongkir);
    }
    updateTotal();
}
function updateShippingSummary(){
    let name =
    document.getElementById("customerName");
    let phone =
    document.getElementById("customerPhone");
    let address =
    document.getElementById("customerAddress");
    let shipping =
    document.getElementById("shipping");
    let summaryName =
    document.getElementById("summaryName");
    let summaryPhone =
    document.getElementById("summaryPhone");
    let summaryAddress =
    document.getElementById("summaryAddress");
    let summaryShipping =
    document.getElementById("summaryShipping");
    if(summaryName){
        summaryName.innerHTML =
        name.value || "-";
    }
    if(summaryPhone){
        summaryPhone.innerHTML =
        phone.value || "-";
    }
    if(summaryAddress){
        summaryAddress.innerHTML =
        address.value || "-";
    }
    if(summaryShipping){
        summaryShipping.innerHTML =
        shipping.value || "-";
    }
}
document.querySelectorAll(
"#checkoutForm input, #checkoutForm textarea, #shipping"
)
.forEach(item=>{
    item.addEventListener(
    "input",
    updateShippingSummary
    );
    item.addEventListener(
    "change",
    function(){
        updateShippingSummary();
        updateShippingCost();
    });
});
function buatInvoice(){
    document.getElementById("invoiceNumber").innerHTML =
    "SP-" + Date.now();
    const hariIni = new Date();
    document.getElementById("invoiceDate").innerHTML =
    hariIni.toLocaleDateString("id-ID",{
        day:"2-digit",
        month:"long",
        year:"numeric"
    });
    document.getElementById("invoiceName").innerHTML =
    document.getElementById("customerName").value;
    document.getElementById("invoicePhone").innerHTML =
    document.getElementById("customerPhone").value;
    document.getElementById("invoiceAddress").innerHTML =
    document.getElementById("customerAddress").value;
    document.getElementById("invoiceShipping").innerHTML =
    document.getElementById("shipping").value;
    document.getElementById("invoicePayment").innerHTML =
    document.getElementById("summaryPayment").innerHTML;
    let html = "";
    cart.forEach(item=>{
        html += `
        <div class="invoice-item">
            <div class="invoice-item-name">
                ${item.name}<br>
                ${item.qty} x ${formatRupiah(item.price)}
            </div>
            <div class="invoice-item-price">
                ${formatRupiah(item.qty * item.price)}
            </div>
        </div>
        `;
    });
    document.getElementById("invoiceItems").innerHTML = html;
    document.getElementById("invoiceSubtotal").innerHTML =
    formatRupiah(getCartTotal());
    document.getElementById("invoiceOngkir").innerHTML =
    formatRupiah(ongkir);
    document.getElementById("invoiceTotal").innerHTML =
    formatRupiah(getFinalTotal());

}
if(checkoutForm){
    checkoutForm.addEventListener(
    "submit",
    function(e){
        e.preventDefault();
        if(cart.length === 0){
            alert(
            "Keranjang masih kosong"
            );
            return;
        }
        updateShippingSummary();
        updateShippingCost();
        updatePaymentSummary();
        buatInvoice();
        let successPopup =
        document.getElementById("successPopup");
        if(successPopup){
            successPopup.style.display =
            "flex";
        }
    });
}
let finishOrder =
document.getElementById("finishOrder");
if(finishOrder){
    finishOrder.addEventListener(
    "click",
    function(){
        localStorage.removeItem("cart");
        window.location.href =
        "index.html";
    });
}
function simpanQris(){
    closeQris();
    metodeDipilih = "qris";
    updatePaymentSummary();
    alert("Metode pembayaran QRIS berhasil dipilih");
}
function printInvoice(){
    const invoice = document.querySelector(".invoice-box").innerHTML;
    const halaman = window.open("", "", "width=900,height=1000");
    halaman.document.write(`
        <html>
        <head>
            <title>Invoice Sudut Prosa</title>
            <style>
            body{
                font-family:Poppins,Arial,sans-serif;
                padding:40px;
                color:#444;
            }
            h2,h3{
                text-align:center;
                color:#6F42C1;
            }
            hr{
                border:none;
                border-top:1px dashed #ccc;
                margin:15px 0;
            }
            .invoice-row{
                display:flex;
                justify-content:space-between;
                margin:10px 0;
            }
            .invoice-item{
                display:flex;
                justify-content:space-between;
                margin:8px 0;
            }
            button{
                display:none;
            }
            </style>
        </head>
        <body>
        ${invoice}
        </body>
        </html>
    `);
    halaman.document.close();
    halaman.focus();
    halaman.print();
    halaman.close();
}