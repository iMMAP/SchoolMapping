<?php
ob_start();
session_start();
ini_set('memory_limit', '-1');
require_once("../dompdf/dompdf_config.inc.php");

$sindh = isset($_POST["sindh"])?$_POST["sindh"]:"";
$district = isset($_POST["district"])?$_POST["district"]:"";
$taluka = isset($_POST["taluka"])?$_POST["taluka"]:"";
$title = isset($_POST["title"])?$_POST["title"]:"";
$schHtml = isset($_POST["schHtml"])?$_POST["schHtml"]:"";
$enrHtml = isset($_POST["enrHtml"])?$_POST["enrHtml"]:"";
$admHtml = isset($_POST["admHtml"])?$_POST["admHtml"]:"";
$bldHtml = isset($_POST["bldHtml"])?$_POST["bldHtml"]:"";
$drrHtml = isset($_POST["drrHtml"])?$_POST["drrHtml"]:"";

$out = '
	
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Sbep School Planning</title>
	<style type="text/css">
	html { margin: 0px;}
	body {
		margin: 0px;
		font-family: "Trebuchet MS", Tahoma, Sans-serif;
		color:#333;
		line-height: 1.6em;
	}
	#disclaimer {
		font-family: "Trebuchet MS", Tahoma, Sans-serif;
		font-size:10px; 
		color:#666;
		position: absolute;
		bottom: 0px;
		left: 10%;
		right: 10%;
		height: 175px;
		width: 100%;
		text-align: left;
	}
	#gos {
		position: absolute;
		bottom: 0px;
		left: 10%;
		right: 10%;
		height: 200px;
		width: 100%;
		text-align: center;
		valign: bottom;
	}	
	#immap {
		position: absolute;
		bottom: 0px;
		left: 10%;
		right: 10%;
		height: 200px;
		width: 100%;
		text-align: right;
		valign: bottom;
	}	
	#footer {
		font-family: "Trebuchet MS", Tahoma, Sans-serif;
		color:#666666;
		position: fixed;
		bottom: 0px;
		left: 10%;
		right: 10%;
		height: 100px;
		text-align: right;
		font-size: 12px;
		width: 100%;
		border-top: 4px solid #bcbdbf;
	}
	.pgPadding {
		padding-top:10px;
	}
	.pagenum:before { content: counter(page); }
	a { background: inherit; color: #72A545; text-decoration: none; }
	a:hover { background: inherit; color: #006699; text-decoration: none; }
	p{
		text-align:justify;
	}
	p.disclaimer{
		style="font-family: "Trebuchet MS", Tahoma, Sans-serif; 
		font-size:10px; 
		color:#666; 
		text-align:left;
	}
	h1, h2, h3 { font: bold "Trebuchet MS", Tahoma, Sans-serif; color: #65944A;}
	h1 { font-size: 26px;padding:0px;}
	h2 { font-size: 22px;padding:0px;}
	h3 { font-size: 16px;padding:0px;}
	
	.indTbl
	{
		font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
		font-size: 14px;
		/*background: #fff;*/
		/*margin: 45px;*/
		/*width: 480px;*/
		border-collapse: collapse;
		text-align: left;
		/*padding:0% 10%;*/
	}
	.indTbl th
	{
		font-size: 16px;
		font-weight: bold;
		text-align: left;
		color: #65944A;
		/*padding: 10px 8px;*/
	}
	.indTbl td
	{
		color: #666;
		/*padding: 9px 8px 0px 8px;*/
	}
	.indTbl tbody tr:hover td
	{
		color: #009;
	}
	
	.green  { color: #65944A; }
	/*school chart*/
	.green1  { color: #a2c180; }
	.green2 { color: #91b573; }
	.green3  { color: #80a965; }
	.green4  { color: #6f9d58; }
	.green5  { color: #5f914a; }
	.green6  { color: #4e853d; }
	.darkgreen  { color: #3B5E2B; }

	/*building chart*/
	.bld1  { color: #3D7930; }
	.bld2  { color: #C0FF3E; }
	.bld3  { color: #FFFF00; }
	.bld4  { color: #FFC469; }
	.bld5  { color: #C67171; }

	/*blue chart*/
	.blue1  { color: #4d89f9; }
	.blue2  { color: #6599fa; }
	.blue3 { color: #7da9fb; }
	.blue4 { color: #96b9fc; }
	.blue5 { color: #aec9fd; }
	.blue6 { color: #c6d9fd; }

	/*red chart*/
	.red1  { color: #b22222; }
	.red2  { color: #b73535; }
	.red3 { color: #bc4949; }
	.red4 { color: #c15d5d; }
	.red5 { color: #c67171; }

	/*gold chart*/
	.gld1  { color: #964514; }
	.gld2  { color: #a85610; }
	.gld3 { color: #b9670c; }
	.gld4 { color: #cb7808; }
	.gld5 { color: #dd8904; }
	.gld6 { color: #ee9a00; }

	.gray  { color: #BFBFBF; }
	.medgray  { color: #9F9F9F; }
	.bluegray  { color: #517693; }
	.darkgray  { color: #666666; }	
	
	</style>
	</head>
	
	<body>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="130" colspan="2" style="padding-left:5%;padding-top:20px;">
			<img src="../../images/logo_usaid_pdf.png"/>
		</td>
	  </tr>
	  <tr>
	    <td height="262" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 8px solid; border-top:#bcbdbf 8px solid">
			<img style="padding-left:5%" src="../../images/sndhgov_white.png" width="400px"/>
		</td>
	  </tr>
	  <tr>
	    <td colspan="2" align="left" valign="top">
			<table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
			  <tr>
				<td width="100%" height="50" style="padding-left:10%;color:#666;"><h1><span class="darkgray">SBEP INDICATOR SUMMARY</span></h1></td>
			  </tr>
				<tr>
				<td width="100%" height="50" style="padding-left:10%;color:#666;"><h2><span class="darkgray">SINDH PROVINCE';
			if($district){  
				$out .= ' > '.strtoupper($district).' DISTRICT';
			}
			if($taluka){
				$out .= ' > '.strtoupper($title).' TALUKA';
			}
			$out .= '
				</span></h2></td>
			  </tr>			
			</table>
		</td>
	  </tr>
	  </table>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  <br/>
	  
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
	
	<div style="page-break-before: always;"></div>
	
	<div id="containerPgOne" style="padding:10%;">
		<div id="myCanvasContainer" align="center">
			<h1 style="padding:10px 0px 0px 20px;text-align:left;font-size:20px;">SBEP <span class="darkgray">Project Overview</span></h1>
			
			<p>
				<span class="darkgray">The <span class="green"><b><a href="http://transition.usaid.gov/pk/db/sectors/education/project_746.html" target="_blank" title="USAID SBEP Project Page">Sindh Basic Education Program</a></b></span> supports the Government of Sindh\'s goal to increase and sustain student enrolment in primary, middle, and secondary schools in seven districts of northern Sindh and the city of Karachi.</span>
			</p>
			<h1 style="padding:10px 0px 0px 20px;text-align:left;font-size:20px;"><span class="darkgray">Objective</span></h1>
			<p>
				<span class="darkgray">The program aims to create school environments conducive to teaching and learning. The program funds the construction and rehabilitation of schools affected by 2010 floods and supports the Government of Sindh\'s policy of merging, consolidating, and upgrading schools through new construction. The Sindh Basic Education Program also seeks to improve early grade reading in primary schools, mobilize communities to increase girls\' enrollment and improve the nutritional status of children, and offer technical assistance to build the capacity of the SIndh Department of Education. </span>
			</p>
		</div>
	</div>
	<div id="footer">
	  <div class="pgPadding"><span class="pagenum">|Page</span></div>
	</div>
	
	<div style="page-break-before: always;"></div>
	
	<!-- Enr content -->
	
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="10%">
		</td>
	  </tr>	  
	  <tr>
	    <td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
			<table style="padding-left:5%">
				<tr><td>
					<img src="../../images/school_24.png"/>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;padding-left:5%">Enrollment</h1>
				</td></tr>
			</table>
		</td>
	  </tr>
	 </table>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
			<div align="center" style="margin-top:1%;margin-left:10%;margin-right:10%;">';
				$out .= $enrHtml;
				$out .= '
			</div>
		</td>
	  </tr>	
	 </table>	 
	
	<div style="page-break-before: always;"></div>
	
	<!-- Sch content -->
	
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="10%">
		</td>
	  </tr>	  
	  <tr>
	    <td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
			<table style="padding-left:5%">
				<tr><td>
					<img src="../../images/school_24.png"/>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;padding-left:5%">Schools</h1>
				</td></tr>
			</table>
		</td>
	  </tr>
	 </table>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
			<div align="center" style="margin-top:2%;margin-left:10%;margin-right:10%;">';
				$out .= $schHtml;
				$out .= '
			</div>
		</td>
	  </tr>	
	 </table>
	 
	 <!-- Adm content -->
	 
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="10%">
		</td>
	  </tr>	  
	  <tr>
	    <td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
			<table style="padding-left:5%">
				<tr><td>
					<img src="../../images/school_24.png"/>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;padding-left:5%">Administration</h1>
				</td></tr>
			</table>
		</td>
	  </tr>
	 </table>	 
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
			<div align="center" style="margin-top:2%;margin-left:10%;margin-right:10%;">';
				$out .= $admHtml;
				$out .= '
			</div>
		</td>
	  </tr>	
	 </table>	
	<div style="page-break-before: always;"></div>
	
	<!-- Bld content -->
	
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="10%">
		</td>
	  </tr>	  
	  <tr>
	    <td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
			<table style="padding-left:5%">
				<tr><td>
					<img src="../../images/school_24.png"/>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;padding-left:5%">Infrastructure</h1>
				</td></tr>
			</table>
		</td>
	  </tr>
	 </table>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
			<div align="center" style="margin-top:2%;margin-left:10%;margin-right:10%;">';
				$out .= $bldHtml;
				$out .= '
			</div>
		</td>
	  </tr>	
	 </table>	
	 
	 <!-- Drr content -->
	 
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="10%">
		</td>
	  </tr>	  
	  <tr>
	    <td height="35" colspan="2" valign="bottom" bgcolor="#666666" style="border-bottom:#65944A 4px solid; border-top:#bcbdbf 4px solid">
			<table style="padding-left:5%">
				<tr><td>
					<img src="../../images/school_24.png"/>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;padding-left:5%">DRR</h1>
				</td><td>
					<!-- <img style="padding-left:5%" src="../../images/school_24.png"/> -->
					<h1 style="color:#FFF;margin:0px;">Assessment</h1>
				</td></tr>
			</table>
		</td>
	  </tr>
	 </table>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
			<div align="center" style="margin-top:2%;margin-left:10%;margin-right:10%;">';
				$out .= $drrHtml;
				$out .= '
			</div>
		</td>
	  </tr>	
	 </table>	 
		
	</body>
	</html>';
	
	
	
if($out){	
	$dompdf = new DOMPDF();
	$dompdf->set_paper("a4", "portrait");
	$dompdf->load_html($out);            // Loads the HTML string
	$dompdf->render();                    // Renders the HTML to PDF

	//filename
	$file = 'sbep_';
	if($sindh){
		$file .= 'sindh_provnice';
	}else if($district){
		$file .= $district.'_district';
	}
	if($taluka){
		$file .= '_'.$title;
	}
	
	$dompdf->stream(strtolower($file).'.pdf'); 
}

?>