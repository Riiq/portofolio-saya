// Menunggu hingga seluruh struktur HTML (DOM) selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    // 1. Tentukan target API Anda
    //    Dalam skenario nyata, ini adalah URL server Anda.
    //    Contoh: "https://api.saya.com/v1/photos"
    //
    //    !! PENTING: Untuk demo ini, kita akan "memalsukan" (mock) API
    //    !! dengan data JSON lokal agar bisa langsung dijalankan.
    //    const apiUrl = "https://api.fotografer.com/photos"; 
    
    // 2. Panggil fungsi untuk memuat foto
    loadPortfolioPhotos();
});

// Fungsi utama untuk mengambil dan menampilkan data
async function loadPortfolioPhotos() {
    // Ambil elemen wadah dari HTML
    const gridContainer = document.getElementById("portfolio-grid");

    try {
        // == VERSI API SEBENARNYA (REST API) ==
        // Baris ini akan digunakan jika Anda punya API sungguhan
        // const response = await fetch("https://api.fotografer.com/photos");
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const photos = await response.json();
        
        // == VERSI SIMULASI (untuk demo) ==
        // Kita simulasikan respons API setelah 1 detik
        const photos = await mockFetchPhotos(); 

        // 3. Kosongkan wadah (hapus teks "Memuat foto...")
        gridContainer.innerHTML = ""; 

        // 4. Loop setiap data foto yang diterima dari API
        photos.forEach(photo => {
            // 5. Buat elemen HTML baru untuk setiap foto
            const card = document.createElement("article");
            card.className = "photo-card"; // Tambahkan class CSS

            // 6. Isi HTML di dalam kartu dengan data dari API
            card.innerHTML = `
                <img src="${photo.imageUrl}" alt="${photo.title}">
                <div class="card-content">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                </div>
            `;
            
            // 7. Masukkan kartu yang sudah jadi ke dalam wadah grid
            gridContainer.appendChild(card);
        });

    } catch (error) {
        // 8. Tampilkan pesan error jika API gagal
        console.error("Gagal memuat portofolio:", error);
        gridContainer.innerHTML = `<p class="loading-text" style="color: red;">Maaf, gagal mengambil data foto.</p>`;
    }
}


// --- FUNGSI SIMULASI API (Hanya untuk Demo) ---
// Anda bisa mengabaikan fungsi ini jika sudah punya API sendiri.
// Fungsi ini hanya berpura-pura menjadi server.
function mockFetchPhotos() {
    console.log("Memulai simulasi pengambilan data dari API...");
    
    // Ini adalah data JSON yang "dikirim" oleh server Anda
    const mockDatabaseData = [
        {
            "id": 1,
            "title": "Senja di Ufuk Barat",
            "description": "Pemandangan matahari terbenam di Pantai Kuta, Bali.",
            "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGJlYWNoJTIwc3Vuc2V0fGVufDB8fHx8MTcyOTgzMDIzOXww&ixlib=rb-4.0.3&q=80&w=400"
        },
        {
            "id": 2,
            "title": "Hiruk Pikuk Kota",
            "description": "Lampu kota Jakarta di malam hari dari ketinggian.",
            "imageUrl": "https://images.unsplash.com/photo-1502920514358-906c5225043d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHxKYWthcnRhJTIwbmlnaHR8ZW58MHx8fHwxNzI5ODMwMzM2fDA&ixlib=rb-4.0.3&q=80&w=400"
        },
        {
            "id": 3,
            "title": "Potret Candid",
            "description": "Seorang wanita tersenyum di pasar tradisional.",
            "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDN8fHBvcnRyYWl0JTIwc21pbGV8ZW58MHx8fHwxNzI5ODMwMzk0fDA&ixlib=rb-4.0.3&q=80&w=400"
        },
        {
            "id": 4,
            "title": "Megahnya Bromo",
            "description": "Kawah Gunung Bromo saat pagi hari.",
            "imageUrl": "https://images.unsplash.com/photo-1590153713052-f38b81d7f62c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGJyb21vJTIwbW91bnRhaW58ZW58MHx8fHwxNzI5ODMwNDM4fDA&ixlib=rb-4.0.3&q=80&w=400"
        }
        // TAMBAH FOTO BARU? Cukup tambah objek baru di sini (atau di database Anda)
        // {
        //     "id": 5,
        //     "title": "Foto Baru",
        //     "description": "Deskripsi foto baru.",
        //     "imageUrl": "link-gambar-baru.jpg"
        // }
    ];

    // Menggunakan Promise untuk mensimulasikan waktu tunggu (delay) jaringan
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Simulasi data berhasil diterima.");
            resolve(mockDatabaseData);
        }, 1000); // Delay 1 detik
    });
}
