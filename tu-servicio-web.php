<?php 
$json = file_get_contents('php://input'); 
$data = json_decode($json, true); 
if ($data) { 
// Procesar datos (por ejemplo, guardar en la base de datos) 
$response = [ 
'status' => 'success', 
'message' => 'Datos recibidos correctamente', 
'data' => $data 
]; 
echo json_encode($response); 
} else { 
$response = [ 
'status' => 'error', 
'message' => 'No se recibieron datos válidos' 
]; 
echo json_encode($response); 
} 
?>