<?php
// Blindaje Hostinger: si LiteSpeed prioriza index.php sobre index.html,
// servimos la web igualmente (el index.php roto del hosting causaba un 500 en la raíz).
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/index.html');
