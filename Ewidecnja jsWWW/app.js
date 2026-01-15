document.addEventListener('DOMContentLoaded', () => {
    // === 1. ZMIENNE I ELEMENTY ===
    const form = document.getElementById('formPojazd');
    const tabela = document.getElementById('tabelaPojazdy');
    const alertBox = document.getElementById('alertSuccess');
    const brakDanychInfo = document.getElementById('brakDanych');
    
    // Elementy interfejsu Modala (do zmiany napisów)
    const modalElement = document.getElementById('modalPojazd');
    const modalObiekt = new bootstrap.Modal(modalElement);
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalBtn = form.querySelector('button[type="submit"]');

    // Obsługa Motywu (Ciemny/Jasny)
    const btnMotyw = document.getElementById('btnMotyw');
    const body = document.body;

    // ZMIENNA GLOBALNA DO EDYCJI
    // Jeśli null = dodajemy nowy. Jeśli wskazuje na wiersz = edytujemy.
    let edytowanyWiersz = null;

    // === 2. LOGIKA TRYBU CIEMNEGO ===
    function wlaczCiemny() {
        body.classList.add('dark-mode');
        body.classList.remove('bg-light');
        btnMotyw.innerText = '☀️ Tryb Jasny';
        btnMotyw.classList.remove('btn-outline-dark');
        btnMotyw.classList.add('btn-outline-light');
        localStorage.setItem('motyw', 'ciemny');
    }

    function wlaczJasny() {
        body.classList.remove('dark-mode');
        body.classList.add('bg-light');
        btnMotyw.innerText = '🌙 Tryb Ciemny';
        btnMotyw.classList.remove('btn-outline-light');
        btnMotyw.classList.add('btn-outline-dark');
        localStorage.setItem('motyw', 'jasny');
    }

    if (localStorage.getItem('motyw') === 'ciemny') {
        wlaczCiemny();
    }

    btnMotyw.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) wlaczJasny();
        else wlaczCiemny();
    });

    // === 3. RESETOWANIE MODALA PRZY ZAMKNIĘCIU ===
    // To ważne! Jak zamkniesz okno edycji bez zapisu, musi wrócić do trybu "Dodaj"
    modalElement.addEventListener('hidden.bs.modal', () => {
        form.reset();
        form.classList.remove('was-validated');
        edytowanyWiersz = null; // Czyścimy tryb edycji
        modalTitle.innerText = "Dodaj Pojazd";
        modalBtn.innerText = "Zapisz pojazd";
        modalBtn.classList.remove('btn-warning');
        modalBtn.classList.add('btn-primary');
    });

    // === 4. LOGIKA FORMULARZA (DODAWANIE I EDYCJA) ===
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Pobranie wartości z pól
        const nr = document.getElementById('inpNr').value;
        const marka = document.getElementById('inpMarka').value;
        const model = document.getElementById('inpModel').value;
        const rok = document.getElementById('inpRok').value;

        if (edytowanyWiersz) {
            // --- TRYB EDYCJI ---
            // Aktualizujemy komórki w istniejącym wierszu
            edytowanyWiersz.cells[0].innerText = nr;
            edytowanyWiersz.cells[1].innerText = marka;
            edytowanyWiersz.cells[2].innerText = model;
            edytowanyWiersz.cells[3].innerHTML = `<span class="badge bg-secondary">${rok}</span>`;
            
            pokazAlert("Zaktualizowano dane pojazdu!");
        } else {
            // --- TRYB DODAWANIA ---
            dodajWiersz(nr, marka, model, rok);
            pokazAlert("Pojazd został dodany do listy!");
        }

        modalObiekt.hide();
    });

    // Funkcja dodająca wiersz HTML
    function dodajWiersz(nr, marka, model, rok) {
        brakDanychInfo.style.display = 'none';

        const wiersz = document.createElement('tr');
        wiersz.innerHTML = `
            <td class="fw-bold">${nr}</td>
            <td>${marka}</td>
            <td>${model}</td>
            <td><span class="badge bg-secondary">${rok}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary btn-edytuj me-1">Edytuj</button>
                <button class="btn btn-sm btn-outline-danger btn-usun">Usuń</button>
            </td>
        `;

        // Podpięcie przycisku USUŃ
        wiersz.querySelector('.btn-usun').addEventListener('click', () => {
            if (confirm(`Czy na pewno usunąć pojazd ${nr}?`)) {
                wiersz.remove();
                if (tabela.children.length === 0) brakDanychInfo.style.display = 'block';
            }
        });

        // Podpięcie przycisku EDYTUJ
        wiersz.querySelector('.btn-edytuj').addEventListener('click', () => {
            // 1. Włączamy tryb edycji
            edytowanyWiersz = wiersz;
            
            // 2. Pobieramy dane z tabeli do formularza
            // cells[0] to Nr, cells[1] to Marka...
            document.getElementById('inpNr').value = wiersz.cells[0].innerText;
            document.getElementById('inpMarka').value = wiersz.cells[1].innerText;
            document.getElementById('inpModel').value = wiersz.cells[2].innerText;
            document.getElementById('inpRok').value = wiersz.cells[3].innerText; // text wyciągnie rok z badge'a

            // 3. Zmieniamy wygląd Modala
            modalTitle.innerText = "Edytuj Pojazd";
            modalBtn.innerText = "Zapisz zmiany";
            modalBtn.classList.remove('btn-primary');
            modalBtn.classList.add('btn-warning'); // Żółty guzik przy edycji

            // 4. Otwieramy Modal
            modalObiekt.show();
        });

        tabela.appendChild(wiersz);
    }

    function pokazAlert(tekst) {
        alertBox.innerText = "✅ " + tekst;
        alertBox.classList.remove('d-none');
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 3000);
    }
});