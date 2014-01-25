<?php

set_time_limit(0);
ignore_user_abort(1);

function getJson($pgsql_conn, $sql, $table_name, $dir, $url){
	
	//echo $sql;
	//$query = false;
	
	$query = pg_query($pgsql_conn, $sql);
	
	if($query) {
		$i = 0;
		$j=0;
		while($row = pg_fetch_array($query)){
			$result[$i] = Array();
			//general information
			//schoolAssessment_id
			$result[$i]['schoolA_id'] = Array();
			$result[$i]['schoolA_id'] = $row[$j];$j++;
			//semisCode
			$result[$i]['semisCode'] = Array();
			$result[$i]['semisCode'] = $row[$j];$j++;
			//surveyDate
			if($row[$j]){
				$result[$i]['surveyDate'] = Array();
				$result[$i]['surveyDate'] = $row[$j];$j++;
			}else{
				$result[$i]['surveyDate'] = "2000-01-01 00:00:00";$j++;
			}

			/***/
			//schName /*correcting school name*/
			$schNameBits = explode(" ", $row[$j]);
			$schNameAppend = '';
			
			for ($k=0; $k<sizeof($schNameBits); $k++){
				if($k==0){$schNameAppend .= str_replace(" ","",strtoupper($schNameBits[$k])).' ';}else{
					$schNameAppend .= ucfirst(str_replace(" ","",strtolower($schNameBits[$k]))).' ';
				}
			}
			$schNameAppend = substr_replace($schNameAppend ,"",-1);
			//$schName = strtoupper($schNameBits[0]).' '.$schNameAppend;
			$schName = str_replace(".", "", $schNameAppend);		
			$schName = str_replace("'", "''", $schName);		
			
			$result[$i]['schName'] = Array();
			$result[$i]['schName'] = $schName;$j++;
			/***/			
			
			//schType
			$result[$i]['schType'] = Array();
			$result[$i]['schType'] = $row[$j];$j++;	
			//schType
			$result[$i]['schGender'] = Array();
			$result[$i]['schGender'] = $row[$j];$j++;				
			//district
			$result[$i]['district'] = Array();
			$result[$i]['district'] = $row[$j];$j++;
			//tehsil
			$result[$i]['tehsil'] = Array();
			$result[$i]['tehsil'] = $row[$j];$j++;
			
			//unionCouncil /*correct names*/
			$schUcBits = explode(" ", $row[$j]);
			$schUcAppend = '';
			
			for ($k=0; $k<sizeof($schUcBits); $k++){
				$schUcAppend .= ucfirst(str_replace(" ","",strtolower($schUcBits[$k]))).' ';
			}
			$schUcAppend = substr_replace($schUcAppend ,"",-1);
			//$schUc = strtoupper($schUcBits[0]).' '.$schUcAppend;
			$schUc = str_replace(".", "", $schUcAppend);	
			$schUc = str_replace("'", "''", $schUc);				
			//set
			$result[$i]['unionCouncil'] = Array();
			$result[$i]['unionCouncil'] = $schUc;$j++;
			
			//village
			$schVillageBits = explode(" ", $row[$j]);
			$schVillageAppend = '';
			
			for ($k=0; $k<sizeof($schVillageBits); $k++){
				$schVillageAppend .= ucfirst(str_replace(" ","",strtolower($schVillageBits[$k]))).' ';
			}
			$schVillageAppend = substr_replace($schVillageAppend ,"",-1);
			//$schVillage = strtoupper($schVillageBits[0]).' '.$schVillageAppend;
			$schVillage = str_replace(".", "", $schVillageAppend);		
			$schVillage = str_replace("'", "''", $schVillage);	
			//set
			$result[$i]['village'] = Array();
			$result[$i]['village'] = $schVillage;$j++;
			
			//schLang
			$result[$i]['schLang'] = Array();
			$result[$i]['schLang'] = $row[$j];$j++;
			//floodAffected
			$result[$i]['floodAffected'] = Array();
			$result[$i]['floodAffected'] = $row[$j];$j++;
			//ghostSchool
			$result[$i]['ghostSchool'] = Array();
			$result[$i]['ghostSchool'] = $row[$j];$j++;	
			//smcFunctional
			$result[$i]['smcFunctional'] = Array();
			$result[$i]['smcFunctional'] = $row[$j];$j++;
			//schMerged
			$result[$i]['schMerged'] = Array();
			$result[$i]['schMerged'] = $row[$j];$j++;
			//schMergedId
			if($result[$i]['schMerged'] == 'Yes'){
				//sql query
				$sqlMerged = "select sc.schoolsemiscode_semiscode
					from schoolsemiscode sc, schoolmergednameschoolassessmentschoolsemiscode sh, schoolassessment sa
					where sc.schoolsemiscode_id = sh.schoolsemiscode_id
					and sh.schoolassessment_id = sa.schoolassessment_id
					and sa.schoolassessment_id = '".$result[$i]['schoolA_id']."'";
				$queryMerged = pg_query($pgsql_conn, $sqlMerged);
				
				//results
				$mergedString = "";
				while($rowMerged = pg_fetch_array($queryMerged)){
					$mergedString .= $rowMerged[0].";";
				}
				$result[$i]['schMergedId'] = Array();
				$result[$i]['schMergedId'] = substr_replace($mergedString ,"",-1);
				pg_free_result($queryMerged);
				$j++;
			}else{
				$result[$i]['schMergedId'] = Array();
				$result[$i]['schMergedId'] = $row[$j];$j++;
			}
			
			//schIndusKacha
			$result[$i]['schIndusKacha'] = Array();
			$result[$i]['schIndusKacha'] = $row[$j];$j++;
			//orgSupport
			$result[$i]['orgSupport'] = Array();
			$result[$i]['orgSupport'] = $row[$j];$j++;
			//usaidSupport
			$result[$i]['usaidSupport'] = Array();
			$result[$i]['usaidSupport'] = $row[$j];$j++;
			//compoundSi
			$result[$i]['compoundSi'] = Array();
			$result[$i]['compoundSi'] = $row[$j];$j++;			
			//landWithin
			$result[$i]['landWithin'] = Array();
			$result[$i]['landWithin'] = $row[$j];$j++;
			//landWiSize
			$result[$i]['landWiSize'] = Array();
			$result[$i]['landWiSize'] = $row[$j];$j++;
			//classRmSize
			$result[$i]['classRmSize'] = Array();
			$result[$i]['classRmSize'] = $row[$j];$j++;
			if($result[$i]['classRmSize'] != 'No'){
			
				$sqlClassRm = "select 
					sum(case 
						when schoolbuilding_building1length is not null AND schoolbuilding_building1width is not null
							then (schoolbuilding_building1length*schoolbuilding_building1width)
						else 0 end)
					+sum(case 
						when schoolbuilding_building2length is not null AND schoolbuilding_building2width is not null
							then (schoolbuilding_building2length*schoolbuilding_building2width)
						else 0 end)	
					+sum(case 
						when schoolbuilding_building3length is not null AND schoolbuilding_building3width is not null
							then (schoolbuilding_building3length*schoolbuilding_building3width)
						else 0 end)	
					+sum(case 
						when schoolbuilding_building4length is not null AND schoolbuilding_building4width is not null
							then (schoolbuilding_building4length*schoolbuilding_building4width)
						else 0 end)	
					+sum(case 
						when schoolbuilding_building5length is not null AND schoolbuilding_building5width is not null
							then (schoolbuilding_building5length*schoolbuilding_building5width)
						else 0 end)	
					+sum(case 
						when schoolbuilding_building6length is not null AND schoolbuilding_building6width is not null
							then (schoolbuilding_building6length*schoolbuilding_building6width)
						else 0 end)							
				from schoolbuilding 
				where schoolbuilding_id = '".$result[$i]['classRmSize']."'";
				
				$queryClassRm = pg_query($pgsql_conn, $sqlClassRm);
				
				//results
				while($rowClassRm = pg_fetch_array($queryClassRm)){
					$result[$i]['classRmSize'] = $rowClassRm[0];
				}
				pg_free_result($queryClassRm);
			}else{
				$result[$i]['classRmSize'] = 0;
			}
			//landSurround
			$result[$i]['landSurround'] = Array();
			$result[$i]['landSurround'] = $row[$j];$j++;
			//landSuSize
			$result[$i]['landSuSize'] = Array();
			$result[$i]['landSuSize'] = $row[$j];$j++;
			if($result[$i]['landSuSize'] != 'No'){
				//sql query
				$sqlLandSize = "select directsurrounding_northavailableland, directsurrounding_eastavailableland, 
										directsurrounding_southavailableland, directsurrounding_westavailableland
				from directsurrounding
				where directsurrounding_id = '".$result[$i]['landSuSize']."'";
				$queryLandSize = pg_query($pgsql_conn, $sqlLandSize);
				
				//results
				$totalSize = 0;
				while($rowLandSize = pg_fetch_array($queryLandSize)){
					$totalSize = (int)$rowLandSize[0]+(int)$rowLandSize[1]+(int)$rowLandSize[2]+(int)$rowLandSize[3];
				}
				$result[$i]['landSuSize'] = $totalSize;
				pg_free_result($queryLandSize);
			}else{
				$result[$i]['landSuSize'] = 0;
			}
			//travelTime
			$result[$i]['travelTime'] = Array();
			$result[$i]['travelTime'] = $row[$j];$j++;
			//travelDesc
			$result[$i]['travelDesc'] = Array();
			$result[$i]['travelDesc'] = $row[$j];$j++;
			
			//damage assessment
			//bDamage
			$result[$i]['bDamage'] = Array();
			$result[$i]['bDamage'] = $row[$j];$j++;
			//bDaPercent
			$result[$i]['bDaPercent'] = Array();
			$result[$i]['bDaPercent'] = $row[$j];$j++;
			//condition
			$result[$i]['bCondition'] = Array();
			$result[$i]['bCondition'] = $row[$j];$j++;
			
			//drr assessment
			//landslides
			$result[$i]['landslides'] = Array();
			$result[$i]['landslides'] = $row[$j];$j++;
			//nearRiver
			$result[$i]['nearRiver'] = Array();
			$result[$i]['nearRiver'] = $row[$j];$j++;	
			//riverHazard
			$result[$i]['riverHazard'] = Array();
			$result[$i]['riverHazard'] = $row[$j];$j++;		
			//hazardProne
			$result[$i]['hazardProne'] = Array();
			$result[$i]['hazardProne'] = $row[$j];$j++;	
			//indPolution
			$result[$i]['indPolution'] = Array();
			$result[$i]['indPolution'] = $row[$j];$j++;
			
			//conclusion
			//schMergeCa
			$result[$i]['schMergeCa'] = Array();
			$result[$i]['schMergeCa'] = $row[$j];$j++;
			
			//schMergeId
			if($result[$i]['schMergeCa'] == 'Yes'){
				
				//sql query
				
				//sql query
				$sqlMerge = "select distinct(sc.schoolsemiscode_semiscode)
					from schoolsemiscode sc, 
					schoolsharingwallschoolassessmentschoolsemiscode sh, 
					schoolassessment sa
					where sc.schoolsemiscode_id = sh.schoolsemiscode_id
					and sh.schoolassessment_id = sa.schoolassessment_id
					and sa.schoolassessment_id = '".$result[$i]['schoolA_id']."'";
					
				$queryMerge = pg_query($pgsql_conn, $sqlMerge);
					//results
					$mergeString = "";
					while($rowMerge = pg_fetch_array($queryMerge)){
						$mergeString .= $rowMerge[0].";";
					}
					$result[$i]['schMergeId'] = Array();
					$result[$i]['schMergeId'] = substr_replace($mergeString ,"",-1);
					pg_free_result($queryMerge);	
	
				$sqlMerge = "select distinct(sc.schoolsemiscode_semiscode)
					from schoolsemiscode sc, 
					schoolsharingboundaryschoolassessmentschoolsemiscode sb, 
					schoolassessment sa
					where sc.schoolsemiscode_id = sb.schoolsemiscode_id
					and sb.schoolassessment_id = sa.schoolassessment_id
					and sa.schoolassessment_id = '".$result[$i]['schoolA_id']."'";				
				
				$queryMerge = pg_query($pgsql_conn, $sqlMerge);
					//results
					while($rowMerge = pg_fetch_array($queryMerge)){
						$mergeString .= $rowMerge[0].";";
					}
					$result[$i]['schMergeId'] = Array();
					$result[$i]['schMergeId'] = substr_replace($mergeString ,"",-1);
					pg_free_result($queryMerge);				
				
				$j++;
				
			}else{
				$result[$i]['schMergeId'] = Array();
				$result[$i]['schMergeId'] = $row[$j];$j++;
			}
			//schConsCa
			$result[$i]['schConsCa'] = Array();
			$result[$i]['schConsCa'] = $row[$j];$j++;
			//schConsIds
			if($result[$i]['schConsCa'] == 'Yes'){
				//sql query
				$sqlCons = "select sc.schoolsemiscode_semiscode
				from schoolsemiscode sc, schoolcloserthan500mschoolassessmentschoolsemiscode sh, schoolassessment sa
					where sc.schoolsemiscode_id = sh.schoolsemiscode_id
					and sh.schoolassessment_id = sa.schoolassessment_id
					and sa.schoolassessment_id = '".$result[$i]['schoolA_id']."'";
				
				$queryCons = pg_query($pgsql_conn, $sqlCons);
				
				//results
				$consString = "";
				while($rowCons = pg_fetch_array($queryCons)){
					$consString .= $rowCons[0].";";
				}
				$result[$i]['schConsId'] = Array();
				$result[$i]['schConsId'] = substr_replace($consString ,"",-1);
				pg_free_result($queryCons);
				$j++;
			}else{
				$result[$i]['schConsId'] = Array();
				$result[$i]['schConsId'] = $row[$j];$j++;
			}
			//schReconCa
			$result[$i]['schReconCa'] = Array();
			$result[$i]['schReconCa'] = $row[$j];$j++;
			//schRehabCa
			$result[$i]['schRehabCa'] = Array();
			$result[$i]['schRehabCa'] = $row[$j];$j++;
			//schRelocCa
			$result[$i]['schRelocCa'] = Array();
			$result[$i]['schRelocCa'] = $row[$j];$j++;
			//shelterless
			$result[$i]['shelterless'] = Array();
			$result[$i]['shelterless'] = $row[$j];$j++;	
			
			//sch100m
			$the_geom = $row[$j];$j++;
			$sqlSch100m = "SELECT count(\"semisCode\") FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.001)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");";
			$querySch100m = pg_query($pgsql_conn, $sqlSch100m);
			
			//results
			while($rowSch100m = pg_fetch_array($querySch100m)){
				$sch100m = $rowSch100m[0];
			}			
			pg_free_result($querySch100m);
			
			$sqlSch100mId = "SELECT \"semisCode\" FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.001)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");"; //0.001 in decimal degrees = 100m
			$querySch100mId = pg_query($pgsql_conn, $sqlSch100mId);
			//results
			$sch100mId = "";
			while($rowSch100mId = pg_fetch_array($querySch100mId)){
				$sch100mId .= $rowSch100mId[0].";";
			}
			pg_free_result($querySch100mId);			
			
			$result[$i]['sch100m'] = Array();
			$result[$i]['sch100mId'] = Array();
			
			if($sch100m){
				$result[$i]['sch100m'] = $sch100m;
				$result[$i]['sch100mId'] = substr_replace($sch100mId ,"",-1);
			}else{
				$result[$i]['sch100m'] = '0';
				$result[$i]['sch100mId'] = 'n.a';
			}
			
			//sch500m
			$the_geom = $row[$j];$j++;
			$sqlSch500m = "SELECT count(\"semisCode\") FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.005)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");";
			$querySch500m = pg_query($pgsql_conn, $sqlSch500m);
			
			//results
			while($rowSch500m = pg_fetch_array($querySch500m)){
				$sch500m = $rowSch500m[0];
			}			
			pg_free_result($querySch500m);
			
			$sqlSch500mId = "SELECT \"semisCode\" FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.005)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");"; //0.005 = 555m
			$querySch500mId = pg_query($pgsql_conn, $sqlSch500mId);
			
			//results
			$sch500mId = "";
			while($rowSch500mId = pg_fetch_array($querySch500mId)){
				$sch500mId .= $rowSch500mId[0].";";
			}
			pg_free_result($querySch500mId);			
			
			$result[$i]['sch500m'] = Array();
			$result[$i]['sch500mId'] = Array();
			
			if($sch100m){
				$result[$i]['sch500m'] = $sch500m;
				$result[$i]['sch500mId'] = substr_replace($sch500mId ,"",-1);
			}else{
				$result[$i]['sch500m'] = '0';
				$result[$i]['sch500mId'] = 'n.a';
			}
			

			//sch1000m
			$the_geom = $row[$j];$j++;
			$sqlSch1000m = "SELECT count(\"semisCode\") FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.01)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");"; //0.01 = 1111m
			$querySch1000m = pg_query($pgsql_conn, $sqlSch1000m);
			
			//results
			while($rowSch1000m = pg_fetch_array($querySch1000m)){
				$sch1000m = $rowSch1000m[0];
			}			
			pg_free_result($querySch1000m);
			
			$sqlSch1000mId = "SELECT \"semisCode\" FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.01)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");";
			$querySch1000mId = pg_query($pgsql_conn, $sqlSch1000mId);
			
			//echo $sqlSch100mId;
			
			//results
			$sch1000mId = "";
			while($rowSch1000mId = pg_fetch_array($querySch1000mId)){
				$sch1000mId .= $rowSch1000mId[0].";";
			}
			pg_free_result($querySch1000mId);			
			
			$result[$i]['sch1000m'] = Array();
			$result[$i]['sch1000mId'] = Array();
			
			if($sch100m){
				$result[$i]['sch1000m'] = $sch1000m;
				$result[$i]['sch1000mId'] = substr_replace($sch1000mId ,"",-1);
			}else{
				$result[$i]['sch1000m'] = '0';
				$result[$i]['sch1000mId'] = 'n.a';
			}
			
			
			//sch1500m
			$the_geom = $row[$j];$j++;
			$sqlSch1500m = "SELECT count(\"semisCode\") FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.015)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");"; //0.015 = 1555m
			$querySch1500m = pg_query($pgsql_conn, $sqlSch1500m);
			
			//results
			while($rowSch1500m = pg_fetch_array($querySch1500m)){
				$sch1500m = $rowSch1500m[0];
			}			
			pg_free_result($querySch1500m);
			
			$sqlSch1500mId = "SELECT \"semisCode\" FROM ".$table_name."
							WHERE ST_DWithin(the_geom, '".$the_geom."', 0.015)
							and \"semisCode\" NOT in (".$result[$i]['semisCode'].");";
			$querySch1500mId = pg_query($pgsql_conn, $sqlSch1500mId);
			
			//results
			$sch1500mId = "";
			while($rowSch1500mId = pg_fetch_array($querySch1500mId)){
				$sch1500mId .= $rowSch1500mId[0].";";
			}
			pg_free_result($querySch1500mId);			
			
			$result[$i]['sch1500m'] = Array();
			$result[$i]['sch1500mId'] = Array();
			
			if($sch100m){
				$result[$i]['sch1500m'] = $sch1500m;
				$result[$i]['sch1500mId'] = substr_replace($sch1500mId ,"",-1);
			}else{
				$result[$i]['sch1500m'] = '0';
				$result[$i]['sch1500mId'] = 'n.a';
			}					
			
			//comments
			$result[$i]['comments'] = Array();
			$comments = str_replace("'","''",$row[$j]);
			$comments = str_replace("\n"," ",$comments);
			//finally remove new lines.
			$result[$i]['comments'] = trim(preg_replace('/\s+/', ' ', $comments));$j++;
			
			//if 'shelterless' is n.a then search comments
			if($result[$i]['shelterless'] == 'n.a'){
				if(fnmatch('*shel*', strtolower($comments))){
					$result[$i]['shelterless'] = 'Yes';
				}else{
					$result[$i]['shelterless'] = 'No';
				}
			}
			
			//demographics
			//clsKgMAct
			$result[$i]['clsKgMAct'] = Array();
			$result[$i]['clsKgMAct'] = $row[$j];$j++;
			//clsKgFAct
			$result[$i]['clsKgFAct'] = Array();
			$result[$i]['clsKgFAct'] = $row[$j];$j++;
			//clsKgTAct
			$result[$i]['clsKgTAct'] = Array();
			$result[$i]['clsKgTAct'] = $row[$j];$j++;

			//cls1MAct
			$result[$i]['cls1MAct'] = Array();
			$result[$i]['cls1MAct'] = $row[$j];$j++;
			//cls1FAct
			$result[$i]['cls1FAct'] = Array();
			$result[$i]['cls1FAct'] = $row[$j];$j++;
			//cls1TAct
			$result[$i]['cls1TAct'] = Array();
			$result[$i]['cls1TAct'] = $row[$j];$j++;
			
			//cls2MAct
			$result[$i]['cls2MAct'] = Array();
			$result[$i]['cls2MAct'] = $row[$j];$j++;
			//cls2FAct
			$result[$i]['cls2FAct'] = Array();
			$result[$i]['cls2FAct'] = $row[$j];$j++;
			//cls2TAct
			$result[$i]['cls2TAct'] = Array();
			$result[$i]['cls2TAct'] = $row[$j];$j++;

			//cls3MAct
			$result[$i]['cls3MAct'] = Array();
			$result[$i]['cls3MAct'] = $row[$j];$j++;
			//cls3FAct
			$result[$i]['cls3FAct'] = Array();
			$result[$i]['cls3FAct'] = $row[$j];$j++;
			//cls3TAct
			$result[$i]['cls3TAct'] = Array();
			$result[$i]['cls3TAct'] = $row[$j];$j++;

			//cls4MAct
			$result[$i]['cls4MAct'] = Array();
			$result[$i]['cls4MAct'] = $row[$j];$j++;
			//cls4FAct
			$result[$i]['cls4FAct'] = Array();
			$result[$i]['cls4FAct'] = $row[$j];$j++;
			//cls4TAct
			$result[$i]['cls4TAct'] = Array();
			$result[$i]['cls4TAct'] = $row[$j];$j++;
			
			//cls5MAct
			$result[$i]['cls5MAct'] = Array();
			$result[$i]['cls5MAct'] = $row[$j];$j++;
			//cls5FAct
			$result[$i]['cls5FAct'] = Array();
			$result[$i]['cls5FAct'] = $row[$j];$j++;
			//cls5TAct
			$result[$i]['cls5TAct'] = Array();
			$result[$i]['cls5TAct'] = $row[$j];$j++;

			//cls6MAct
			$result[$i]['cls6MAct'] = Array();
			$result[$i]['cls6MAct'] = $row[$j];$j++;
			//cls6FAct
			$result[$i]['cls6FAct'] = Array();
			$result[$i]['cls6FAct'] = $row[$j];$j++;
			//cls6TAct
			$result[$i]['cls6TAct'] = Array();
			$result[$i]['cls6TAct'] = $row[$j];$j++;
			
			//cls7MAct
			$result[$i]['cls7MAct'] = Array();
			$result[$i]['cls7MAct'] = $row[$j];$j++;
			//cls7FAct
			$result[$i]['cls7FAct'] = Array();
			$result[$i]['cls7FAct'] = $row[$j];$j++;
			//cls7TAct
			$result[$i]['cls7TAct'] = Array();
			$result[$i]['cls7TAct'] = $row[$j];$j++;

			//cls8MAct
			$result[$i]['cls8MAct'] = Array();
			$result[$i]['cls8MAct'] = $row[$j];$j++;
			//cls8FAct
			$result[$i]['cls8FAct'] = Array();
			$result[$i]['cls8FAct'] = $row[$j];$j++;
			//cls8TAct
			$result[$i]['cls8TAct'] = Array();
			$result[$i]['cls8TAct'] = $row[$j];$j++;

			//cls9MAct
			$result[$i]['cls9MAct'] = Array();
			$result[$i]['cls9MAct'] = $row[$j];$j++;
			//cls9FAct
			$result[$i]['cls9FAct'] = Array();
			$result[$i]['cls9FAct'] = $row[$j];$j++;
			//cls9TAct
			$result[$i]['cls9TAct'] = Array();
			$result[$i]['cls9TAct'] = $row[$j];$j++;

			//cls10MAct
			$result[$i]['cls10MAct'] = Array();
			$result[$i]['cls10MAct'] = $row[$j];$j++;
			//cls10FAct
			$result[$i]['cls10FAct'] = Array();
			$result[$i]['cls10FAct'] = $row[$j];$j++;
			//cls10TAct
			$result[$i]['cls10TAct'] = Array();
			$result[$i]['cls10TAct'] = $row[$j];$j++;

			//cls11MAct
			$result[$i]['cls11MAct'] = Array();
			$result[$i]['cls11MAct'] = $row[$j];$j++;
			//cls11FAct
			$result[$i]['cls11FAct'] = Array();
			$result[$i]['cls11FAct'] = $row[$j];$j++;
			//cls11TAct
			$result[$i]['cls11TAct'] = Array();
			$result[$i]['cls11TAct'] = $row[$j];$j++;

			//cls12MAct
			$result[$i]['cls12MAct'] = Array();
			$result[$i]['cls12MAct'] = $row[$j];$j++;
			//cls12FAct
			$result[$i]['cls12FAct'] = Array();
			$result[$i]['cls12FAct'] = $row[$j];$j++;
			//cls12TAct
			$result[$i]['cls12TAct'] = Array();
			$result[$i]['cls12TAct'] = $row[$j];$j++;
			
			//stuTotMAct
			$result[$i]['stuTotMAct'] = Array();
			$result[$i]['stuTotMAct'] = $row[$j];$j++;
			//stuTotFAct
			$result[$i]['stuTotFAct'] = Array();
			$result[$i]['stuTotFAct'] = $row[$j];$j++;
			//stuTotAct
			$result[$i]['stuTotAct'] = Array();
			$result[$i]['stuTotAct'] = $row[$j];$j++;
						
			

			
			//clsKgMReg
			$result[$i]['clsKgMReg'] = Array();
			$result[$i]['clsKgMReg'] = $row[$j];$j++;
			//clsKgFReg
			$result[$i]['clsKgFReg'] = Array();
			$result[$i]['clsKgFReg'] = $row[$j];$j++;
			//clsKgTReg
			$result[$i]['clsKgTReg'] = Array();
			$result[$i]['clsKgTReg'] = $row[$j];$j++;

			//cls1MReg
			$result[$i]['cls1MReg'] = Array();
			$result[$i]['cls1MReg'] = $row[$j];$j++;
			//cls1FReg
			$result[$i]['cls1FReg'] = Array();
			$result[$i]['cls1FReg'] = $row[$j];$j++;
			//cls1TReg
			$result[$i]['cls1TReg'] = Array();
			$result[$i]['cls1TReg'] = $row[$j];$j++;
			
			//cls2MReg
			$result[$i]['cls2MReg'] = Array();
			$result[$i]['cls2MReg'] = $row[$j];$j++;
			//cls2FReg
			$result[$i]['cls2FReg'] = Array();
			$result[$i]['cls2FReg'] = $row[$j];$j++;
			//cls2TReg
			$result[$i]['cls2TReg'] = Array();
			$result[$i]['cls2TReg'] = $row[$j];$j++;

			//cls3MReg
			$result[$i]['cls3MReg'] = Array();
			$result[$i]['cls3MReg'] = $row[$j];$j++;
			//cls3FReg
			$result[$i]['cls3FReg'] = Array();
			$result[$i]['cls3FReg'] = $row[$j];$j++;
			//cls3TReg
			$result[$i]['cls3TReg'] = Array();
			$result[$i]['cls3TReg'] = $row[$j];$j++;

			//cls4MReg
			$result[$i]['cls4MReg'] = Array();
			$result[$i]['cls4MReg'] = $row[$j];$j++;
			//cls4FReg
			$result[$i]['cls4FReg'] = Array();
			$result[$i]['cls4FReg'] = $row[$j];$j++;
			//cls4TReg
			$result[$i]['cls4TReg'] = Array();
			$result[$i]['cls4TReg'] = $row[$j];$j++;
			
			//cls5MReg
			$result[$i]['cls5MReg'] = Array();
			$result[$i]['cls5MReg'] = $row[$j];$j++;
			//cls5FReg
			$result[$i]['cls5FReg'] = Array();
			$result[$i]['cls5FReg'] = $row[$j];$j++;
			//cls5TReg
			$result[$i]['cls5TReg'] = Array();
			$result[$i]['cls5TReg'] = $row[$j];$j++;

			//cls6MReg
			$result[$i]['cls6MReg'] = Array();
			$result[$i]['cls6MReg'] = $row[$j];$j++;
			//cls6FReg
			$result[$i]['cls6FReg'] = Array();
			$result[$i]['cls6FReg'] = $row[$j];$j++;
			//cls6TReg
			$result[$i]['cls6TReg'] = Array();
			$result[$i]['cls6TReg'] = $row[$j];$j++;

			//cls7MReg
			$result[$i]['cls7MReg'] = Array();
			$result[$i]['cls7MReg'] = $row[$j];$j++;
			//cls7FReg
			$result[$i]['cls7FReg'] = Array();
			$result[$i]['cls7FReg'] = $row[$j];$j++;
			//cls7TReg
			$result[$i]['cls7TReg'] = Array();
			$result[$i]['cls7TReg'] = $row[$j];$j++;

			//cls8MReg
			$result[$i]['cls8MReg'] = Array();
			$result[$i]['cls8MReg'] = $row[$j];$j++;
			//cls8FReg
			$result[$i]['cls8FReg'] = Array();
			$result[$i]['cls8FReg'] = $row[$j];$j++;
			//cls8TReg
			$result[$i]['cls8TReg'] = Array();
			$result[$i]['cls8TReg'] = $row[$j];$j++;

			//cls9MReg
			$result[$i]['cls9MReg'] = Array();
			$result[$i]['cls9MReg'] = $row[$j];$j++;
			//cls9FReg
			$result[$i]['cls9FReg'] = Array();
			$result[$i]['cls9FReg'] = $row[$j];$j++;
			//cls9TReg
			$result[$i]['cls9TReg'] = Array();
			$result[$i]['cls9TReg'] = $row[$j];$j++;

			//cls10MReg
			$result[$i]['cls10MReg'] = Array();
			$result[$i]['cls10MReg'] = $row[$j];$j++;
			//cls10FReg
			$result[$i]['cls10FReg'] = Array();
			$result[$i]['cls10FReg'] = $row[$j];$j++;
			//cls10TReg
			$result[$i]['cls10TReg'] = Array();
			$result[$i]['cls10TReg'] = $row[$j];$j++;

			//cls11MReg
			$result[$i]['cls11MReg'] = Array();
			$result[$i]['cls11MReg'] = $row[$j];$j++;
			//cls11FReg
			$result[$i]['cls11FReg'] = Array();
			$result[$i]['cls11FReg'] = $row[$j];$j++;
			//cls11TReg
			$result[$i]['cls11TReg'] = Array();
			$result[$i]['cls11TReg'] = $row[$j];$j++;

			//cls12MReg
			$result[$i]['cls12MReg'] = Array();
			$result[$i]['cls12MReg'] = $row[$j];$j++;
			//cls12FReg
			$result[$i]['cls12FReg'] = Array();
			$result[$i]['cls12FReg'] = $row[$j];$j++;
			//cls12TReg
			$result[$i]['cls12TReg'] = Array();
			$result[$i]['cls12TReg'] = $row[$j];$j++;
			
			//stuTotMReg
			$result[$i]['stuTotMReg'] = Array();
			$result[$i]['stuTotMReg'] = $row[$j];$j++;
			//stuTotFReg
			$result[$i]['stuTotFReg'] = Array();
			$result[$i]['stuTotFReg'] = $row[$j];$j++;
			//stuTotReg
			$result[$i]['stuTotReg'] = Array();
			$result[$i]['stuTotReg'] = $row[$j];$j++;	
			
			//schGender
			if (($result[$i]['stuTotMAct'] > 0) && ($result[$i]['stuTotFAct'] > 0)){
				$result[$i]['schGender'] = 'Mixed';
			}else if (($result[$i]['stuTotMAct'] > 0) && ($result[$i]['stuTotFAct'] == 0)){
				$result[$i]['schGender'] = 'Boys';
			}else if (($result[$i]['stuTotMAct'] == 0) && ($result[$i]['stuTotFAct'] > 0)){
				$result[$i]['schGender'] = 'Girls';
			}

			//mTeacher
			$result[$i]['mTeacher'] = Array();
			$result[$i]['mTeacher'] = $row[$j];$j++;
			//fTeacher
			$result[$i]['fTeacher'] = Array();
			$result[$i]['fTeacher'] = $row[$j];$j++;
			//tTeacher
			$result[$i]['tTeacher'] = Array();
			$result[$i]['tTeacher'] = $row[$j];$j++;		

			//mUnTrained
			$result[$i]['mUnTrained'] = Array();
			$result[$i]['mUnTrained'] = $row[$j];$j++;
			//fUnTrained
			$result[$i]['fUnTrained'] = Array();
			$result[$i]['fUnTrained'] = $row[$j];$j++;
			//tUnTrained
			$result[$i]['tUnTrained'] = Array();
			$result[$i]['tUnTrained'] = $row[$j];$j++;

			//mSupport
			$result[$i]['mSupport'] = Array();
			$result[$i]['mSupport'] = $row[$j];$j++;
			//fSupport
			$result[$i]['fSupport'] = Array();
			$result[$i]['fSupport'] = $row[$j];$j++;
			//tSupport
			$result[$i]['tSupport'] = Array();
			$result[$i]['tSupport'] = $row[$j];$j++;
			
			//images and thumbs
			//$thumbString = "";
			$imageString = "";
			$imagesUrl = "";
			
			$filename = glob($dir.'*'.$result[$i]['semisCode'].'*');
			foreach($filename as $file){
				if(strpos($file,'JPG') !== false){
					$image = basename($file);
					$imageString .= $image.";";
					$imagesUrl .= $url.$image.";";
				}
			}			

			//results
			//$result[$i]['thumbs'] = Array();
			//$result[$i]['thumbs'] = substr_replace($thumbString ,"",-1);
			$result[$i]['images'] = Array();
			$result[$i]['images'] = substr_replace($imageString ,"",-1);
			$result[$i]['imagesUrl'] = Array();
			$result[$i]['imagesUrl'] = substr_replace($imagesUrl ,"",-1);
			
			//drawing
			$drawing = "";
			$sqlDrawingId = "select schooldrawing_id from schooldrawingsschoolassessmentschooldrawing 
								where schoolassessment_id = '".$result[$i]['schoolA_id']."'";
			$queryDrawingId = pg_query($pgsql_conn, $sqlDrawingId);
			
			while($rowDrawing = pg_fetch_array($queryDrawingId)){
				$sqlDrawing = "select schooldrawing_drawing from schooldrawing 
									where schooldrawing_id = '".$rowDrawing[0]."'";
				
				$queryDrawing = pg_query($pgsql_conn, $sqlDrawing);				
				while($rowImage = pg_fetch_array($queryDrawing)){
					if(glob($dir.$rowImage[0]."*")){
						$file = glob($dir.$rowImage[0]."*");
						$filename = str_replace($dir, "",$file[0]);
						$drawing = $url.$filename;
					}
				}
				pg_free_result($queryDrawing);			
			}			
			pg_free_result($queryDrawingId);	
			
			//results
			$result[$i]['drawing'] = Array();
			$result[$i]['drawing'] = $drawing;
			
			//the_geom
			$result[$i]['the_geom'] = Array();
			$result[$i]['the_geom'] = $row[$j];
			
			//counter
			$i++;
			$j=0;
		}
		
		//$result = '{"data":'.json_encode($result).'}';
		return $result;
	}else{
		echo "Database Query Error!";
	}
}

?>
