<?php

set_time_limit(0);

//if($db){
function updateSummaryTable($pgsql_conn,$province,$district,$district_name,$taluka_name,$table_name){
	
	if($province){ 
		//delete from district
		
		//SbepSindh connect
		//include('C:\xampp\dbconnect\pgsql\sbep.schoolassessments.sindh.connect.php');
		include('/var/dbconnect/pgsql/sbep.schoolassessments.sindh.connect.php');
		$pgsql_sindh_conn = openSindh();
		
		$insert_table_name = 'schools_sindh_province';	
		$insertQuery = 'DELETE FROM '.$insert_table_name.' WHERE district = \''.$district_name.'\';';
		
		//select recrods from district
		$selectSql = 'SELECT school_id, "semisCode", "surveyDate", "schName", "schType", "schGender",
							district, 
							tehsil, "unionCouncil", village, "schLang", "floodAffected", 
							"ghostSchool", "smcFunctional", "schMerged", "schMergedId", "schIndusKacha", 
							"orgSupport", "usaidSupport",  "compoundSi", "landWithin", "landWiSize", "classRmSize", 
							"landSurround", "landSuSize", "travelTime", "travelDesc", "bDamage", 
							"bDaPercent", "bCondition", landslides, "nearRiver", "riverHazard", 
							"hazardProne", "indPolution", "schMergeCa", "schMergeId", "schConsCa", 
							"schConsId", "schReconCa", "schRehabCa", "schRelocCa", shelterless, 
							"sch100m", "sch100mId", "sch500m", "sch500mId", "sch1000m", "sch1000mId", "sch1500m", "sch1500mId",
							comments, 
							"clsKgMAct", "clsKgFAct", "clsKgTAct", "cls1MAct", "cls1FAct", 
							"cls1TAct", "cls2MAct", "cls2FAct", "cls2TAct", "cls3MAct", "cls3FAct", 
							"cls3TAct", "cls4MAct", "cls4FAct", "cls4TAct", "cls5MAct", "cls5FAct", 
							"cls5TAct", "cls6MAct", "cls6FAct", "cls6TAct", "cls7MAct", "cls7FAct", 
							"cls7TAct", "cls8MAct", "cls8FAct", "cls8TAct", "cls9MAct", "cls9FAct", 
							"cls9TAct", "cls10MAct", "cls10FAct", "cls10TAct", "cls11MAct", 
							"cls11FAct", "cls11TAct", "cls12MAct", "cls12FAct", "cls12TAct", 
							"stuTotMAct", "stuTotFAct", "stuTotAct", "clsKgMReg", "clsKgFReg", 
							"clsKgTReg", "cls1MReg", "cls1FReg", "cls1TReg", "cls2MReg", 
							"cls2FReg", "cls2TReg", "cls3MReg", "cls3FReg", "cls3TReg", "cls4MReg", 
							"cls4FReg", "cls4TReg", "cls5MReg", "cls5FReg", "cls5TReg", "cls6MReg", 
							"cls6FReg", "cls6TReg", "cls7MReg", "cls7FReg", "cls7TReg", "cls8MReg", 
							"cls8FReg", "cls8TReg", "cls9MReg", "cls9FReg", "cls9TReg", "cls10MReg", 
							"cls10FReg", "cls10TReg", "cls11MReg", "cls11FReg", "cls11TReg", 
							"cls12MReg", "cls12FReg", "cls12TReg", "stuTotMReg", "stuTotFReg", 
							"stuTotReg", "mTeacher", "fTeacher", "tTeacher", "mUnTrained", 
							"fUnTrained", "tUnTrained", "mSupport", "fSupport", "tSupport", 
							--"thumbs", 
							"images", "imagesUrl", "drawing",
							the_geom FROM schools_'.$district.'_district';
		$selectQuery = pg_query($pgsql_conn, $selectSql);		
	}else{ 
		//delete from taluka
	
		$insert_table_name = 'schools_'.$district.'_district';	
		$insertQuery = 'DELETE FROM '.$insert_table_name.' WHERE tehsil = \''.$taluka_name.'\';';
		
		//select records from updated taluka
		$selectSql = 'SELECT * FROM '.$table_name.';';
		$selectQuery = pg_query($pgsql_conn, $selectSql);
	}
	
	if($selectQuery){
		
		while($insertRow = pg_fetch_array($selectQuery)){
		
			//$comments = str_replace("'", "''", $insertRow[43]);
		
			$insertQuery .= 
						'INSERT INTO '.$insert_table_name.' (
							school_id, "semisCode", "surveyDate", "schName", "schType", "schGender",
							district, 
							tehsil, "unionCouncil", village, "schLang", "floodAffected", 
							"ghostSchool", "smcFunctional", "schMerged", "schMergedId", "schIndusKacha", 
							"orgSupport", "usaidSupport",  "compoundSi", "landWithin", "landWiSize", "classRmSize", 
							"landSurround", "landSuSize", "travelTime", "travelDesc", "bDamage", 
							"bDaPercent", "bCondition", landslides, "nearRiver", "riverHazard", 
							"hazardProne", "indPolution", "schMergeCa", "schMergeId", "schConsCa", 
							"schConsId", "schReconCa", "schRehabCa", "schRelocCa", shelterless, 
							"sch100m", "sch100mId", "sch500m", "sch500mId", "sch1000m", "sch1000mId", "sch1500m", "sch1500mId",
							comments, 
							"clsKgMAct", "clsKgFAct", "clsKgTAct", "cls1MAct", "cls1FAct", 
							"cls1TAct", "cls2MAct", "cls2FAct", "cls2TAct", "cls3MAct", "cls3FAct", 
							"cls3TAct", "cls4MAct", "cls4FAct", "cls4TAct", "cls5MAct", "cls5FAct", 
							"cls5TAct", "cls6MAct", "cls6FAct", "cls6TAct", "cls7MAct", "cls7FAct", 
							"cls7TAct", "cls8MAct", "cls8FAct", "cls8TAct", "cls9MAct", "cls9FAct", 
							"cls9TAct", "cls10MAct", "cls10FAct", "cls10TAct", "cls11MAct", 
							"cls11FAct", "cls11TAct", "cls12MAct", "cls12FAct", "cls12TAct", 
							"stuTotMAct", "stuTotFAct", "stuTotAct", "clsKgMReg", "clsKgFReg", 
							"clsKgTReg", "cls1MReg", "cls1FReg", "cls1TReg", "cls2MReg", 
							"cls2FReg", "cls2TReg", "cls3MReg", "cls3FReg", "cls3TReg", "cls4MReg", 
							"cls4FReg", "cls4TReg", "cls5MReg", "cls5FReg", "cls5TReg", "cls6MReg", 
							"cls6FReg", "cls6TReg", "cls7MReg", "cls7FReg", "cls7TReg", "cls8MReg", 
							"cls8FReg", "cls8TReg", "cls9MReg", "cls9FReg", "cls9TReg", "cls10MReg", 
							"cls10FReg", "cls10TReg", "cls11MReg", "cls11FReg", "cls11TReg", 
							"cls12MReg", "cls12FReg", "cls12TReg", "stuTotMReg", "stuTotFReg", 
							"stuTotReg", "mTeacher", "fTeacher", "tTeacher", "mUnTrained", 
							"fUnTrained", "tUnTrained", "mSupport", "fSupport", "tSupport", 
							--"thumbs", 
							"images", "imagesUrl", "drawing",
							the_geom)
				VALUES (\''.$insertRow[0].'\', \''.$insertRow[1].'\', \''.$insertRow[2].'\', \''.str_replace("'", "''", $insertRow[3]).'\', \''.$insertRow[4].'\', 
						\''.$insertRow[5].'\', 
						\''.$insertRow[6].'\', 
						\''.$insertRow[7].'\', \''.$insertRow[8].'\', \''.$insertRow[9].'\', \''.$insertRow[10].'\', \''.$insertRow[11].'\', 
						\''.$insertRow[12].'\', \''.$insertRow[13].'\', \''.$insertRow[14].'\', \''.$insertRow[15].'\', \''.$insertRow[16].'\', 
						\''.$insertRow[17].'\', \''.$insertRow[18].'\', \''.$insertRow[19].'\', \''.$insertRow[20].'\', '.$insertRow[21].', '.$insertRow[22].', 
						\''.$insertRow[23].'\', \''.$insertRow[24].'\', '.$insertRow[25].', \''.$insertRow[26].'\', \''.$insertRow[27].'\', 
						\''.$insertRow[28].'\', \''.$insertRow[29].'\', \''.$insertRow[30].'\', \''.$insertRow[31].'\', \''.$insertRow[32].'\', 
						\''.$insertRow[33].'\', \''.$insertRow[34].'\', \''.$insertRow[35].'\', \''.$insertRow[36].'\', \''.$insertRow[37].'\', 
						\''.$insertRow[38].'\', \''.$insertRow[39].'\', \''.$insertRow[40].'\', \''.$insertRow[41].'\', \''.$insertRow[42].'\', 
						\''.$insertRow[43].'\', \''.$insertRow[44].'\',
						\''.$insertRow[45].'\', \''.$insertRow[46].'\', 
						\''.$insertRow[47].'\', \''.$insertRow[48].'\',
						\''.$insertRow[49].'\', \''.$insertRow[50].'\',						
						\''.str_replace("'", "''", $insertRow[51]).'\', 
						'.$insertRow[52].', '.$insertRow[53].', '.$insertRow[54].', '.$insertRow[55].', '.$insertRow[56].', 
						'.$insertRow[57].', '.$insertRow[58].', '.$insertRow[59].', '.$insertRow[60].', '.$insertRow[61].', '.$insertRow[62].', 
						'.$insertRow[63].', '.$insertRow[64].', '.$insertRow[65].', '.$insertRow[66].', '.$insertRow[67].', '.$insertRow[68].', 
						'.$insertRow[69].', '.$insertRow[70].', '.$insertRow[71].', '.$insertRow[72].', '.$insertRow[73].', '.$insertRow[74].', 
						'.$insertRow[75].', '.$insertRow[76].', '.$insertRow[77].', '.$insertRow[78].', '.$insertRow[79].', '.$insertRow[80].', 
						'.$insertRow[81].', '.$insertRow[82].', '.$insertRow[83].', '.$insertRow[84].', '.$insertRow[85].', 
						'.$insertRow[86].', '.$insertRow[87].', '.$insertRow[88].', '.$insertRow[89].', '.$insertRow[90].', 
						'.$insertRow[91].', '.$insertRow[92].', '.$insertRow[93].', '.$insertRow[94].', '.$insertRow[95].', 
						'.$insertRow[96].', '.$insertRow[97].', '.$insertRow[98].', '.$insertRow[99].', '.$insertRow[100].', '.$insertRow[101].', 
						'.$insertRow[102].', '.$insertRow[103].', '.$insertRow[104].', '.$insertRow[105].', '.$insertRow[106].', '.$insertRow[107].', 
						'.$insertRow[108].', '.$insertRow[109].', '.$insertRow[110].', 
						'.$insertRow[111].', '.$insertRow[112].', '.$insertRow[113].', '.$insertRow[114].', '.$insertRow[115].', '.$insertRow[116].', 
						'.$insertRow[117].', '.$insertRow[118].', '.$insertRow[119].', '.$insertRow[120].', '.$insertRow[121].', '.$insertRow[122].', 
						'.$insertRow[123].', '.$insertRow[124].', '.$insertRow[125].', '.$insertRow[126].', '.$insertRow[127].', 
						'.$insertRow[128].', '.$insertRow[129].', '.$insertRow[130].', '.$insertRow[131].', '.$insertRow[132].', 
						'.$insertRow[133].', '.$insertRow[134].', '.$insertRow[135].',
						'.$insertRow[136].', '.$insertRow[137].', '.$insertRow[138].', '.$insertRow[139].', '.$insertRow[140].', 
						'.$insertRow[141].', '.$insertRow[142].', '.$insertRow[143].', '.$insertRow[144].',
						\''.$insertRow[145].'\',\''.$insertRow[146].'\',\''.$insertRow[147].'\',
						\''.$insertRow[148].'\');';
		}
	}else{
		echo 0;
	}
	
	//echo $insertQuery;
	
	//vaccum
	if($province){
		$tableQuery = pg_query($pgsql_sindh_conn, $insertQuery);
		$vaccumQuery = 'VACUUM ANALYZE '.$insert_table_name.';';
		$vaccum = pg_query($pgsql_sindh_conn, $vaccumQuery);
		//database session can be closed
		closeSindh($pgsql_sindh_conn);
	}else{
		$tableQuery = pg_query($pgsql_conn, $insertQuery);
		$vaccumQuery = 'VACUUM ANALYZE '.$insert_table_name.';';
		$vaccum = pg_query($pgsql_conn, $vaccumQuery);		
	}
	
	if(!$tableQuery){
		return 0;
	}else{
		return 1;
	}
	
	
}
//}else{
		//echo 'Enter dbname';
//}
?>
