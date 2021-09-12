<?php

    include "config.php";
    include "utils.php";
    include "class-phpass.php";


    $dbConn =  connect($db);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Expose-Headers: Content-Length, X-JSON");
    header("Content-Type: application/json");
    header("Access-Control-Max-Age: 60");
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
    } 
    /*
    listar todos los usuarios
    */
    if ($_SERVER['REQUEST_METHOD'] == 'GET'){
        if (!isset($_GET['id'])){
            if(!isset($_GET['key'])){
                //Mostrar todos los usuarios
                $sql = $dbConn->prepare("SELECT id,username,apellido,nombre,dni,email,fecha_registro,estado,foto_perfil,url_titulo FROM wp_users");
                $sql->execute();
                $sql->setFetchMode(PDO::FETCH_ASSOC);
                header("HTTP/1.1 200 OK");
                $array = $sql->fetchAll();
                $response = array();
                foreach($array as $usuario){
                    $usuario['estado'] = ($usuario['estado'] == '0') ? false : true;
                    array_push($response,$usuario);
                }
                echo json_encode($response);
                exit();
            }else{
                //Mostrar un usuario especifico por la key
                $sql = $dbConn->prepare("SELECT id FROM wp_users WHERE key_activacion=:key");
                $sql->bindValue(':key', $_GET['key']);
                $sql->execute();
                $sql->setFetchMode(PDO::FETCH_ASSOC);
                header("HTTP/1.1 200 OK");
                $array = $sql->fetch();
                if(!empty($array)){
                    echo json_encode($array);
                }else{
                    echo json_encode(false);
                }
                exit();
            }
        }else {
            //Mostrar un usuario especifico
            $sql = $dbConn->prepare("SELECT id,username,apellido,nombre,dni,email,fecha_registro,estado,foto_perfil,url_titulo FROM wp_users WHERE id=:id");
            $sql->bindValue(':id', $_GET['id']);
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            $array = $sql->fetch();
            if(!empty($array)){
                $array['estado'] = ($array['estado'] == '0') ? false : true;
                echo json_encode($array);
            }else{
                echo json_encode(false);
            }
            exit();
        }
      }
    // Insertar usuario
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        $input = $_POST;
        $sql = $dbConn->prepare("INSERT INTO wp_users (username,password,apellido,nombre,dni,email,url_titulo,key_activacion) VALUES (:username,:password,:apellido,:nombre,:dni,:email,:url_titulo,:key_activacion)");
        $wp_hasher = new PasswordHash(8,TRUE);
        $password = $input['password'];
        $input['password'] = $wp_hasher->HashPassword(trim($password));
        bindAllValues($sql, $input);
        $key = generateRandomString();
        $sql->bindValue(':key_activacion', $key);
        try{
            $sql->execute();
        }catch(PDOException $e){
            $code = $e->getCode();
            if($code == 23000){
                echo "Existente";
            }
        }
        $userId = $dbConn->lastInsertId();
        if($userId){
            $input['id'] = $userId;
            $input['key_activacion'] = $key;
            header("HTTP/1.1 200 OK");
            echo json_encode($input);
            exit();
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
        $_PUT = file_get_contents('php://input');
        $array = json_decode($_PUT,true);
        $fields = getParams($array);
        $sql = "UPDATE wp_users SET $fields WHERE id=:id";
        $statement = $dbConn->prepare($sql);
        $wp_hasher = new PasswordHash(8,TRUE);
        $password = $array['password'];
        $array['password'] = $wp_hasher->HashPassword(trim($password));
        bindAllValues($statement,$array);
        try{
            header("HTTP/1.1 200 OK");
            $statement->execute();
            echo json_encode(true);
        }catch(PDOException $e){
            header("HTTP/1.1 400 BAD");
            echo json_encode(false);
        }
        exit();
    }


    //En caso de que ninguna de las opciones anteriores se haya ejecutado
    header("HTTP/1.1 400 Bad Request");


    function generateRandomString($length = 50) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
?>