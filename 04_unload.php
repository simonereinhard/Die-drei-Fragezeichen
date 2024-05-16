<?php
 
// Include the configuration file
require_once '00_confic.php'; 

try {
    // Create a new PDO instance
    $pdo = new PDO($dsn, $username, $password, $options);
    
    // Prepare the SQL query to fetch and count titles and artists from the last 30 days
    $query = "SELECT title, artist, audioUrl, COUNT(*) AS playCount FROM playlist_bern 
              WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
              AND artist IS NOT NULL
              GROUP BY title, artist 
              ORDER BY playCount DESC 
              LIMIT 30";
    
    // Prepare the statement
    $stmt = $pdo->prepare($query);
    
    // Execute the query
    $stmt->execute();
    
    // Fetch all rows into an associative array
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Check if any rows are returned
    if (empty($rows)) {
        echo json_encode(['error' => 'No data found for the past 30 days']);
        exit;
    }
    
    // Output JSON
    header('Content-Type: application/json');
    echo json_encode($rows);
    
} catch (PDOException $e) {
    // Handle database errors
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>
