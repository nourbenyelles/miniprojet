<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "miniprojet";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}

// Requête pour récupérer les données de la table affaire
$sql = "SELECT domaine, COUNT(*) AS count FROM affaire GROUP BY domaine";
$result = $conn->query($sql);

$data = array();

// Parcourir les résultats de la requête et stocker les données dans un tableau
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = array(
            'label' => $row['domaine'],
            'value' => $row['count']
        );
    }
}

// Fermer la connexion à la base de données
$conn->close();

// Renvoyer les données au format JSON
header('Content-Type: application/json');
echo json_encode($data);
?>