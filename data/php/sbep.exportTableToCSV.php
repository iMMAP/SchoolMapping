<?php
ob_start();
session_start();
set_time_limit(0);
//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.sindh.connect.php');
include('/var/dbconnect/pgsql/sbep.schoolassessments.sindh.connect.php');
$pgsql_conn = openSindh();
$qry = isset($_REQUEST["qry"])?$_REQUEST["qry"]:"";

if($pgsql_conn){
	if($qry){
		$sql = 'SELECT "semisCode", "schName", "schType", "schGender", "ghostSchool", "smcFunctional", "bCondition", "plotSize", "stuTotReg", "tTeacher", "comments" FROM schools_sindh_province_tbl';
	}
	else{
		$sql = isset($_SESSION["appqry"])?$_SESSION["appqry"]:"";
		$sql = substr($sql,0,strlen($sql)-21);
	}

	//$sql = 'SELECT "semisCode", "schName", "schType", "schGender", "ghostSchool", "smcFunctional", "bCondition", "plotSize", "stuTotReg", "tTeacher", "comments" FROM schools_sindh_province_tbl';

	if($sql){
	  // $Fun->export_excel_csv($qry);  
		$out = '';
		 $rResult = pg_query( $pgsql_conn, $sql) or die();
		 if($rResult){
			 $out .='"Semis Code","School Name","Type","Gender","Ghost School","SMC Func","Condition","Plot Size","Students","Teachers","Comments"';
			$out .="\n";
			while ( $row = pg_fetch_object( $rResult ) ){
				$out .='"'.$row->semisCode.'","'.$row->schName.'","'.$row->schType.'","'.$row->schGender.'","'.$row->ghostSchool.'","'.$row->smcFunctional.'","'.$row->bCondition.'","'.$row->plotSize.'","'.$row->stuTotReg.'","'.$row->tTeacher.'","'.$row->comments.'"';	
				$out .="\n";
			}	 
		 }
		echo $out;
		// Output to browser with appropriate mime type, you choose ;)
		header("Content-type: text/x-csv");
		//header("Content-type: text/csv");
		//header("Content-type: application/csv");
		header("Content-Disposition: attachment; filename=sbep_mis_tbl_output.csv");
		//echo $out;
		exit;
	 }
	 else{
		  echo "Invalid Data!";
	  }
	  
	  closeSindh($pgsql_conn);	
}
 ?>