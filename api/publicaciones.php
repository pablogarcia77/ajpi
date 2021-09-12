<?php
  include "config.php";
  include "utils.php";


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
      if(!isset($_GET['post'])){
        //Mostrar todos los usuarios
        $sql = $dbConn->prepare("SELECT * FROM wp_posts");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        $array = $sql->fetchAll();
        $response = array();
        foreach($array as $publicacion){
            $publicacion['estado'] = ($publicacion['estado'] == '0') ? false : true;
            array_push($response,$publicacion);
        }
        echo json_encode($response);
        exit();
      }else{
        //Mostrar todos los usuarios
        $sql = $dbConn->prepare("SELECT * FROM wp_posts WHERE estado = 1");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        $array = $sql->fetchAll();
        $response = array();
        foreach($array as $publicacion){
            $publicacion['estado'] = ($publicacion['estado'] == '0') ? false : true;
            array_push($response,$publicacion);
        }
        echo json_encode($response);
        exit();
      }
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT * FROM wp_posts WHERE id=:id");
      $sql->bindValue(':id', $_GET['id']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
    }
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("INSERT INTO wp_posts (titulo,contenido,url_imagen) VALUES (:titulo,:contenido,:url_imagen)");
    bindAllValues($sql, $input);
    try{
      $sql->execute();
      $postId = $dbConn->lastInsertId();
      if($postId){
        $input['id'] = $postId;
        header("HTTP/1.1 200 OK");
        echo json_encode(true);
        exit();
      }
    }catch(PDOException $e){
      header("HTTP/1.1 200 OK");
      $code = $e->getCode();
      echo json_encode($e->getMessage());
    }
    
  }

  //Borrar
  // if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
  // {
  //   $id = $_GET['id'];
  //   $estado = $_GET['estado'];
  //   $statement = $dbConn->prepare("UPDATE usuario SET estado=:estado WHERE id=:id");
  //   $statement->bindValue(':id', $id);
  //   $statement->bindValue(':estado', $estado);
  //   $statement->execute();
  //   header("HTTP/1.1 200 OK");
  //   exit();
  // }

  //Actualizar
  if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
      $_PUT = file_get_contents('php://input');
      $array = json_decode($_PUT,true);
      $fields = getParams($array);
      $sql = "UPDATE wp_posts SET $fields WHERE id=:id";
      $statement = $dbConn->prepare($sql);
      bindAllValues($statement,$array);
      try{
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode(true);
      }catch(PDOException $e){
        header("HTTP/1.1 200 ERROR");
        echo json_encode($e->getMessage());
      }
      exit();
  }


  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 Bad Request");

?>