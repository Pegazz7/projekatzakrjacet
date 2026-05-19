async function dodajSeriju() {

    const naziv = document.getElementById("naziv").value;
    const zanr = document.getElementById("zanr").value;
    const godina = document.getElementById("godina").value;
    const ocena = document.getElementById("ocena").value;

    if (!naziv || !zanr || !godina || !ocena) {
        alert("Popuni sva polja");
        return;
    }

    try {

        let slika = "https://via.placeholder.com/300x450?text=Nema+slike";

        // OMDb API
        const omdb = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(naziv)}&apikey=YOUR_API_KEY`
        );

        const omdbData = await omdb.json();

        if (omdbData.Poster && omdbData.Poster !== "N/A") {
            slika = omdbData.Poster;
        }

        // API
        const response = await fetch('api.php?akcija=ADD_SERIJA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                naziv,
                zanr,
                godina,
                ocena,
                slika
            })
        });

        const data = await response.json();

        if (data.success) {

            alert("Serija uspešno dodata");

            document.getElementById("naziv").value = "";
            document.getElementById("zanr").value = "";
            document.getElementById("godina").value = "";
            document.getElementById("ocena").value = "";

        } else {

            alert(data.message || "Greška");
        }

    } catch (error) {

        console.log(error);
        alert("Server greška");
    }
}

async function obrisiSeriju(id) {

    if (!confirm("Da li želiš da obrišeš seriju?")) return;

    try {

        const response = await fetch(
            "api.php?akcija=DELETE&id=" + id,
            {
                method: "POST",
                credentials: "same-origin"
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Obrisano!");

        } else {

            alert(data.message);
        }

    } catch (err) {

        console.log(err);
        alert("Greška pri brisanju");
    }
}

function logout() {
    window.location = "logout.php";
}