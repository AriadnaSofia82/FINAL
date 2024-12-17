<?php
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombres = $_POST['nombres'];
    $correo = $_POST['correo'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];

    // Crear una instancia de PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'mail.ravennaproyectos.pe'; // Cambia al servidor SMTP que estés usando
        $mail->SMTPAuth = true;
        $mail->Username = 'isil@ravennaproyectos.pe'; // Cambia por tu usuario SMTP
        $mail->Password = '<@%A1B2%@>'; // Cambia por tu contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // o PHPMailer::ENCRYPTION_SMTPS si usas SSL
        $mail->Port = 587; // o 465 si usas SSL

        // Configuración del correo
        $mail->setFrom('isil@ravennaproyectos.pe', 'Formulario de Contacto'); // Remitente
        $mail->addAddress('sistema@ravennaproyectos.pe'); // Correo de destino
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = "<strong>Nombres:</strong> $nombres<br>
                       <strong>Correo Electrónico:</strong> $correo<br>
                       <strong>Mensaje:</strong><br>$mensaje";

        // Enviar el correo
        $mail->send();
        echo "El mensaje ha sido enviado exitosamente.";
    } catch (Exception $e) {
        echo "Hubo un error al enviar el mensaje: {$mail->ErrorInfo}";
    }
} else {
    echo "Método de solicitud no permitido.";
}
?>