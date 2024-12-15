<?php
 require 'comments.php';

// Crear un comentario
$idComentario = crearComentario(1, 'Este es un comentario de prueba');
if ($idComentario) {
    echo 'Comentario creado exitosamente. ID: ' . $idComentario . PHP_EOL;
} else {
    echo 'No se creó el comentario.' . PHP_EOL;
}

// Editar el comentario
$editado = editarComentario(1, 5, 'Este es un comentario editado 2');
if ($editado) {
    echo 'Comentario editado exitosamente.' . PHP_EOL;
} else {
    echo 'Error al editar el comentario.' . PHP_EOL;
}

// Obtener comentarios por tarea
echo 'Lista de comentarios para la tarea con ID 5:' . PHP_EOL;
$comentarios = obtenerComentariosPorTarea(5);
if ($comentarios) {
    foreach ($comentarios as $comentario) {
        echo 'ID: ' . $comentario['id'] . ' Comentario: ' . $comentario['comment'] . PHP_EOL;
    }
}

// Eliminar el comentario
$eliminado = eliminarComentario(10);
if ($eliminado) {
    echo 'El comentario se eliminó exitosamente.' . PHP_EOL;
} else {
    echo 'Error al eliminar el comentario.' . PHP_EOL;
}

