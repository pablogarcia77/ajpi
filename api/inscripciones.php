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
      if(!isset($_GET['socio'])){
        if(!isset($_GET['curso'])){
          //Mostrar todos los usuarios
          $sql = $dbConn->prepare("SELECT * FROM inscripciones");
          $sql->execute();
          $sql->setFetchMode(PDO::FETCH_ASSOC);
          header("HTTP/1.1 200 OK");
          echo json_encode(  $sql->fetchAll()  );
          exit();
        }else{
          $sql = $dbConn->prepare("SELECT * FROM inscripciones WHERE curso=:curso");
          $sql->bindValue(':curso', $_GET['curso']);
          $sql->execute();
          $sql->setFetchMode(PDO::FETCH_ASSOC);
          header("HTTP/1.1 200 OK");
          echo json_encode( $sql->fetchAll()  );
          exit();
        }
      }else{
        $sql = $dbConn->prepare("SELECT c.curso,c.habilita_certificado,c.fecha,c.resolucion FROM inscripciones i, cursos c WHERE c.id=i.curso AND i.socio=:socio");
        $sql->bindValue(':socio', $_GET['socio']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        $array = $sql->fetchAll();
        $response = array();
        foreach($array as $curso){
          $curso['habilita_certificado'] = ($curso['habilita_certificado'] == '0') ? false : true;
          array_push($response,$curso);
        }
        echo json_encode($response);
        exit();
      }
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT * FROM inscripciones WHERE id=:id");
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
    $array = json_decode(file_get_contents('php://input'),true);
    $sql = "INSERT INTO inscripciones
          (curso,socio)
          VALUES
          (:curso,:socio)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $array);
    $statement->execute();
    $userId = $dbConn->lastInsertId();
    if($userId){
      header("HTTP/1.1 200 OK");
      echo json_encode(true);
      exit();
    }
  }

  //Borrar
  if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $curso = $_GET['curso'];
    $socio = $_GET['socio'];
    $statement = $dbConn->prepare("DELETE FROM inscripciones WHERE socio=:socio AND curso=:curso");
    $statement->bindValue(':curso', $_GET['curso']);
    $statement->bindValue(':socio', $_GET['socio']);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode(true);
    exit();
  }

  //Actualizar
  if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
      $_PUT = file_get_contents('php://input');
      $array = json_decode($_PUT,true);
      $fields = getParams($array);
      $sql = "UPDATE cuotas SET $fields WHERE id=:id";
      $statement = $dbConn->prepare($sql);
      bindAllValues($statement,$array);
      $statement->execute();
      header("HTTP/1.1 200 OK");
      exit();
  }


  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 Bad Request");

?>