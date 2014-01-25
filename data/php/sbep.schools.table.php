<?php

set_time_limit(0);
ignore_user_abort(1);

function createTable($pgsql_conn,$tehsil_id,$table_name,$array){

	//$table_name = strtolower("schools_".str_replace(" ","_",$table_name));

	if(count($array) > 0){
		
		$table = '	
			-- Table: '.$table_name.'

			DROP TABLE IF EXISTS '.$table_name.' CASCADE;

			CREATE TABLE '.$table_name.'
			(
			  "school_id" character varying(255) NOT NULL,
			  "semisCode" integer,
			  "surveyDate" timestamp without time zone,
			  "schName" character varying(255),
			  "schType" character varying(255),
			  "schGender" character varying(255),
			  "district" character varying(255),
			  "tehsil" character varying(255),
			  "unionCouncil" character varying(255),
			  "village" character varying(255),
			  "schLang" character varying(255),
			  "floodAffected" character varying(255),
			  "ghostSchool" character varying(255),
			  "smcFunctional" character varying(255),
			  "schMerged" character varying(255),
			  "schMergedId" character varying(1024),
			  "schIndusKacha" character varying(255),
			  "orgSupport" character varying(255),
			  "usaidSupport" character varying(255),
			  "compoundSi" real,
			  "landWithin" character varying(255),
			  "landWiSize" real,
			  "classRmSize" real,
			  "landSurround" character varying(255),
			  "landSuSize" real,
			  "travelTime" integer DEFAULT 0,
			  "travelDesc" character varying(255),
			  "bDamage" character varying(255),
			  "bDaPercent" character varying(255),
			  "bCondition" character varying(255),
			  "landslides" character varying(255),
			  "nearRiver" character varying(255),
			  "riverHazard" character varying(255),
			  "hazardProne" character varying(255),
			  "indPolution" character varying(255),
			  "schMergeCa" character varying(255),
			  "schMergeId" character varying(3072),
			  "schConsCa" character varying(255),
			  "schConsId" character varying(1024),
			  "schReconCa" character varying(255),
			  "schRehabCa" character varying(255),
			  "schRelocCa" character varying(255),
			  "shelterless" character varying(255),
			  
			  "sch100m" integer,
			  "sch100mId" character varying(1024),
			  "sch500m" integer,
			  "sch500mId" character varying(1024),
			  "sch1000m" integer,
			  "sch1000mId" character varying(2048),
			  "sch1500m" integer,
			  "sch1500mId" character varying(4096),				  
			  
			  "comments" character varying(1024),
			  
			  "clsKgMAct" integer DEFAULT 0,
			  "clsKgFAct" integer DEFAULT 0,
			  "clsKgTAct" integer DEFAULT 0,
			  "cls1MAct" integer DEFAULT 0,
			  "cls1FAct" integer DEFAULT 0,
			  "cls1TAct" integer DEFAULT 0,
			  "cls2MAct" integer DEFAULT 0,
			  "cls2FAct" integer DEFAULT 0,
			  "cls2TAct" integer DEFAULT 0,
			  "cls3MAct" integer DEFAULT 0,
			  "cls3FAct" integer DEFAULT 0,
			  "cls3TAct" integer DEFAULT 0,
			  "cls4MAct" integer DEFAULT 0,
			  "cls4FAct" integer DEFAULT 0,
			  "cls4TAct" integer DEFAULT 0,
			  "cls5MAct" integer DEFAULT 0,
			  "cls5FAct" integer DEFAULT 0,
			  "cls5TAct" integer DEFAULT 0,
			  "cls6MAct" integer DEFAULT 0,
			  "cls6FAct" integer DEFAULT 0,
			  "cls6TAct" integer DEFAULT 0,
			  "cls7MAct" integer DEFAULT 0,
			  "cls7FAct" integer DEFAULT 0,
			  "cls7TAct" integer DEFAULT 0,
			  "cls8MAct" integer DEFAULT 0,
			  "cls8FAct" integer DEFAULT 0,
			  "cls8TAct" integer DEFAULT 0,
			  "cls9MAct" integer DEFAULT 0,
			  "cls9FAct" integer DEFAULT 0,
			  "cls9TAct" integer DEFAULT 0,
			  "cls10MAct" integer DEFAULT 0,
			  "cls10FAct" integer DEFAULT 0,
			  "cls10TAct" integer DEFAULT 0,
			  "cls11MAct" integer DEFAULT 0,
			  "cls11FAct" integer DEFAULT 0,
			  "cls11TAct" integer DEFAULT 0,		  
			  "cls12MAct" integer DEFAULT 0,
			  "cls12FAct" integer DEFAULT 0,
			  "cls12TAct" integer DEFAULT 0,		  		  		  
	 
			  "stuTotMAct" integer DEFAULT 0,
			  "stuTotFAct" integer DEFAULT 0,
			  "stuTotAct" integer DEFAULT 0,
			  
			  
			  "clsKgMReg" integer DEFAULT 0,
			  "clsKgFReg" integer DEFAULT 0,
			  "clsKgTReg" integer DEFAULT 0,
			  "cls1MReg" integer DEFAULT 0,
			  "cls1FReg" integer DEFAULT 0,
			  "cls1TReg" integer DEFAULT 0,
			  "cls2MReg" integer DEFAULT 0,
			  "cls2FReg" integer DEFAULT 0,
			  "cls2TReg" integer DEFAULT 0,
			  "cls3MReg" integer DEFAULT 0,
			  "cls3FReg" integer DEFAULT 0,
			  "cls3TReg" integer DEFAULT 0,
			  "cls4MReg" integer DEFAULT 0,
			  "cls4FReg" integer DEFAULT 0,
			  "cls4TReg" integer DEFAULT 0,
			  "cls5MReg" integer DEFAULT 0,
			  "cls5FReg" integer DEFAULT 0,
			  "cls5TReg" integer DEFAULT 0,
			  "cls6MReg" integer DEFAULT 0,
			  "cls6FReg" integer DEFAULT 0,
			  "cls6TReg" integer DEFAULT 0,
			  "cls7MReg" integer DEFAULT 0,
			  "cls7FReg" integer DEFAULT 0,
			  "cls7TReg" integer DEFAULT 0,
			  "cls8MReg" integer DEFAULT 0,
			  "cls8FReg" integer DEFAULT 0,
			  "cls8TReg" integer DEFAULT 0,
			  "cls9MReg" integer DEFAULT 0,
			  "cls9FReg" integer DEFAULT 0,
			  "cls9TReg" integer DEFAULT 0,
			  "cls10MReg" integer DEFAULT 0,
			  "cls10FReg" integer DEFAULT 0,
			  "cls10TReg" integer DEFAULT 0,
			  "cls11MReg" integer DEFAULT 0,
			  "cls11FReg" integer DEFAULT 0,
			  "cls11TReg" integer DEFAULT 0,		  
			  "cls12MReg" integer DEFAULT 0,
			  "cls12FReg" integer DEFAULT 0,
			  "cls12TReg" integer DEFAULT 0,				  
			  
			  "stuTotMReg" integer DEFAULT 0,
			  "stuTotFReg" integer DEFAULT 0,
			  "stuTotReg" integer DEFAULT 0,
			  
			  "mTeacher" integer DEFAULT 0,
			  "fTeacher" integer DEFAULT 0,
			  "tTeacher" integer DEFAULT 0,
			  
			  "mUnTrained" integer DEFAULT 0,
			  "fUnTrained" integer DEFAULT 0,
			  "tUnTrained" integer DEFAULT 0,  
			  
			  "mSupport" integer DEFAULT 0,
			  "fSupport" integer DEFAULT 0,
			  "tSupport" integer DEFAULT 0,
			  
			  "images" character varying(1024),
			  "imagesUrl" character varying(4096),
			  "drawing" character varying(1024),
			  
			  "the_geom" geometry,
			  CONSTRAINT '.$table_name.'_pkey PRIMARY KEY ("school_id")
			)
			WITH (
			  OIDS=FALSE
			);
			ALTER TABLE '.$table_name.'
			  OWNER TO postgres;
		';
		
		foreach($array as $key){
		
			$id = $key["schoolA_id"];
			$semisCode = $key["semisCode"];
			if(strlen($key["district"]) > 0){
				$district = $key["district"];
			}
		
			$table .= '
				INSERT INTO '.$table_name.'(
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
				VALUES (\''.$key["schoolA_id"].'\', \''.$key["semisCode"].'\', \''.$key["surveyDate"].'\', \''.$key["schName"].'\', \''.$key["schType"].'\', \''.$key["schGender"].'\', 
						\''.$key["district"].'\', 
						\''.$key["tehsil"].'\', \''.$key["unionCouncil"].'\', \''.$key["village"].'\', \''.$key["schLang"].'\', \''.$key["floodAffected"].'\', 
						\''.$key["ghostSchool"].'\', \''.$key["smcFunctional"].'\', \''.$key["schMerged"].'\', \''.$key["schMergedId"].'\', \''.$key["schIndusKacha"].'\', 
						\''.$key["orgSupport"].'\', \''.$key["usaidSupport"].'\', \''.$key["compoundSi"].'\', \''.$key["landWithin"].'\', '.$key["landWiSize"].', '.$key["classRmSize"].', 
						\''.$key["landSurround"].'\', \''.$key["landSuSize"].'\', '.$key["travelTime"].', \''.$key["travelDesc"].'\', \''.$key["bDamage"].'\', 
						\'~'.$key["bDaPercent"].'\', \''.$key["bCondition"].'\', \''.$key["landslides"].'\', \''.$key["nearRiver"].'\', \''.$key["riverHazard"].'\', 
						\''.$key["hazardProne"].'\', \''.$key["indPolution"].'\', \''.$key["schMergeCa"].'\', \''.$key["schMergeId"].'\', \''.$key["schConsCa"].'\', 
						\''.$key["schConsId"].'\', \''.$key["schReconCa"].'\', \''.$key["schRehabCa"].'\', \''.$key["schRelocCa"].'\', \''.$key["shelterless"].'\', 
						\''.$key["sch100m"].'\', \''.$key["sch100mId"].'\',
						\''.$key["sch500m"].'\', \''.$key["sch500mId"].'\', 
						\''.$key["sch1000m"].'\', \''.$key["sch1000mId"].'\',
						\''.$key["sch1500m"].'\', \''.$key["sch1500mId"].'\',						
						\''.$key["comments"].'\', 
						'.$key["clsKgMAct"].', '.$key["clsKgFAct"].', '.$key["clsKgTAct"].', '.$key["cls1MAct"].', '.$key["cls1FAct"].', 
						'.$key["cls1TAct"].', '.$key["cls2MAct"].', '.$key["cls2FAct"].', '.$key["cls2TAct"].', '.$key["cls3MAct"].', '.$key["cls3FAct"].', 
						'.$key["cls3TAct"].', '.$key["cls4MAct"].', '.$key["cls4FAct"].', '.$key["cls4TAct"].', '.$key["cls5MAct"].', '.$key["cls5FAct"].', 
						'.$key["cls5TAct"].', '.$key["cls6MAct"].', '.$key["cls6FAct"].', '.$key["cls6TAct"].', '.$key["cls7MAct"].', '.$key["cls7FAct"].', 
						'.$key["cls7TAct"].', '.$key["cls8MAct"].', '.$key["cls8FAct"].', '.$key["cls8TAct"].', '.$key["cls9MAct"].', '.$key["cls9FAct"].', 
						'.$key["cls9TAct"].', '.$key["cls10MAct"].', '.$key["cls10FAct"].', '.$key["cls10TAct"].', '.$key["cls11MAct"].', 
						'.$key["cls11FAct"].', '.$key["cls11TAct"].', '.$key["cls12MAct"].', '.$key["cls12FAct"].', '.$key["cls12TAct"].', 
						'.$key["stuTotMAct"].', '.$key["stuTotFAct"].', '.$key["stuTotAct"].', '.$key["clsKgMReg"].', '.$key["clsKgFReg"].', 
						'.$key["clsKgTReg"].', '.$key["cls1MReg"].', '.$key["cls1FReg"].', '.$key["cls1TReg"].', '.$key["cls2MReg"].', '.$key["cls2FReg"].', 
						'.$key["cls2TReg"].', '.$key["cls3MReg"].', '.$key["cls3FReg"].', '.$key["cls3TReg"].', '.$key["cls4MReg"].', '.$key["cls4FReg"].', 
						'.$key["cls4TReg"].', '.$key["cls5MReg"].', '.$key["cls5FReg"].', 
						'.$key["cls5TReg"].', '.$key["cls6MReg"].', '.$key["cls6FReg"].', '.$key["cls6TReg"].', '.$key["cls7MReg"].', '.$key["cls7FReg"].', 
						'.$key["cls7TReg"].', '.$key["cls8MReg"].', '.$key["cls8FReg"].', '.$key["cls8TReg"].', '.$key["cls9MReg"].', '.$key["cls9FReg"].', 
						'.$key["cls9TReg"].', '.$key["cls10MReg"].', '.$key["cls10FReg"].', '.$key["cls10TReg"].', '.$key["cls11MReg"].', 
						'.$key["cls11FReg"].', '.$key["cls11TReg"].', '.$key["cls12MReg"].', '.$key["cls12FReg"].', '.$key["cls12TReg"].', 
						'.$key["stuTotMReg"].', '.$key["stuTotFReg"].', '.$key["stuTotReg"].',
						'.$key["mTeacher"].', '.$key["fTeacher"].', '.$key["tTeacher"].', '.$key["mUnTrained"].', '.$key["fUnTrained"].', 
						'.$key["tUnTrained"].', '.$key["mSupport"].', '.$key["fSupport"].', '.$key["tSupport"].',
						\''.$key["images"].'\',\''.$key["imagesUrl"].'\',\''.$key["drawing"].'\',
						\''.$key["the_geom"].'\');';
		}
		$table .= ' CREATE UNIQUE INDEX '.$table_name.'_idx ON '.$table_name.' ("school_id");
					CREATE INDEX '.$table_name.'_the_geom_gist ON '.$table_name.' USING GIST (the_geom);';
		
		//echo $table;
		
		$tableQuery = pg_query($pgsql_conn, $table);
		
		if(!$tableQuery){
			//pg_free_result($tableQuery);
			$tableResult = Array();
			$tableResult["id"] = Array();
			$tableResult["id"] = $tehsil_id;
			$tableResult["data"] = Array();
			$tableResult["data"] = "false";
			$tableResult["table"] = Array();
			$tableResult["table"] = $table_name.'_error';
			$tableResult["district"] = Array();
			$tableResult["district"] = $district;
			
			return $tableResult;
		}else{
			pg_free_result($tableQuery);
			$tableResult = Array();
			$tableResult["id"] = Array();
			$tableResult["id"] = $tehsil_id;			
			$tableResult["data"] = "true";
			$tableResult["table"] = Array();
			$tableResult["table"] = $table_name;
			$tableResult["district"] = Array();
			$tableResult["district"] = $district;
			
			return $tableResult;
		}
		
	}else{
		//send back status
		$tableResult = Array();
		$tableResult["id"] = Array();
		$tableResult["id"] = $tehsil_id;		
		$tableResult["data"] = Array();
		$tableResult["data"] = "false";			
		$tableResult["table"] = Array();
		$tableResult["table"] = $table_name;
		$tableResult["district"] = Array();
		$tableResult["district"] = "false";	
		
		return $tableResult;
	}
}
?>
