// aplikacija.js

let sveSerije = [];

window.onload = function () {
    ucitajSve();
};

async function ucitajSve() {

    try {

        // TVMaze API
        const apiResponse = await fetch(
            "https://api.tvmaze.com/shows"
        );

        const apiData = await apiResponse.json();

        // prvih 30 sa interneta
        const tvmazeSerije = apiData.slice(0, 30);

        // tvoje serije iz baze
        const dbResponse = await fetch(
            "api.php?akcija=GET"
        );

        const dbData = await dbResponse.json();

        let mojeSerije = [];

        if (dbData.success) {
            mojeSerije = dbData.data;
        }

        // spoji obe liste
        sveSerije = [
            ...mojeSerije,
            ...tvmazeSerije
        ];

        prikaziSerije(sveSerije);

    } catch (err) {

        console.log(err);

        alert("Greška pri učitavanju serija");
    }
}

function prikaziSerije(lista) {

    const container = document.getElementById("serije");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <h3 class="text-center text-light">
                Nema serija
            </h3>
        `;

        return;
    }

    lista.forEach(serija => {

        // naziv
        const naziv = serija.name || serija.naziv || "Nepoznato";

        // žanr
        let zanr = "Nema žanra";

        if (serija.genres) {

            zanr = serija.genres.join(", ");

        } else if (serija.zanr) {

            zanr = serija.zanr;
        }

        // ocena
        let ocena = "N/A";

        if (serija.rating && serija.rating.average) {

            ocena = serija.rating.average;

        } else if (serija.ocena) {

            ocena = serija.ocena;
        }

        // slika
        let slika = "https://via.placeholder.com/300x450?text=Nema+slike";

        if (serija.image && serija.image.medium) {

            slika = serija.image.medium;

        } else if (serija.slika) {

            slika = serija.slika;
        }

        container.innerHTML += `

            <div class="col-md-3 mb-4">

                <div class="card h-100 bg-dark text-light shadow">

                    <img
                        src="${slika}"
                        class="card-img-top"
                        style="height:400px; object-fit:cover;"
                    >

                    <div class="card-body">

                        <h5 class="card-title">
                            ${naziv}
                        </h5>

                        <p>
                            <strong>Žanr:</strong>
                            ${zanr}
                        </p>

                        <p>
                            ⭐ ${ocena}
                        </p>

                    </div>

                </div>

            </div>
        `;
    });
}

function pretraziSerije() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtrirane = sveSerije.filter(serija => {

        const naziv = serija.name || serija.naziv || "";

        return naziv
            .toLowerCase()
            .includes(search);
    });

    prikaziSerije(filtrirane);
}

function sortirajSerije() {

    const sort = document
        .getElementById("sort")
        .value;

    let sortirane = [...sveSerije];

    sortirane.sort((a, b) => {

        let ocenaA = 0;
        let ocenaB = 0;

        if (a.rating && a.rating.average) {
            ocenaA = a.rating.average;
        } else if (a.ocena) {
            ocenaA = parseFloat(a.ocena);
        }

        if (b.rating && b.rating.average) {
            ocenaB = b.rating.average;
        } else if (b.ocena) {
            ocenaB = parseFloat(b.ocena);
        }

        if (sort === "ASC") {
            return ocenaA - ocenaB;
        } else {
            return ocenaB - ocenaA;
        }
    });

    prikaziSerije(sortirane);
}