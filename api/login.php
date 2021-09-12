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
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        if (isset($_POST['username']) && isset($_POST['password'])){
            //Mostrar un usuario especifico
            $password = $_POST['password'];
            $sql = $dbConn->prepare("SELECT * FROM wp_users WHERE username=:username");
            $sql->bindValue(':username', $_POST['username']);
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            
            $array = $sql->fetch();
            $encpass = $array['password'];
            if(!is_null($encpass)){
                $wp_hasher = new PasswordHash(8,TRUE);
                $password_hashed = $encpass;
                header("HTTP/1.1 200 OK");
                if($wp_hasher->CheckPassword($password, $password_hashed)){
                    $response['id'] = $array['id'];
                    $response['admin'] = $array['admin'];
                    $response['username'] = $array['username'];
                    $response['email'] = $array['email'];
                    $response['fecha_registro'] = $array['fecha_registro'];
                    if($array['estado'] == '0'){
                        $response['estado'] = false;
                    }else{
                        $response['estado'] = true;
                    }
                    $response['apellido'] = $array['apellido'];
                    $response['nombre'] = $array['nombre'];
                    $response['dni'] = $array['dni'];
                    $response['foto_perfil'] = $array['foto_perfil'];
                    $response['url_titulo'] = $array['url_titulo'];
                    echo json_encode( $response );
                }else{
                    echo json_encode( false );
                }
            }else{
                echo json_encode( false );
            }
            exit();
        }else{
            echo json_encode( false );
        }
    }


    //En caso de que ninguna de las opciones anteriores se haya ejecutado
    header("HTTP/1.1 400 Bad Request");
?>