<?php

require 'db.php';

function crearComentario($task_id, $comment)
{
    global $pdo;
    try {
        $sql = "INSERT INTO comments (task_id, comment) VALUES (:task_id, :comment)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'task_id' => $task_id,
            'comment' => $comment
        ]);
        // Devuelve el id del comentario creado en la línea anterior
        return $pdo->lastInsertId();
    } catch (Exception $e) {
        logError("Error creando comentario: " . $e->getMessage());
        return 0;
    }
}

function editarComentario($id, $task_id, $comment)
{
    global $pdo;
    try {
        $sql = "UPDATE comments SET task_id = :task_id, comment = :comment WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'task_id' => $task_id,
            'comment' => $comment,
            'id' => $id
        ]);
        $affectedRows = $stmt->rowCount();
        return $affectedRows > 0;
    } catch (Exception $e) {
        logError($e->getMessage());
        return false;
    }
}

function obtenerComentariosPorTarea($task_id)
{
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

function eliminarComentario($id)
{
    global $pdo;
    try {
        $sql = "DELETE FROM comments WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0; // true si se elimina algo
    } catch (Exception $e) {
        logError("Error al eliminar el comentario: " . $e->getMessage());
        return false;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
header('Content-Type: application/json');

function getJsonInput()
{
    return json_decode(file_get_contents("php://input"), true);
}

session_start();
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    switch ($method) {
        case 'GET':
            if (isset($_GET['task_id'])) {
                $comentarios = obtenerComentariosPorTarea($_GET['task_id']);
                echo json_encode($comentarios);
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        case 'POST':
            $input = getJsonInput();
            if (isset($input['task_id'], $input['comment'])) {
                $id = crearComentario($input['task_id'], $input['comment']);
                if ($id > 0) {
                    http_response_code(201);
                    echo json_encode(["message" => "Comentario creado: ID: " . $id]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Error general creando el comentario"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        case 'PUT':
            $input = getJsonInput();
            if (isset($input['id'], $input['task_id'], $input['comment'])) {
                $editResult = editarComentario($input['id'], $input['task_id'], $input['comment']);
                if ($editResult) {
                    http_response_code(200);
                    echo json_encode(['message' => "Comentario actualizado"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Error actualizando el comentario"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => "Datos insuficientes"]);
            }
            break;

        case 'DELETE':
            if (isset($_GET['id'])) {
                $fueEliminado = eliminarComentario($_GET['id']);
                if ($fueEliminado) {
                    http_response_code(200);
                    echo json_encode(['message' => "Comentario eliminado"]);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => "Sucedió un error al eliminar el comentario"]);
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
