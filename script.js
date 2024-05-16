// Dieses Skript wird ausgeführt, sobald das DOM vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function() {
    // Die URL zu deinem PHP-Skript, das die Daten liefert
    const apiUrl = 'https://189232-5.web.fhgr.ch/04_unload.php'; 

    // Startet eine Anfrage an die oben genannte URL
    fetch(apiUrl)
    .then(response => {
        // Prüft, ob die HTTP-Antwort in Ordnung ist
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        // Wandelt die Antwort in JSON um
        return response.json();  
    })
    .then(data => {
        // Ruft die Funktion auf, die die Daten anzeigt
        displayData(data);  
    })
    .catch(error => {
        // Loggt Fehler in der Konsole, wenn sie während des Fetch-Vorgangs auftreten
        console.error('There was a problem with the fetch operation:', error);
    });
});

// Diese Funktion nimmt die Daten entgegen und fügt sie in das HTML-Dokument ein
function displayData(data) {
    // Zugriff auf das Element, in dem die Daten angezeigt werden sollen
    const container = document.getElementById('charts-container-songs'); 
    // Löscht den bestehenden Inhalt, falls vorhanden
    container.innerHTML = '';  

    if (!data || data.length === 0) {
        // Zeigt eine Nachricht, wenn keine Daten vorhanden sind
        container.innerHTML = '<p>Keine Daten gefunden.</p>';  
    } else {
        // Geht durch jedes Datenobjekt und erstellt HTML-Elemente, um die Daten anzuzeigen
        let rank = 1;
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('song');  

            const audioElement = document.createElement('audio');
            const sourceElement = document.createElement('source');
            if (item.audioUrl) {
                sourceElement.src = item.audioUrl;
                sourceElement.type = 'audio/mpeg';
                audioElement.appendChild(sourceElement);
            }

            // Erstellen eines Play/Pause-Buttons
            const playButton = document.createElement('button');
            playButton.className = 'play-button';  // Setzt die Klasse für CSS-Styling
            playButton.textContent = 'Play';
            playButton.addEventListener('click', function() {
                if (audioElement.paused) {
                    audioElement.play();
                    playButton.textContent = 'Pause';
                } else {
                    audioElement.pause();
                    playButton.textContent = 'Play';
                }
            });

            div.innerHTML = `
                <div class="rank-body">
                    <span class="rank-number">#${rank++} </span>
                    <h3>${item.title || 'Unbekannter Titel'}</h3>
                    <h4> ${item.artist || 'Unbekannter Künstler'}</h4>
                    <p>Abgespielt: ${item.playCount || 'Unbekannte Anzahl'} mal</p>
                </div>
            `;

            div.appendChild(audioElement);
            div.appendChild(playButton);
            container.appendChild(div);  
        });
    }
}

// Funktion, die aufgerufen wird, wenn auf das Bild User geklickt wird
function displayArtistsOnClick() {
   // console.log("displayArtistsOnClick called"); // Überprüfen Sie, ob diese Nachricht in der Konsole erscheint
    // Die URL zu deinem PHP-Skript, das die Daten liefert
    const apiUrl = 'https://189232-5.web.fhgr.ch/04_unload.php'; 

    
    // Startet eine Anfrage an die oben genannte URL
    fetch(apiUrl)
    .then(response => {
        // Prüft, ob die HTTP-Antwort in Ordnung ist
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        // Wandelt die Antwort in JSON um
        return response.json();  
    })
    .then(data => {
        // Ruft die Funktion auf, die die Daten anzeigt
       // console.log(data); // Überprüfen Sie, ob die Daten in der Konsole angezeigt werden
        displayArtists(data);  
    })
    .catch(error => {
        // Loggt Fehler in der Konsole, wenn sie während des Fetch-Vorgangs auftreten
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Diese Funktion zeigt die meistgespielten Künstler an
function displayArtists(data) {
    // Zugriff auf das Element, in dem die Daten angezeigt werden sollen
    const container = document.getElementById('charts-container-songs'); 
    // Löscht den bestehenden Inhalt, falls vorhanden
    container.innerHTML = '';  

    if (!data || data.length === 0) {
        // Zeigt eine Nachricht, wenn keine Daten vorhanden sind
        container.innerHTML = '<p>Keine Daten gefunden.</p>';  
    } else {
        // Geht durch jedes Datenobjekt und erstellt HTML-Elemente, um die Daten anzuzeigen
        let rank = 1;
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('artist');  

             div.innerHTML = `
                 <div class="rank-body">
                     <span class="rank-number">#${rank++} </span>
                     <h3>${item.artist || 'Unbekannter Künstler'}</h3>
                     <p>Abgespielt: ${item.playCount || 'Unbekannte Anzahl'} mal</p>
                 </div>
             `;

            // Da es sich um eine Liste von Künstlern handelt, zeigen wir nur den Künstlernamen an
          //  div.textContent = item.artist || 'Unbekannter Künstler';

            container.appendChild(div);  
        });
    }
}
function displaySongsOnClick() {
    // Lädt die Seite neu
    console.log('reloading')
    window.location.reload();
}