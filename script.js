// GANTI DENGAN KUNCI & URL PROYEK SUPABASE ANDA
const SUPABASE_URL = 'https://tqabvtrcjptkysfncqys.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYWJ2dHJjanB0a3lzZm5jcXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDcxMTEsImV4cCI6MjA3Njk4MzExMX0.iv0fcn3MwvJQW__TrehUx-md6HaFk9aEjEpiezONMik'; 

// URL API untuk tabel 'comments' kita
const API_URL = `${SUPABASE_URL}/rest/v1/comments`;

// Header standar untuk otentikasi Supabase
const API_HEADERS = {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json'
};


// 1. JALANKAN SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    // Ambil semua data komentar saat halaman dibuka
    loadComments();

    // Tambahkan 'event listener' ke form
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', handleFormSubmit);
});


/**
 * ==================================================
 * METODE GET
 * Mengambil semua data komentar dari Supabase
 * ==================================================
 */
async function loadComments() {
    const listContainer = document.getElementById('comments-list');
    listContainer.innerHTML = '<p>Loading messages...</p>';

    try {
        const response = await fetch(`${API_URL}?select=*`, {
            method: 'GET',
            headers: API_HEADERS
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const comments = await response.json();

        // Bersihkan list
        listContainer.innerHTML = '';

        // Tampilkan setiap komentar
        comments.forEach(comment => {
            const item = document.createElement('div');
            item.className = 'comment-item';
            
            const nameEl = document.createElement('strong');
            nameEl.textContent = comment.name;
            
            const messageEl = document.createElement('p');
            messageEl.textContent = comment.message;
            
            item.appendChild(nameEl);
            item.appendChild(messageEl);
            listContainer.appendChild(item);
        });

    } catch (error) {
        console.error('Error (GET):', error);
        listContainer.innerHTML = '<p>Failed to load messages.</p>';
    }
}


/**
 * ==================================================
 * METODE POST
 * Mengirim data baru (komentar) ke Supabase
 * ==================================================
 */
async function handleFormSubmit(event) {
    // Mencegah halaman reload saat form disubmit
    event.preventDefault();

    // Ambil data dari form
    const nameInput = document.getElementById('comment-name');
    const messageInput = document.getElementById('comment-message');

    const name = nameInput.value;
    const message = messageInput.value;

    // Buat objek data yang akan dikirim
    const newData = {
        name: name,
        message: message
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(newData) // Ubah data ke format JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Jika berhasil:
        // 1. Kosongkan form
        nameInput.value = '';
        messageInput.value = '';
        
        // 2. Muat ulang daftar komentar (GET) agar data baru muncul
        loadComments();

    } catch (error) {
        console.error('Error (POST):', error);
        alert('Failed to submit message.');
    }
}
