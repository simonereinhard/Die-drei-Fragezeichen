<?php

$url = "https://energy.ch/api/channels/bern/playouts?createdAtMax=" . urlencode(date('Y-m-d H:i')) . "&createdAtMin=" . urlencode(date('Y-m-d H:i', strtotime('-1 hour')));

echo $url;

$ch = curl_init(); // Initialize cURL session

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url); // Set URL to fetch
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string

$playlist_data = curl_exec($ch); // Execute cURL session, fetch the JSON response

// Check if data was fetched successfully
if ($playlist_data === false) {
    // Handle cURL error
    echo "Error fetching data: " . curl_error($ch);
} else {
    // Data fetched successfully, you can now use $playlist_data
    // For example, you can decode the JSON and print it
    $playlist_data = json_decode($playlist_data, true); // Decode JSON string into associative array
    if ($playlist_data === null) {
        // JSON decoding failed
        echo "Error decoding JSON data";
    } else {
        // JSON decoding successful, you can access the data as an associative array
        // For example, you can print the whole decoded JSON

        $playlist_data = filter_data($playlist_data);
    }
}
curl_close($ch); // Close cURL session


//print_r($playlist_data);

function filter_data($data)
{
    $filtered_data = [];
    foreach ($data as $item) {
        // Keep only the specified values
        $filtered_data[] = [
            'title' => $item['title'] ?? null,
            'artist' => $item['artist'] ?? null,
          //  'playFrom' => $item['playFrom'] ?? null,
            'imageUrl' => $item['imageUrl'] ?? null,
            'audioUrl' => $item['audioUrl'] ?? null
        ];
    }

    return $filtered_data;
}

?>

