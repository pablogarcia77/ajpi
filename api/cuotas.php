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
      if(!isset($_GET['pagadas'])){
        //Mostrar todos los usuarios
        $sql = $dbConn->prepare("SELECT cp.id,c.periodo FROM cuotas_pagadas cp, cuotas c WHERE cp.periodo=c.id");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode(  $sql->fetchAll()  );
      }else{
        $queryPeriodos = $dbConn->prepare("SELECT periodo FROM cuotas");
        $queryPeriodos->execute();
        $queryPeriodos->setFetchMode(PDO::FETCH_ASSOC);
        $periodos = $queryPeriodos->fetchAll();

        $sql = $dbConn->prepare("SELECT u.username,u.apellido,u.nombre,p.periodo FROM wp_users u LEFT JOIN cuotas_pagadas cp ON u.id=cp.socio LEFT JOIN cuotas p ON p.id=cp.periodo ORDER BY u.apellido ASC");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $array = $sql->fetchAll();
        header("HTTP/1.1 200 OK");
        $respuesta = array();
        foreach($array as $socio){
          $response['socio'] = $socio['username'];
          $response['apellido'] = $socio['apellido'];
          $response['nombre'] = $socio['nombre'];

          $response['periodos'] = array();
          foreach($array as $iter){
            if($iter['username'] == $response['socio']){
              array_push($response['periodos'],$iter['periodo']);
            }
          }
          array_push($respuesta,$response);
        }
        $r = array_values(unique_array($respuesta,'socio'));
        echo json_encode( $r );
      }
      exit();
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT cp.id,c.periodo FROM cuotas_pagadas cp, cuotas c, wp_users u WHERE cp.periodo=c.id AND u.id=cp.socio AND u.id=:id");
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
    $cadena = '';
    $socio = $array['socio'];
    foreach ($array['cuotas'] as $key => $value) {
      $cadena.='('.$socio.','.$value.'),';
    }
    $cadena = substr($cadena,0,-1);
    $sql = "INSERT INTO cuotas_pagadas
          (socio,periodo)
          VALUES
          ".$cadena."";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $userId = $dbConn->lastInsertId();
    if($userId){
      $input['id'] = $userId;
      header("HTTP/1.1 200 OK");
      echo json_encode($input);
      exit();
    }
  }

  //Borrar
  if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
  {
    $id = $_GET['id'];
    $estado = $_GET['estado'];
    $statement = $dbConn->prepare("UPDATE usuario SET estado=:estado WHERE id=:id");
    $statement->bindValue(':id', $id);
    $statement->bindValue(':estado', $estado);
    $statement->execute();
    header("HTTP/1.1 200 OK");
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