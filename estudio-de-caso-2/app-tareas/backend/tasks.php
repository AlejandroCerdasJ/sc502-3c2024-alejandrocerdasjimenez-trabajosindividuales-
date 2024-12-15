<?php

require 'db.php';

function crearTarea($user_id, $title, $description, $due_date){
    global $pdo;
    try {
        $sql = "INSERT INTO tasks (user_id, title, description, due_date) VALUES (:user_id, :title, :description, :due_date)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'user_id' => $user_id,
            'title' => $title,
            'description' => $description,
            'due_date' => $due_date
        ]);
        return $pdo->lastInsertId();
    } catch (Exception $e) {
        logError("Error creando tarea: " . $e->getMessage());
        return 0;
    }
}

function editarTarea($id, $title, $description, $due_date){
    global $pdo;
    try {
        $sql = "UPDATE tasks SET title = :title, description = :description, due_date = :due_date WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'title' => $title,
            'description' => $description,
            'due_date' => $due_date,
            'id' => $id
        ]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        logError($e->getMessage());
        return false;
    }
}

function obtenerComentariosPorTarea($task_id) {
    global $pdo;
    try {
        $sql = "SELECT * FROM comments WHERE task_id = :task_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['task_id' => $task_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        logError("Error al obtener comentarios: " . $e->getMessage());
        return [];
    }
}

function obtenerTareasPorUsuario($user_id){
    global $pdo;
    try {
        $sql = "SELECT * FROM tasks WHERE user_id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['user_id' => $user_id]);
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Obtener comentarios para cada tarea
        foreach ($tasks as &$task) {
            $task['comments'] = obtenerComentariosPorTarea($task['id']);
        }

        return $tasks;
    } catch (Exception $e) {
        logError("Error al obtener tareas: " . $e->getMessage());
        return [];
    }
}

function eliminarTarea($id){
    global $pdo;
    try {
        $sql = "DELETE FROM tasks WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    } catch (Exception $e) {
        logError("Error al eliminar la tarea: " . $e->getMessage());
        return false;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

function getJsonInput(){
    return json_decode(file_get_contents("php://input"), true);
}

session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    switch ($method) {
        case 'GET':
            $tareas = obtenerTareasPorUsuario($user_id);
            echo json_encode($tareas);
            break;

        case 'POST':
            $input = getJsonInput();
            if (isset($input['title'], $input['description'], $input['due_date'])) {
                $id = crearTarea($user_id, $input['title'], $input['description'], $input['due_date']);
                if ($id > 0) {
                    http_response_code(201);
                    echo json_encode(["message" => "Tarea creada: ID: " . $id]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Error general creando la tarea"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        case 'PUT':
            $input = getJsonInput();
            if (isset($input['title'], $input['description'], $input['due_date']) && isset($_GET['id'])) {
                $editResult = editarTarea($_GET['id'], $input['title'], $input['description'], $input['due_date']);
                if ($editResult) {
                    http_response_code(200);
                    echo json_encode(['message' => "Tarea actualizada"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Error actualizando la tarea"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $fueEliminado = eliminarTarea($_GET['id']);
                if ($fueEliminado) {
                    http_response_code(200);
                    echo json_encode(['message' => "Tarea eliminada"]);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => "Sucedió un error al eliminar la tarea"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "Sesión no activa"]);
}
?>
