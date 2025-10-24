// Tunggu hingga seluruh konten halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- KONFIGURASI ---
    // GANTI "google" DENGAN USERNAME GITHUB ANDA
    const githubUsername = 'google'; 
    // -------------------

    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`;
    const container = document.getElementById('project-container');

    // Menggunakan Fetch API untuk mengambil data
    fetch(apiUrl)
        .then(response => {
            // Periksa apakah responsnya sukses (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Ubah respons menjadi format JSON
            return response.json();
        })
        .then(repos => {
            // Hapus pesan "Memuat proyek..."
            container.innerHTML = ''; 
            container.classList.remove('loading');

            // Cek jika tidak ada repositori
            if (repos.length === 0) {
                container.innerHTML = '<p>Tidak ada repositori publik yang ditemukan.</p>';
                return;
            }

            // Loop melalui setiap repositori (proyek)
            repos.forEach(repo => {
                // Buat elemen 'div' baru untuk kartu proyek
                const card = document.createElement('div');
                card.classList.add('project-card');

                // Isi HTML untuk kartu tersebut menggunakan data dari API
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Tidak ada deskripsi.'}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        Lihat di GitHub
                    </a>
                `;

                // Tambahkan kartu yang sudah jadi ke dalam container
                container.appendChild(card);
            });
        })
        .catch(error => {
            // Tangani jika terjadi error saat fetch
            console.error('Error fetching data:', error);
            container.innerHTML = '<p>Gagal memuat proyek. Silakan coba lagi nanti.</p>';
            container.classList.remove('loading');
        });
});