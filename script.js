let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (cart.length > 0 && cart.some(item => !item.image)) {
    localStorage.removeItem("cart");
    cart = [];
    alert("Keranjang telah diperbarui. Silakan tambahkan kembali produk Anda.");
}
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const cartBtn = document.getElementById("cartBtn");
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
function updateCartCount() {
    if (!cartCount) return;
    let total = 0;
    cart.forEach(item => {
        total += Number(item.qty);
    });
    cartCount.textContent = total;
}
updateCartCount();
const buttons = document.querySelectorAll(".btn-cart");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const category = this.dataset.category;
        const image = this.dataset.image;
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart[index].qty++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                category: category,
                image: image,
                qty: 1
            });
        }
        saveCart();
        updateCartCount();
        alert(name + " berhasil ditambahkan ke keranjang!");
    });
});
function tampilkanProduk() {
    if (!searchInput || !filterSelect) return;
    const keyword = searchInput.value.toLowerCase().trim();
    const kategori = filterSelect.value;
    const cards = document.querySelectorAll(".card-produk");
    cards.forEach(card => {
        const judul = card.querySelector("h3").textContent.toLowerCase();
        const kategoriProduk = card.querySelector(".btn-cart").dataset.category;
        const cocokKeyword = judul.includes(keyword);
        const cocokKategori = kategori === "all" || kategoriProduk === kategori;
        card.style.display = (cocokKeyword && cocokKategori) ? "flex" : "none";
    });
}
if (searchInput) {
    searchInput.addEventListener("keyup", tampilkanProduk);
}
if (filterSelect) {
    filterSelect.addEventListener("change", tampilkanProduk);
}
if (cartBtn) {
    cartBtn.addEventListener("click", function () {
        window.location.href = "cart.html";
    });

}
const bookData = {
"Bandung After Rain":{
penulis:"Wulan Nur Amalia",
kategori:"Novel",
penerbit:"Black Swan Books",
halaman:"282 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"Bandung, romansa, dan Ra. Hampir di setiap sudut di Kota Bandung menggambarkan kenangan manis yang Hema lakukan bersama Ra—mantan kekasihnya. 6 tahun lebih memadu kasih, tidak lantas membuat hubungan Hema dan Ra berakhir indah. Nyatanya, hubungan mereka usai tepat sebulan sebelum hari jadi mereka yang ke-7.  Kesalahan fatal yang Hema lakukan, membuat hatinya dipenuhi rasa penyesalan. Namun, Hema jadi sadar bahwa makna cinta bukan hanya tentang memberi apa yang diinginkan oleh pasangan, tapi juga tentang memahami, menghargai, dan berjuang bersama. Kalau kata Rania, “Bandung adalah kita. Dan, setelah hujan, ada cerita tentang kita.” Melewati hari-hari dengan seluruh perasaan gelisah, berjalan-jalan dibawah derasnya hujan di Kota Bandung, apakah hal itu cukup untuk mengembalikan Ra kedalam kehidupannya?"
},
"Berdamai Dengan Diri Sendiri":{
penulis:"Muthia Sayekti",
kategori:"Self Improvement",
penerbit:"Psikologi Corner",
halaman:"213 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.9/5",
deskripsi:"Berdamai dengan Diri Sendiri, Seni Menerima Diri Apa Adanya. Mengapa diri sendiri? Sebab dia adalah musuh terhebat manusia. Dia terbilang sulit untuk dikalahkan. Seseorang yang belum selesai berurusan dengan diri sendiri, pastinya sulit untuk bisa peduli dan memberi manfaat untuk orang lain. Tidak percaya? Coba telaah lagi dirimu sambil membaca buku ini, disana ada banyak harta karun yang terkubur karena dirimu sendiri."
},
"Berandal Bandung":{
penulis:"I. A. A. Djiiwaraga",
kategori:"Novel",
penerbit:"Sinar angsa",
halaman:"368 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.7/5",
deskripsi:"Harugo Nubagja, panglima geng motor The Bandrex yang berasal dari Bandung, dia dikenal sebagai sosok tangguh dan bijaksana. Namun, di balik itu, Harugo menyimpan banyak luka juga penderitaan yang mendalam. Miseila Viona hadir menjadi obat sekaligus sumber kebahagiaannya. Sayangnya, hubungan manis mereka berakhir tragis, hancur akibat badai yang terus datang secara bertubi-tubi.  Kehilangan orang-orang yang berarti dalam hidupnya, serta tragedi silih berganti membuat Harugo harus bertahan di tengah kerasnya takdir Tuhan. Meski bangkit lagi dan lagi, bayang-bayang sang mantan kekasih tak bisa hilang dari hatinya.  Setelah segala pengorbanan dan perjuangan cinta yang ia berikan untuk Miseila Viona, akankah Harugo Nubagja bisa kembali menemukan ‘Bagjanya’, atau selamanya terjebak dalam derita yang tak kunjung reda?"
},
"Cantik Itu Luka":{
penulis:"Eka Kurniawan",
kategori:"Novel",
penerbit:"Gramedia Pustaka Utama",
halaman:"508 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.9/5",
deskripsi:"Hidup di era kolonialisme bagi para wanita dianggap sudah setara seperti hidup di neraka. Terutama bagi para wanita berparas cantik yang menjadi incaran tentara penjajah untuk melampiaskan hasrat mereka. Itu lah takdir miris yang dilalui Dewi Ayu, demi menyelamatkan hidupnya sendiri Dewi harus menerima paksaan menjadi pelacur bagi tentara Belanda dan Jepang selama masa kedudukan mereka di Indonesia.  Kecantikan Dewi tidak hanya terkenal dikalangan para penjajah saja, seluruh desa pun mengakui pesona parasnya itu. Namun bagi Dewi, kecantikannya ini seperti kutukan, kutukan yang membuat hidupnya sengsara, dan kutukan yang mengancam takdir keempat anak perempuannya yang ikut mewarisi genetik cantiknya.  Tapi tidak dengan satu anak terakhir Dewi, si Cantik, yang lahir dengan kondisi buruk rupa. Tak lama setelah mendatangkan Cantik ke dunia, Dewi harus berpulang. Tapi di satu sore, dua puluh satu tahun kemudian, Dewi kembali, bangkit dari kuburannya. Kebangkitannya menguak kutukan dan tragedi keluarga.   Bagaimana takdir yang akan menghampiri si Cantik? Apa yang membuat Dewi harus kembali ke dunia bak neraka ini? Ungkap rahasia dibalik misteri kisah masa kolonial dalam novel Cantik Itu Luka karya Eka Kurniawan."
},
"Filosofi Teras":{
penulis:"Henry Manampiring",
kategori:"Self Improvement",
penerbit:"Penerbit Buku Kompas",
halaman:"336 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.9/5",
deskripsi:"Filosofi Teras adalah sebuah buku pengantar filsafat Stoa yang dibuat khusus sebagai panduan moral anak muda. Buku ini ditulis untuk menjawab masalah tentang tingkat kekhawatiran yang cukup tinggi dalam skala nasional, terutama yang dialami oleh anak muda.   Lebih dari 2.000 tahun lalu, sebuah mazhab filsafat menemukan akar masalah dan juga solusi dari banyak emosi negatif. Stoisisme, atau Filosofi Teras, adalah filsafat Yunani-Romawi kuno yang bisa membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh dalam menghadapi naik-turunnya kehidupan. Jauh dari kesan filsafat sebagai topik berat dan mengawang-awang, Filosofi Teras justru bersifat praktis dan relevan dengan kehidupan Generasi Milenial dan Gen-Z masa kini."
},
"Gadis Fahri":{
penulis:"Gisela Orealine",
kategori:"Novel",
penerbit:"Loveable",
halaman:"279 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"'Mapay Jalan Satapak' Meskipun udah bosen banget sama lagu itu karena Gadis nggak berhenti nyanyiinnya, rasa suka Fahri ke Gadis nggak berkurang sedikit pun, kok. Fahri akan tetap deketin Gadis gimanapun keadaannya. Bahkan, saat Fahri tahu kalau Gadis punya luka yang mendalam di balik lagu itu, Fahri janji akan selalu membuat Gadis bahagia. Walaupun nantinya Fahri nggak tahu mereka akan terus bersama atau nggak. Fahri: Gadis, aku selalu mau jadi hal terpenting dalam hidup kamu. Aku selalu mau jadi cinta dan kasih kamu. Aku selalu mau jadi orang yang paling penting buat kamu. Aku selalu mau, Dis. Gadis: Mapay jalan satapak, Pihh Fahri: Terserah maneh lah"
},
"Hidup Damai Tanpa Berpikir Berlebihan":{
penulis:"Tsuneko Nakamura & Hiromi Okuda",
kategori:"Self Improvement",
penerbit:"Gramedia Pustaka Utama",
halaman:"170 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"Terlalu banyak tuntutan untuk melakukan 'ini' dan 'itu' sering kali membuat kita kewalahan. Beberapa tuntutan membutuhkan kesabaran sampai batas tertentu dan membuat kita dibebani pikiran yang berlebihan. Dalam buku laris dari Jepang yang telah diterbitkan di beberapa negara ini, dokter Tsuneko Nakamura seorang psikiater yang berkarier selama hampir 70 tahun berpendapat bahwa solusinya ada pada bagaimana kita mengkompromikan perasaan dengan kenyataan. Buku Hidup Damai Tanpa Berpikir Berlebihan adalah salah satu rekomendasi buku pengembangan diri terbaik yang dapat jadi referensi belajar untuk berdamai dengan hidup. Karena dalam hidup, tidak ada seorang pun yang akan lepas dari sebuah masalah. Dari penulisnya saja, kita sudah bisa menebak isi buku ini yang akan memberi pembaca banyak pengetahuan baru tentang ilmu psikologi, terutama stres, overthinking, depresi, dan gangguan mental yang berkaitan dengannya.Cara hidupnya memiliki kebiasaan melakukan hal baik dimulai sejak dari pikiran yang membuat kita dapat menerima diri apa adanya ini sangat bermanfaat bagi kesehatan fisik dan psikis untuk meraih kehidupan yang berkualitas."
},
"Jika Kita Tak Pernah Jadi Apa-Apa":{
penulis:"Alvi Syahrin",
kategori:"Self Improvement",
penerbit:"Kawah Media",
halaman:"248 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"Kau melihat teman-teman dan mereka sudah mendapatkan impian, sementara kau masih termangu menggenggam harapan. Pelan, dalam hati kau berujar, 'Kapan mimpiku terwujud?' Jika Kita Tak Pernah Jadi Apa-Apa Selama perjalanan mencapai tujuan, adakalanya kau melihat sekeliling… menakar jauh jangkauan. Atau, kau malah membandingkannya dengan orang lain. Lalu, lupa melanjutkan perjalanan. Jika Kita Tak Pernah Jadi Apa-Apa Benarkah segala usaha dan upayamu selama ini lebur bersama kecewa yang kau bangun sendiri? Sungguhkah sesuatu yang hanya kau lihat dalam dunia maya menjadikanmu merasa bukan apa-apa? Jika Kita Tak Pernah Jadi Apa-Apa akan menemanimu selama perjalanan. Buku ini untukmu yang khawatir tentang masa depan. Tenang saja, kau tidak sedang diburu waktu. Bacalah tiap lembarnya dengan penuh kesadaran bahwa hidup adalah tentang sebaik-baiknya berusaha, jatuh lalu bangun lagi, dan tidak berhenti percaya bahwa segala perjuanganmu tidak akan sia-sia. Bukankah sebaiknya apa-apa yang fana tidak selayaknya membuatmu kecewa?."
},
"Laut Bercerita":{
penulis:"Leila S. Chudori",
kategori:"Novel",
penerbit:"Kepustakaan Populer Gramedia",
halaman:"400 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.9/5",
deskripsi:"Laut Bercerita, novel terbaru Leila S. Chudori, bertutur tentang kisah keluarga yang kehilangan, sekumpulan sahabat yang merasakan kekosongan di dada, sekelompok orang yang gemar menyiksa dan lancar berkhianat, sejumlah keluarga yang mencari kejelasan makam anaknya, dan tentang cinta yang tak akan luntur."
},
"Malioboro At Midnight":{
penulis:"Skysphire",
kategori:"Novel",
penerbit:"Kawah Media",
halaman:"460 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"Tengah malam bagi kebanyakan orang adalah waktu terbaik untuk beristirahat dan tidur lelap. Tapi untuk Serana Nighita, itu adalah waktu untuk menangisi hidup dan meratapi hubungannya dengan sang penyanyi terkenal, Jan Ichard. Popularitas membawa lelaki itu jauh darinya, Ichard di Jakarta, meninggalkan Sera di Jogja. Bagi Sera, tengah malam selalu menakutkan. Namun, semua berubah setelah Malioboro Hartigan tidak sengaja mendobrak pintu kamarnya pada sebuah malam. Malio datang dan menawarkan pertemanan agar Sera tidak sendiri, agar Sera bisa berbagi sedihnya. Lantas bagaimana dengan hubungan Sera dan Jan Ichard yang semakin rumit? Dan benarkah tanpa sadar, Malio sudah menjadi 'Midnight' terbaik Sera?"
},
"Perempuan yang Menangis Kepada Bulan Hitam":{
penulis:"Dian Purnomo",
kategori:"Novel",
penerbit:"Gramedia Pustaka Utama",
halaman:"300 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.8/5",
deskripsi:"Novel ini merupakan karya yang dihasilkannya setelah menerima grant Residensi Penulis Indonesia 2019 di Sumba. Mengisahkan kehidupan dari tokoh Megi Diela yang merupakan lulusan dari sarjana Pertanian yang berada di Yogyakarta dan juga merupakan pegawai honorer dari dinas Pertanian Waikabubak di daerah Sumba. Setelah melakukan perantauan yang menempuh pendidikan diluar daerah dan akhirnya tokoh Magi Diela kembali ke daerah kelahirannya dan akhirnya menjalani pembangunan akan daerah Sumba dimana alur cerita buku ini cukup cepat, dimana tokoh dalam buku ini yaitu Magi Diela diculik dan dijinakkan seperti layaknya binatang. Di sana ia diperlakukan tidak adil dan kejam sehingga impian untuk membangun daerah Sumba menjadi sirna. Kini Magi Diela harus melakukan perlawanan dari banyak pihak melawan orangtua, seisi kampung, dan juga adat yang ingin merenggut suatu kemerdekaannya sebagai perempuan dimana ketika budaya memenjarakan hati Magi Diela yang meronta-ronta, kini Magi Diela harus memilih sendiri nerak versinya seperti, meninggalkan orangtua dan tanah kelahirannya, menyerahkan diri kepada si mata keranjang, atau mencurangi kematiannya sendiri. Tokoh Leba Ali menjadi tokoh yang telah menyalahgunakan kekuasaannya untuk memperistri tokoh Magi Diela ini. yang bertujuan untuk memuaskan hasrat dan nafsu birahinya dan dirinya menjadikan tradisi kawin culik sebagai “tameng” untuk melancarkan aksinya terhadap Magi Diela. tokoh Magi Diela sebagai pihak yang menjadi korban pun tak bisa langsung memperjuangkan hak dan keadilan, dimana bahkan sahabat baik dari tokoh Magi Diela ini, yaitu tokoh Dangu juga memiliki kesulitan untuk menolong Magi Diela. Perempuan yang Menangis kepada Bulan Hitam ini ditulis berdasarkan pada pengalaman banyak perempuan sumba yang menjadi korban kawin tangkap yang sudah menjadi tradisi yang sudah lama ada, dimana tradisi kawin tangkap ini menggedor hati dari penulis Dian Purnomo untuk menyuarakan dari jerit perempuan yang seolah tak terdengar oleh siapapun bahkan oleh Tuhan sekalipun."
},
"Tulus Untuk Orang yang Salah":{
penulis:"Boy Candra",
kategori:"Novel",
penerbit:"Gramedia Widiasarana Indonesia",
halaman:"144 Halaman",
rating:"⭐⭐⭐⭐⭐ 4.7/5",
deskripsi:"Hubungan satu sisi melibatkan satu orang yang menginvestasikan lebih banyak waktu dan energi ke dalam hubungan daripada pasangan mereka. Padahal, satu orang tidak bisa memikul beban dalam waktu yang lama. Aku terluka dan kusembuhkan sendiri. Aku memberi ruang untuk tinggal, tetapi kamu lebih memilih memaksa menepi pergi. Aku bertahan meski kamu sering mencoba merobohkan benteng yang kubangun. Hingga akhirnya aku sadar, aku tulus pada orang yang salah. Aku mencintai sepanjang rasa kalah. Aku tidak pernah benar-benar berharga untukmu."
},
};
function showDescription(bookName){
    const book = bookData[bookName];
    if(!book) return;
    document.getElementById("popupText").innerHTML = `
<div class="popup-book">
<div class="popup-rating">
${book.rating}
</div>
<div class="popup-info">
<p><span>👤 Penulis</span><br>${book.penulis}</p>
<p><span>📚 Kategori</span><br>${book.kategori}</p>
<p><span>🏢 Penerbit</span><br>${book.penerbit}</p>
<p><span>📄 Halaman</span><br>${book.halaman}</p>
</div>
<div class="popup-desc">
<h3>📝 Deskripsi</h3>
<p>${book.deskripsi}</p>
</div>
</div>
`;
    document.getElementById("descPopup").style.display="flex";
}
function closeDescription(){
    document.getElementById("descPopup").style.display="none";
}
window.onclick=function(e){
    const popup=document.getElementById("descPopup");
    if(e.target===popup){
        popup.style.display="none";
    }
}