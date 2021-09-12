<?php

  //Abrir conexion a la base de datos
  function connect($db)
  {
      try {
          $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']}", $db['username'], $db['password']);

          // set the PDO error mode to exception
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          return $conn;
      } catch (PDOException $exception) {
          exit($exception->getMessage());
      }
  }


 //Obtener parametros para updates
 function getParams($input){
    $filterParams = [];
    foreach($input as $param => $value){
      $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
	}

  //Asociar todos los parametros a un sql
	function bindAllValues($statement, $params){
		foreach($params as $param => $value){
			$statement->bindValue(':'.$param, $value);
		}
		return $statement;
  }

  function bindIntValues($statement, $params)
  {
		foreach($params as $param => $value)
    {
				$statement->bindValue(':'.$param, $value, PDO::PARAM_INT);
		}
		return $statement;
  }

  function unique_array($array, $key) {
    $temp_array = array();
    $i = 0;
    $key_array = array();
   
    foreach($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return $temp_array;
  }
  
  function in_array_field($needle, $needle_field, $haystack, $strict = false) {
    if ($strict) {
      foreach ($haystack as $item)
        if (isset($item->$needle_field) && $item->$needle_field === $needle)
          return true;
    }
    else {
      foreach ($haystack as $item)
        if (isset($item->$needle_field) && $item->$needle_field == $needle)
          return true;
    }
    return false;
  }
 ?>