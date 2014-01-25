<?php
set_time_limit(0);
$json_data = file_get_contents('../../js/data.txt');
$data = json_decode($json_data, true);
// var_dump($data);

$geoserverurl = "http://210.56.24.183:8080/geoserver/sbep/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50000&outputFormat=json&typeName=sbep:";
$postfix = "_ind_enr&output=json";


$endData = array(); 


foreach ($data as $key => $value){
	// var_dump($value['schools_sindh_province'][0]['title']);
	foreach ($value as $key1 => $value1){
		$incomingData = file_get_contents($geoserverurl.$value[$key1]['tableName']."_ind_enr");
		$incomingData = json_decode($incomingData, true);
		$value[$key1]['schools'] = $incomingData["features"][0]["properties"]["totalSchools"];
		$value[$key1]['boys'] = $incomingData["features"][0]["properties"]["stuTotMReg"];
		$value[$key1]['girls'] = $incomingData["features"][0]["properties"]["stuTotFReg"];
		$value[$key1]['totalStudents'] = $incomingData["features"][0]["properties"]["stuTotReg"];
		
		// $value[$key1][0]['lon'] = 'kontol';
		// $value[$key1][0]['lat'] = 'kontol';
		// $value[$key1][0]['zoom'] = 'kontol';
		// $value[$key1][0]['pointRadius'] = 'kontol';
	}
	$endData[] = $value;
	
}

// var_dump($endData);
$fh = fopen("../../js/dataTarget.txt", 'w')
      or die("Error opening output file");
fwrite($fh, json_encode($endData));

echo "Update Completed!";

fclose($fh);

?>