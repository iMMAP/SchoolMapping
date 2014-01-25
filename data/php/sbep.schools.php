<?php

set_time_limit(80);
ignore_user_abort(1);

ini_set('error_reporting',E_ALL); 
ini_set('display_errors','1');

//get input params & set dir, url
//$admin = isset($_GET["admin"])?$_GET["admin"]:"";
$district = str_replace(" shahdadkot","",strtolower($_GET["district"]));
$district_name = $_GET["district"];
$taluka_id = $_GET["taluka_id"];
$taluka_name = $_GET["taluka_name"];
$table_name = $_GET["table_name"];
$dir='/var/sbep/data/'.$district.'/binaries/';
$url='http://sbep.gos.pk/img/'.$district.'/binaries/';

//include database connection
//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.'.$district.'.connect.php');
include('/var/dbconnect/pgsql/sbep.schoolassessments.'.$district.'.connect.php');
//include processing scripts
include('sbep.schools.sql.php');
include('sbep.schools.json.php');
include('sbep.schools.table.php');
include('sbep.schools.view.php');
include('sbep.schools.summary.table.php');

//open connection/create handle
$pgsql_conn = openSchools();

if($pgsql_conn){

	if($taluka_id != 'district'){
		//get tehsil details
		//$tehsilSql = "select tehsil_tehsilname from tehsil where tehsil_id = '".$taluka_id."';";
		//$tehsilQuery = pg_query($pgsql_conn, $tehsilSql);
		
		//if($tehsilQuery){
			//while($tehsilRow = pg_fetch_array($tehsilQuery)){
				//get sql, get json & create table
				//echo $admin;
				//if($admin){
					//$summary_district = updateSummaryTable($pgsql_conn,0,$district,$district_name,$taluka_name,$table_name);
					//$summary_province = updateSummaryTable($pgsql_conn,1,$district,$district_name,$taluka_name,$table_name);
				//}else{
					$sbepSql = getSql($taluka_id);
					$sbepArray = getJson($pgsql_conn,$sbepSql,$table_name,$dir,$url);
					$table = createTable($pgsql_conn,$taluka_id,$table_name,$sbepArray);
					$view = createView($pgsql_conn,$table_name);
					$summary_district = updateSummaryTable($pgsql_conn,0,$district,$district_name,$taluka_name,$table_name);
					$summary_province = updateSummaryTable($pgsql_conn,1,$district,$district_name,$taluka_name,$table_name);
					
					//success check
					if((!strpos($table["table"], 'error')) && $view && $summary_district && $summary_province){
						echo '{"success":true,"result":'.json_encode($table).'}';
					}else{
						echo '{"success":false,errorMsg:"Database Query Error!"}';
					}					
				//}
			
			//}
			//free resources
			//pg_free_result($tehsilQuery);
			//database session can be closed
			closeSchools($pgsql_conn);
			
			//check for errors
			//if(!strpos($table["table"], 'error') && $view && $summary_district && $summary_province){

		//}
	}else{
		//get sql, get json & create table
		$sbepSql = getSql($taluka_id);
		$sbepArray = getJson($pgsql_conn,$sbepSql,$table_name,$dir,$url);
		$table = createTable($pgsql_conn,$taluka_id,$table_name,$sbepArray);
		//check for errors
		if(!strpos($table["table"], 'error')){
			echo '{"success":true,"result":'.json_encode($table).'}';
		}else{
			echo '{"success":false,errorMsg:"Database Query Error!"}';
		}
		closeSchools($pgsql_conn);	
	}
}else{
	echo '{"success":false,"Database Connection Error!"}';
}

?>

