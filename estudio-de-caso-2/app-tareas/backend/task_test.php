<?php
require 'tasks.php';

$idTarea = crearTarea(7,'Segunda tarea de prueba',' segunda tarea de prueba', '2024-12-9') ;
if($idTarea){
    echo 'Tarea creada exitosamente ' . $idTarea;

}else{
    echo 'No se creo la tarea';
}

$editado = editarTarea($idTarea, 'Aprender PHP y MySQL', 'Ampliar conocimiento en CRUD y SQL', '2024-12-15');
if ($editado) {
    echo "Tarea editada exitosamente.\n";
} else {
    echo "Error al editar la tarea.\n";
}


echo "Lista de tareas" . PHP_EOL;
$tareas = obtenerTareasPorUsuario(1);
if($tareas){
    foreach($tareas as $tarea){
        echo "ID: " . $tareas["id"] . "Titulo: " . $tarea["title"];
    }
}

echo "Eliminando la tarea" . PHP_EOL;
$eliminado = eliminarTarea($idTarea);
if($eliminado){
    echo "La tarea se elimino exitosamente";
}else{
    echo "Error al eliminar la tarea";
}