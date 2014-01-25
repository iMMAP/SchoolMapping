<?php
session_start();
set_time_limit(0);
ini_set('error_reporting',E_ALL); 
ini_set('display_errors','1');	
//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.sindh.connect.php');
include('/var/dbconnect/pgsql/sbep.schoolassessments.sindh.connect.php');

	$pgsql_conn = openSindh();
    
    
	
	if($pgsql_conn){
	$sIndexColumn = "semisCode";	
    $sTable = "schools_sindh_province_tbl";
    
	$aColumns = array( "semisCode", "schName", "schType", "schGender", "ghostSchool","smcFunctional", "bCondition", "plotSize", "stuTotReg", "tTeacher", "comments", "sch100m","sch500m", "sch1000m",  "sch1500m",  "the_geom", "imagesUrl", "sch100mId", "sch500mId", "sch1000mId", "sch1500mId", "district", "tehsil", "unionCouncil", "village");
   
										
    /* 
	 * Paging
	 */
	$sLimit = "";
	if ( isset( $_GET['iDisplayStart'] ) && $_GET['iDisplayLength'] != '-1' )
	{//limit 10 offset 5
		$sLimit = "LIMIT ".intval( $_GET['iDisplayLength'] )." offset ".intval( $_GET['iDisplayStart'] );
	}
	
	
	/*
	 * Ordering
	 */
	$sOrder = "";
	if ( isset( $_GET['iSortCol_0'] ) )
	{
		$sOrder = "ORDER BY  ";
		for ( $i=0 ; $i<intval( $_GET['iSortingCols'] ) ; $i++ )
		{
			if ( $_GET[ 'bSortable_'.intval($_GET['iSortCol_'.$i]) ] == "true" )
			{
				$sOrder .= '"'.$aColumns[ intval( $_GET['iSortCol_'.$i] ) ].'" '.
					($_GET['sSortDir_'.$i]==='asc' ? 'asc' : 'desc') .", ";
			}
		}
		
		$sOrder = substr_replace( $sOrder, "", -2 );
		if ( $sOrder == "ORDER BY" )
		{
			$sOrder = "";
		}
	}
	

	/* 
	 * Filtering
	 * NOTE this does not match the built-in DataTables filtering which does it
	 * word by word on any field. It's possible to do here, but concerned about efficiency
	 * on very large tables, and MySQL's regex functionality is very limited
	 */
	$sWhere = "";
	if ( isset($_GET['sSearch']) && $_GET['sSearch'] != "" )
	{
		$sWhere = 'WHERE (';
		for ( $i=0 ; $i<count($aColumns) ; $i++ )
		{
			$sWhere .= 'CAST("'.$aColumns[$i].'" AS TEXT) LIKE ';
			$sWhere .="CAST('%".$_GET["sSearch"]."%' AS TEXT) OR ";
		}
		$sWhere = substr_replace( $sWhere, '', -3 );
		$sWhere .= ')';
	}

	/* Individual column filtering */
	$chk = "";
	$numb = "";
	$qstr = "";
	for ( $i=0 ; $i<count($aColumns) ; $i++ )
	{
		if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" && $_GET['sSearch_'.$i] != '' )
		{
			if ( $sWhere == "" )
			{
				$sWhere = 'WHERE ';
			}
			else
			{
				$sWhere .= ' AND ';
			}
				
				$chk = explode("||",$_GET['sSearch_'.$i]);
				if($chk[0] == 'Gender' and !empty($chk))
				 {
					
					 $numb = explode("|",substr($chk[1], 0, -1));
					  
					 for($z = 0; $z  < count($numb); $z ++)
					  {
						   $sWhere .= 'CAST("schGender" AS TEXT) LIKE ';
						   $sWhere .= "CAST('%".$numb[$z]."%' AS TEXT) OR ";
						   
					  }
					  $sWhere = substr_replace( $sWhere, '', -3 );
				 }
				elseif($chk[0] == 'schType' and !empty($chk))
				 {
					
					 $numb = explode("|",substr($chk[1], 0, -1));
					  
					 for($z = 0; $z  < count($numb); $z ++)
					  {
						   $sWhere .= 'CAST("schType" AS TEXT) LIKE ';
						   $sWhere .= "CAST('%".$numb[$z]."%' AS TEXT) OR ";
						   
					  }
					  $sWhere = substr_replace( $sWhere, '', -3 );
				 }
				elseif($chk[0] == 'Condition' and !empty($chk))
				 {
					
					 $numb = explode("|",substr($chk[1], 0, -1));
					  
					 for($z = 0; $z  < count($numb); $z ++)
					  {
						   $sWhere .= 'CAST("bCondition" AS TEXT) LIKE ';
						   $sWhere .= "CAST('%".$numb[$z]."%' AS TEXT) OR ";
						   
					  }
					  $sWhere = substr_replace( $sWhere, '', -3 );
				 }
				elseif($chk[0] == 'taluka' and !empty($chk))
				 {
					
					
						   $sWhere .= 'CAST("tehsil" AS TEXT) LIKE ';
						   $sWhere .= "CAST('%".$chk[1]."%' AS TEXT)";
						   
					  
					 
				 }
				 elseif($chk[0] == 'district' and !empty($chk))
				 {
					
					
						   $sWhere .= 'CAST("district" AS TEXT) LIKE ';
						   $sWhere .= "CAST('%".$chk[1]."%' AS TEXT)";
						   
					  
					 
				 }
				else
				 {
					 	//$sWhere .= "`".$aColumns[$i]."` LIKE '%".mysql_real_escape_string($_GET['sSearch_'.$i])."%' ";
						$sWhere .= 'CAST("'.$aColumns[$i].'" AS TEXT) LIKE ';
						$sWhere .= "CAST('%".$_GET['sSearch_'.$i]."%' AS TEXT) ";
				 }
					 	
						
				
			
			
			
		}
	}
	
	//$sOrder ='';
	
	/*
	 * SQL queries
	 * Get data to display
	 */

	
	 
	/* echo $sQuery = 'SELECT "semisCode", "schName", "schType", "schGender", "ghostSchool", 
       "smcFunctional", "bCondition", "plotSize", "stuTotReg", "tTeacher", 
       district, tehsil, comments, "imagesUrl", sch100m, "sch100mId", 
       sch500m, "sch500mId", sch1000m, "sch1000mId", sch1500m, "sch1500mId", 
       the_geom
  FROM schools_sindh_province_tbl '.$sWhere.' '.$sOrder.' '.$sLimit.';';*/
       $sQuery = '
		SELECT  "'.str_replace(' , ', ' ', implode('", "', $aColumns)).'"
		FROM   '.$sTable.'
		'.$sWhere.'
		'.$sOrder.'
		'.$sLimit.'
		';
		$_SESSION["appqry"] = $sQuery;
		//	$sWhere	$sOrder $sLimit
	$rResult = pg_query( $pgsql_conn, $sQuery) or die();
	
	/* Data set length after filtering */
	$sQuery = "
		SELECT Count(*) FROM $sTable $sWhere;
	";
	$rResultFilterTotal = pg_query( $pgsql_conn, $sQuery ) or die();
	 $aResultFilterTotal = pg_fetch_array($rResultFilterTotal);
	$iFilteredTotal = $aResultFilterTotal[0];
	
	/* Total data set length */
 $sQuery = '
		SELECT COUNT("'.$sIndexColumn.'")
		FROM   '.$sTable;
	$rResultTotal = pg_query( $pgsql_conn, $sQuery) or die();
	$aResultTotal = pg_fetch_array($rResultTotal);
	$iTotal = $aResultTotal[0];
	
	
	/*
	 * Output
	 */
	$varsEcho =  isset($_GET['sEcho'])?$_GET['sEcho']:"";
	$output = array(
		"sEcho" => intval($varsEcho),
		"iTotalRecords" => $iTotal,
		"iTotalDisplayRecords" => $iFilteredTotal,
		"aaData" => array()
	);
	
	while ( $aRow = pg_fetch_array( $rResult ) )
	{
		$row = array();
		for ( $i=0 ; $i<count($aColumns) ; $i++ )
		{
			if ( $aColumns[$i] == "version" )
			{
				/* Special output formatting for 'version' column */
				$row[] = ($aRow[ $aColumns[$i] ]=="0") ? '-' : $aRow[ $aColumns[$i] ];
			}
			else if ( $aColumns[$i] != ' ' )
			{
				/* General output */
				$row[] = $aRow[ $aColumns[$i] ];
			}
		}
		$output['aaData'][] = $row;
	}
	
    
    
    }
else
 {
 echo  "DB Connection Error";	 
 }

 closeSindh($pgsql_conn);	
 
 echo json_encode( $output );
	
?>