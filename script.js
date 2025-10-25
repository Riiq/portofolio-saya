// Menjalankan skrip setelah seluruh konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // Memanggil fungsi untuk memuat data portofolio
    loadPortfolio();

});

/**
 * Fungsi Asynchronous untuk mengambil data dari RestAPI
 * dan menampilkannya di halaman web.
 */
async function loadPortfolio() {
    const gridContainer = document.getElementById('portfolio-grid');

    // 1. Tampilkan status loading
    gridContainer.innerHTML = '<p>Loading portfolio items...</p>';

    try {
        // 2. Lakukan panggilan (fetch) ke RestAPI
        // Kita akan mengambil 9 foto dari API publik jsonplaceholder
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=9');

        // Cek jika response tidak sukses (misal: error 404 atau 500)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Ubah data response menjadi JSON
        const photos = await response.json();

        // 4. Bersihkan status loading
        gridContainer.innerHTML = '';

        // 5. Loop setiap data foto dan buat elemen HTML-nya
        photos.forEach(photo => {
            // Buat elemen div untuk kartu portofolio
            const item = document.createElement('div');
            item.className = 'portfolio-item';

            // Buat elemen gambar
            const img = document.createElement('img');
            img.src = photo.thumbnailUrl; // Ambil URL gambar mini
            img.alt = photo.title;

            // Buat elemen paragraf untuk judul
            const title = document.createElement('p');
            title.textContent = photo.title; // Ambil judul foto

            // Masukkan gambar dan judul ke dalam kartu item
            item.appendChild(img);
            item.appendChild(title);

            // Masukkan kartu item ke dalam grid di HTML
            gridContainer.appendChild(item);
        });

    } catch (error) {
        // 6. Tangani jika terjadi error
        console.error('Error fetching portfolio data:', error);
        gridContainer.innerHTML = '<p>Failed to load portfolio. Please try again later.</p>';
    }
}
