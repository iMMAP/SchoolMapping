<?php
set_time_limit(0);
ignore_user_abort(1);
//Include database connection settings
//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.sindh.connect.php');
include('/var/dbconnect/pgsql/sbep.schoolassessments.sindh.connect.php');

$i = 0;
$semisString = $_GET["semisString"];
$semisTbl = Array();

$pgsql_conn = openSindh();

if($pgsql_conn){	
	
	$semisCode = str_replace(";",",",$semisString);
	
	//get all tehsils
	$semisSql = "select * from schools_sindh_province_tbl where \"semisCode\" IN (".$semisCode.")";
	$semisQuery = pg_query($pgsql_conn, $semisSql);
	
	if($semisQuery){
		while($semisRow = pg_fetch_array($semisQuery)){
			$semisTbl[$i] = $semisRow;
			$i++;
		}	
	}
	
	echo json_encode($semisTbl);
		
	closeSindh($pgsql_conn);
		
}else{
	echo "Database Connection Error!";
}

?>
