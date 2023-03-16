<?php
// Leggiamo i dati dal file "discs.json"
$discs_json = file_get_contents(__DIR__ . "/../data/discs.json");

// Decodifichiamo il file JSON in un array di oggetti
$discs = json_decode($discs_json);

// Inizializziamo la variabile $result a null
$result = null;

// Se viene fornito il parametro GET "title"...
if(isset($_GET["title"])) {
  // ... allora cerchiamo un disco con il titolo corrispondente
  $searched_title = $_GET["title"];

  foreach($discs as $disc){
    if($disc->title === $searched_title) {
      // Se troviamo un disco con il titolo cercato, lo assegnamo alla variabile $result
      $result = $disc;
      break;
    }
  }
  
} else {
  // ... altrimenti restituiamo la lista dei dischi

  // Inizializziamo la variabile $result a un array vuoto
  $result = [];

  // Scandiamo l'array di dischi e per ogni disco creiamo un nuovo array con solo alcune proprietà (titolo, autore, poster)
  foreach($discs as $disc){
    $result[] = [
      "title" => $disc->title,
      "author" => $disc->author,
      "poster" => $disc->poster,
    ];
  }
}

// Impostiamo l'header della risposta HTTP per indicare che stiamo restituendo dati JSON
header("Content-Type: application/json");

// Codifichiamo l'array $result come JSON e lo stampiamo come risposta HTTP
echo json_encode($result);