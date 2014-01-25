<?php
ob_start();
session_start();
set_time_limit(0);
ini_set('memory_limit', '-1');
//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.sindh.connect.php');
include('/var/dbconnect/pgsql/sbep.schoolassessments.sindh.connect.php');
require_once("../dompdf/dompdf_config.inc.php");
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

	if($sql){

		$out = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" lang="ro">
	<head>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<title>Sbep School Planning</title>
	<style type="text/css">
		html { margin: 0px;}
		body { 
			margin: 0px;
			font-family: "Trebuchet MS", Tahoma, Sans-serif;
		}	
		#disclaimer {
			font-family: "Trebuchet MS", Tahoma, Sans-serif;
			font-size:10px; 
			color:#666;
			position: fixed;
			bottom: 0px;
			left: 5%;
			right: 5%;
			height: 100px;
			width: 100%;
			text-align: left;
		}
		#gos {
			position: fixed;
			bottom: 0px;
			left: 5%;
			right: 5%;
			height: 125px;
			width: 100%;
			text-align: center;
			valign: bottom;
		}	
		#immap {
			position: fixed;
			bottom: 0px;
			left: 5%;
			right: 5%;
			height: 125px;
			width: 100%;
			text-align: right;
			valign: bottom;
		}	
		#footer {
			font-family: "Trebuchet MS", Tahoma, Sans-serif;
			color:#666666;
			position: fixed;
			bottom: 0px;
			left: 5%;
			right: 5%;
			height: 35px;
			text-align: right;
			font-size: 12px;
			width: 100%;
			/*border-top: 2px solid #bcbdbf;*/
		}	
		.pgPadding {
			padding-right:5px;
		}
		.pagenum:before { content: counter(page); }
		.mainhead{
			color: #65944A;
			font-weight: bold;
			font-size: 18px;
		}
		.head
		{
			
			font-weight: bold;
			color: #65944A;
			
		}
		.head_row {
			
			font-size: 11px;
			border-bottom: 3px solid #72A545;
		}
		.hear_data_row
		{
			border-left:#d1d1d1 solid 1px;
			border-right:#d1d1d1 solid 1px;
			border-bottom:#d1d1d1 solid 1px;
			font-size: 10px;
		}
		*{
			
			font-family: arial;
		}
		.bg1{ 
			background-color: #FFFFFF; 
		}
		.bg2{
			background-color: #F2F2F2; 
		}
	</style>
	<body>';
		$out .='
		
		<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
			<td height="10%" style="padding-left:5%">
				<img src="../../images/logo_usaid_pdf.png" width="180px"/>
			</td>
		  </tr>	  
		  <tr>
			<td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
				<table style="padding-left:5%">
					<tr><td>
						<img src="../../images/sndhgov_white_sml.png"/>
					</td></tr>
				</table>
			</td>
		  </tr>
		 </table>
		 
		 <!-- disclaimer -->
		 
		  <div id="disclaimer">
			<div style="width:35%;">
				<strong>DISCLAIMER</strong><br />
				The author&rsquo;s views expressed in this publication do not necessarily reflect the views of the United States Agency for International Development or the United States Government		
			</div>
		  </div>	  
		  <div id="gos">
			<img src="../../images/logo_gos_pdf.png" width="100px"/>
		  </div>
		  <div id="immap">
			<img src="../../images/logo_immap_pdf.png" style="padding-top:20px;" width="250px"/>
		  </div>		

		<div id="footer">
		  <div class="pgPadding"><span class="pagenum">|Page</span></div>
		</div>		  
		
		<table width="100%" border="0"  cellpadding="5" cellspacing="0" style="padding:2% 5%">';
		$rResult = pg_query( $pgsql_conn, $sql) or die();
		 if($rResult){
			$out .='<tr class="mainhead">
		<td colspan="2" align="right">SBEP Schools Table</td>
		<td colspan="9" align="left" style="font-size:11px;font-weight:normal;font-style:italic;color:#666;">'.$_REQUEST['res'].'</td>
	  </tr>
			<tr class="head">
		<td class="head_row" style="text-align:center;">Semis Code</td>
		<td class="head_row" style="text-align:center;">School Name</td>
		<td class="head_row" style="text-align:center;">Type</td>
		<td class="head_row" style="text-align:center;">Gender</td>
		<td class="head_row" style="text-align:center;">Ghost School</td>
		<td class="head_row" style="text-align:center;">SMC Func</td>
		<td class="head_row" style="text-align:center;">Condition</td>
		<td class="head_row" style="text-align:center;">Plot Size</td>
		<td class="head_row" style="text-align:center;">Students</td>
		<td class="head_row" style="text-align:center;">Teachers</td>
		<td class="head_row" style="text-align:center;">Comments</td>
	  </tr>';
	   $j = 0;
			while ( $row = pg_fetch_object( $rResult ) )
			  { 
				if($j%2==0)
					{ 
						$bg = 'class="bg1"'; 
					}
				else{ 
						$bg = 'class="bg2"'; 
					}
				
				$out .=' <tr '.$bg.'>
							<td class="hear_data_row" style="text-align:center;">'.$row->semisCode.'</td>
							<td class="hear_data_row">&nbsp;'.$row->schName.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->schType.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->schGender.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->ghostSchool.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->smcFunctional.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->bCondition.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->plotSize.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->stuTotReg.'</td>
							<td class="hear_data_row" style="text-align:center;">'.$row->tTeacher.'</td>
							<td class="hear_data_row">&nbsp;'.$row->comments.'</td>
						  </tr>
						 ';
						 $j++;
			  }	 
		 }
		
		 $out .='</table>';
	 }
	 else
	  {
		  $out .='Invalid data!';
	  }
	}

	$out .='</body></html>';

	closeSindh($pgsql_conn);	
	
if($out){	
	$dompdf = new DOMPDF();
	$dompdf->set_paper("a4", "landscape");
	$dompdf->load_html($out);            // Loads the HTML string
	$dompdf->render();                    // Renders the HTML to PDF

	$dompdf->stream('sbep_mis_tbl_output.pdf');  	
}

?>