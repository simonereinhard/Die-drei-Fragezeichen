<?php

//require_once '02_transform.php'; // Verwenden Sie transformierte Daten aus der Playlist-Extraktion
require_once '01_extract.php'; // Lade die Extraktions-Datei, um die Playlist-Daten zu erhalten
require_once '00_confic.php'; // Stellen Sie die Datenbankverbindung her

//print_r($playlist_data);

try {
    // Erstellen einer neuen PDO-Instanz
    $pdo = new PDO($dsn, $username, $password, $options);

    // Vorbereiten der SQL-Anweisung zum Einfügen von Daten in die Datenbank
    $stmt = $pdo->prepare("INSERT INTO playlist_bern (title, artist, audioUrl) VALUES (?, ?, ?)");

    // Iterieren über jedes Element im $playlist_data-Array
    foreach ($playlist_data as $item) {

        // Binden der Parameter und Ausführen der Anweisung für jedes Element
        $stmt->execute([$item['title'], $item['artist'], $item['audioUrl']]);
    }

    // Erfolgsmeldung ausgeben
    echo "Playlist-Daten erfolgreich in die Datenbank geladen.";
} catch (PDOException $e) {
    // Fehler bei der Datenbankverbindung behandeln
    echo "Error: " . $e->getMessage();
}