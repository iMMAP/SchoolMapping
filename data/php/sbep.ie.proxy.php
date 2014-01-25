<?php

	ini_set('error_reporting',E_ALL); ini_set('display_errors','1');
	
	//if($_GET['output'] == 'kml'){
	//	$url = 'http://210.56.24.183:8080/geoserver/sbep/wms?service=WMS&version=1.1.0&request=GetMap&styles=&bbox=67.6485595703125,26.5732574462891,67.9213562011719,27.1737804412842&width=232&height=512&srs=EPSG:4326&format=application%2Fvnd.google-earth.kml%2Bxml&layers=sbep:'.$_GET['table'];
	//}else{
		$url = 'http://210.56.24.183:8080/geoserver/sbep/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50000&typeName=sbep:'.$_GET['table'].'&outputFormat='.$_GET['output'].'';
	//}
	
	//echo $url;
	
	echo file_get_contents($url);
	
?>