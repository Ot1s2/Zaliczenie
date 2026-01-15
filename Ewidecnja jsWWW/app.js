document.addEventListener('DOMContentLoaded', () => {
    // === 1. ZMIENNE I ELEMENTY ===
    const form = document.getElementById('formPojazd');
    const tabela = document.getElementById('tabelaPojazdy');
    const alertBox = document.getElementById('alertSuccess');
    const brakDanychInfo = document.getElementById('brakDanych');
    
    // Obsługa Modala
    const modalElement = document.getElementById('modalPojazd');
    const modalObiekt = new bootstrap.Modal(modalElement);

    // Obsługa Motywu (Ciemny/Jasny)
    const btnMotyw = document.getElementById('btnMotyw');
    const body = document.body;

    // === 2. LOGIKA TRYBU CIEMNEGO (LocalStorage) ===
    
    // Funkcja włączająca ciemny
    function wlaczCiemny() {
        body.classList.add('dark-mode');
        body.classList.remove('bg-light');
        btnMotyw.innerText = '☀️ Tryb Jasny';
        btnMotyw.classList.remove('btn-outline-dark');
        btnMotyw.classList.add('btn-outline-light');
        localStorage.setItem('motyw', 'ciemny'); // Zapisz w pamięci
    }

    // Funkcja włączająca jasny
    function wlaczJasny() {
        body.classList.remove('dark-mode');
        body.classList.add('bg-light');
        btnMotyw.innerText = '🌙 Tryb Ciemny';
        btnMotyw.classList.remove('btn-outline-light');
        btnMotyw.classList.add('btn-outline-dark');
        localStorage.setItem('motyw', 'jasny'); // Zapisz w pamięci
    }

    // Sprawdzenie przy starcie co było zapisane
    if (localStorage.getItem('motyw') === 'ciemny') {
        wlaczCiemny();
    }

    // Kliknięcie w przycisk zmiany
    btnMotyw.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            wlaczJasny();
        } else {
            wlaczCiemny();
        }
    });

    // === 3. LOGIKA FORMULARZA I TABELI ===

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Zatrzymaj odświeżanie strony

        // Walidacja Bootstrapa
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Pobranie wartości
        const nr = document.getElementById('inpNr').value;
        const marka = document.getElementById('inpMarka').value;
        const model = document.getElementById('inpModel').value;
        const rok = document.getElementById('inpRok').value;

        // Dodanie wiersza
        dodajWiersz(nr, marka, model, rok);

        // Reset formularza i zamknięcie okna
        form.reset();
        form.classList.remove('was-validated');
        modalObiekt.hide();

        // Wyświetlenie alertu sukcesu na 3 sekundy
        alertBox.classList.remove('d-none');
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 3000);
    });

    function dodajWiersz(nr, marka, model, rok) {
        // Ukryj napis "Brak danych"
        brakDanychInfo.style.display = 'none';

        const wiersz = document.createElement('tr');
        wiersz.innerHTML = `
            <td class="fw-bold">${nr}</td>
            <td>${marka}</td>
            <td>${model}</td>
            <td><span class="badge bg-secondary">${rok}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger btn-usun">Usuń</button>
            </td>
        `;

        // Obsługa przycisku USUŃ (dla tego konkretnego wiersza)
        wiersz.querySelector('.btn-usun').addEventListener('click', () => {
            if (confirm(`Czy na pewno usunąć pojazd ${nr}?`)) {
                wiersz.remove();
                // Sprawdź czy tabela jest pusta po usunięciu
                if (tabela.children.length === 0) {
                    brakDanychInfo.style.display = 'block';
                }
            }
        });

        tabela.appendChild(wiersz);
    }
});