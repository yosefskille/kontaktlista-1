document.addEventListener('DOMContentLoaded', () => {
    const contactlist = document.getElementById('contactlist');
    const nameinput = document.getElementById('nameinput');
    const phoneinput = document.getElementById('phoneinput');
    const createbutton = document.getElementById('createbutton');

    createbutton.addEventListener('click', läggTillKontakt);

    function läggTillKontakt() {
        const namn = nameinput.value.trim();
        const telefon = phoneinput.value.trim();

        if (namn === "" || telefon === "") {
            alert("ange både namn och telefonummer.");
            return;
        }

        const kontaktobjekt = document.createElement('li');
        kontaktobjekt.className = 'contact-item'; // Corrected to `className`

        const kontaktinfo = document.createElement('span');
        kontaktinfo.className = 'contact-info';
        kontaktinfo.textContent = `${namn} - ${telefon}`;
        kontaktobjekt.appendChild(kontaktinfo);

        const ändraknapp = document.createElement('button');
        ändraknapp.textContent = 'ändra';
        ändraknapp.onclick = function () {
            redigerakontakt(kontaktobjekt, kontaktinfo);
        };

        kontaktobjekt.appendChild(ändraknapp);

        const raderaknapp = document.createElement('button');
        raderaknapp.textContent = 'radera'; // Fixed typo here
        raderaknapp.onclick = function () {
            contactlist.removeChild(kontaktobjekt);
        };

        kontaktobjekt.appendChild(raderaknapp);
        contactlist.appendChild(kontaktobjekt);

        nameinput.value = '';
        phoneinput.value = '';
    }

    function redigerakontakt(kontaktobjekt, kontaktinfo) {
        const [aktuelltnamn, aktuelltelefon] = kontaktinfo.textContent.split(' - ');
        const namnredigera = document.createElement('input');
        namnredigera.type = 'text';
        namnredigera.value = aktuelltnamn; // Corrected to reflect name

        const telefonredigera = document.createElement('input');
        telefonredigera.type = 'text';
        telefonredigera.value = aktuelltelefon;

        kontaktobjekt.replaceChild(namnredigera, kontaktinfo);
        kontaktobjekt.replaceChild(telefonredigera, kontaktobjekt.querySelector('button')); // Adjusted

        kontaktobjekt.querySelectorAll('button').forEach(button => button.remove());

        const sparaknapp = document.createElement('button');
        sparaknapp.textContent = 'spara';
        sparaknapp.onclick = function () {
            sparakontakt(kontaktobjekt, namnredigera.value, telefonredigera.value, namnredigera, telefonredigera);
        };
        kontaktobjekt.appendChild(sparaknapp);
    }

    function sparakontakt(kontaktobjekt, namn, telefon, namnredigera, telefonredigera) {
        if (namn.trim() === "" || telefon.trim() === "") {
            alert("ange både namn och telefonnummer");
            return;
        }

        const kontaktinfo = document.createElement('span');
        kontaktinfo.className = 'contact-info';
        kontaktinfo.textContent = `${namn} - ${telefon}`;

        kontaktobjekt.replaceChild(kontaktinfo, namnredigera);
        kontaktobjekt.replaceChild(kontaktinfo, telefonredigera); // Adjusted

        const ändraknapp = document.createElement('button');
        ändraknapp.textContent = 'ändra';
        ändraknapp.onclick = function () {
            redigerakontakt(kontaktobjekt, kontaktinfo);
        };
        kontaktobjekt.appendChild(ändraknapp);

        const raderaknapp = document.createElement('button');
        raderaknapp.textContent = 'radera';
        raderaknapp.onclick = function () {
            contactlist.removeChild(kontaktobjekt);
        };
        kontaktobjekt.appendChild(raderaknapp);
    }
});
