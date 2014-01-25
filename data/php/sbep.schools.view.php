<?php

set_time_limit(0);
ignore_user_abort(1);

function createView($pgsql_conn,$table_name){

	//$table_name = strtolower("schools_".str_replace(" ","_",$table_name));
	
	$view = '
		drop VIEW IF EXISTS '.$table_name.'_ind_adm;
		drop VIEW IF EXISTS '.$table_name.'_ind_bld;
		drop VIEW IF EXISTS '.$table_name.'_ind_drr;
		drop VIEW IF EXISTS '.$table_name.'_ind_enr;
		drop VIEW IF EXISTS '.$table_name.'_ind_sch;

		--adm
		CREATE OR REPLACE VIEW '.$table_name.'_ind_adm AS
		select (select school_id from '.$table_name.' limit 1) as "id",
		(select count(*) from '.$table_name.' where "smcFunctional" = \'Yes\') as "smcFuncYes",
		(select count(*) from '.$table_name.' where "smcFunctional" = \'No\') as "smcFuncNo",
		sum("classRmSize")::int as "clsRmSize",
		sum("mTeacher") as "mTeacher",
		sum("fTeacher") as "fTeacher",
		sum("tTeacher") as "tTeacher",
		sum("mUnTrained") as "mUnTrained",
		sum("fUnTrained") as "fUnTrained",
		sum("tUnTrained") as "tUnTrained",
		sum("mSupport") as "mSupport",
		sum("fSupport") as "fSupport",
		sum("tSupport") as "tSupport",
		sum ("stuTotReg") as "totalStudents",
		count(*) as "totalSchools"
		from '.$table_name.'
		limit 1;

		--bld
		CREATE OR REPLACE VIEW '.$table_name.'_ind_bld AS
		select (select school_id from '.$table_name.' limit 1) as "id",
		(select count(*) from '.$table_name.' where "bCondition" = \'Excellent\') as "excellent",
		(select count(*) from '.$table_name.' where "bCondition" = \'Good\') as "good",
		(select count(*) from '.$table_name.' where "bCondition" = \'Fair\') as "fair",
		(select count(*) from '.$table_name.' where "bCondition" = \'Poor\') as "poor",
		(select count(*) from '.$table_name.' where "bCondition" = \'Very Poor\') as "veryPoor",
		(select count(*) from '.$table_name.' where "bCondition" = \'n.a\') as "other",
		count(*) as "totalSchools"
		from '.$table_name.'
		limit 1;

		--drr
		CREATE OR REPLACE VIEW '.$table_name.'_ind_drr AS
		select (select school_id from '.$table_name.' limit 1) as "id",
		(select count(*) from '.$table_name.' where "floodAffected" = \'Yes\') as "floodAffected",
		(select count(*) from '.$table_name.' where "schIndusKacha" = \'Yes\') as "schIndusKacha",
		(select count(*) from '.$table_name.' where "riverHazard" = \'Yes\') as "riverHazard",
		(select count(*) from '.$table_name.' where "landslides" = \'Yes\') as "landSlides",
		(select count(*) from '.$table_name.' where "indPolution" = \'Yes\') as "indPolution",
		(select count(*) from '.$table_name.' where "hazardProne" = \'Yes\') as "other",
		count(*) as "totalSchools"
		from '.$table_name.';	

		--enr
		CREATE OR REPLACE VIEW '.$table_name.'_ind_enr AS
		select (select school_id from '.$table_name.' limit 1) as "id",
		sum("clsKgMReg") as "clsKgMReg",
		sum("clsKgMAct") as "clsKgMAct",
		sum("clsKgFReg") as "clsKgFReg",
		sum("clsKgFAct") as "clsKgFAct",
		sum("clsKgTReg") as "clsKgTReg",
		sum("clsKgTAct") as "clsKgTAct",

		sum("cls1MReg") as "cls1MReg",
		sum("cls1MAct") as "cls1MAct",
		sum("cls1FReg") as "cls1FReg",
		sum("cls1FAct") as "cls1FAct",
		sum("cls1TReg") as "cls1TReg",
		sum("cls1TAct") as "cls1TAct",

		sum("cls2MReg") as "cls2MReg",
		sum("cls2MAct") as "cls2MAct",
		sum("cls2FReg") as "cls2FReg",
		sum("cls2FAct") as "cls2FAct",
		sum("cls2TReg") as "cls2TReg",
		sum("cls2TAct") as "cls2TAct",

		sum("cls3MReg") as "cls3MReg",
		sum("cls3MAct") as "cls3MAct",
		sum("cls3FReg") as "cls3FReg",
		sum("cls3FAct") as "cls3FAct",
		sum("cls3TReg") as "cls3TReg",
		sum("cls3TAct") as "cls3TAct",

		sum("cls4MReg") as "cls4MReg",
		sum("cls4MAct") as "cls4MAct",
		sum("cls4FReg") as "cls4FReg",
		sum("cls4FAct") as "cls4FAct",
		sum("cls4TReg") as "cls4TReg",
		sum("cls4TAct") as "cls4TAct",

		sum("cls5MReg") as "cls5MReg",
		sum("cls5MAct") as "cls5MAct",
		sum("cls5FReg") as "cls5FReg",
		sum("cls5FAct") as "cls5FAct",
		sum("cls5TReg") as "cls5TReg",
		sum("cls5TAct") as "cls5TAct",

		sum("cls6MReg") as "cls6MReg",
		sum("cls6MAct") as "cls6MAct",
		sum("cls6FReg") as "cls6FReg",
		sum("cls6FAct") as "cls6FAct",
		sum("cls6TReg") as "cls6TReg",
		sum("cls6TAct") as "cls6TAct",

		sum("cls7MReg") as "cls7MReg",
		sum("cls7MAct") as "cls7MAct",
		sum("cls7FReg") as "cls7FReg",
		sum("cls7FAct") as "cls7FAct",
		sum("cls7TReg") as "cls7TReg",
		sum("cls7TAct") as "cls7TAct",

		sum("cls8MReg") as "cls8MReg",
		sum("cls8MAct") as "cls8MAct",
		sum("cls8FReg") as "cls8FReg",
		sum("cls8FAct") as "cls8FAct",
		sum("cls8TReg") as "cls8TReg",
		sum("cls8TAct") as "cls8TAct",

		sum("cls9MReg") as "cls9MReg",
		sum("cls9MAct") as "cls9MAct",
		sum("cls9FReg") as "cls9FReg",
		sum("cls9FAct") as "cls9FAct",
		sum("cls9TReg") as "cls9TReg",
		sum("cls9TAct") as "cls9TAct",

		sum("cls10MReg") as "cls10MReg",
		sum("cls10MAct") as "cls10MAct",
		sum("cls10FReg") as "cls10FReg",
		sum("cls10FAct") as "cls10FAct",
		sum("cls10TReg") as "cls10TReg",
		sum("cls10TAct") as "cls10TAct",

		sum("cls11MReg") as "cls11MReg",
		sum("cls11MAct") as "cls11MAct",
		sum("cls11FReg") as "cls11FReg",
		sum("cls11FAct") as "cls11FAct",
		sum("cls11TReg") as "cls11TReg",
		sum("cls11TAct") as "cls11TAct",

		sum("cls12MReg") as "cls12MReg",
		sum("cls12MAct") as "cls12MAct",
		sum("cls12FReg") as "cls12FReg",
		sum("cls12FAct") as "cls12FAct",
		sum("cls12TReg") as "cls12TReg",
		sum("cls12TAct") as "cls12TAct",

		 sum("stuTotMReg") as "stuTotMReg",
		 sum("stuTotMAct") as "stuTotMAct",
		 sum("stuTotFReg") as "stuTotFReg",
		 sum("stuTotFAct") as "stuTotFAct",
		 sum("stuTotReg") as "stuTotReg",
		 sum("stuTotAct") as "stuTotAct",
		 
		 sum("clsKgMReg") as "groupKgMale",
		 sum("clsKgFReg") as "groupKgFemale",
		 sum("clsKgTReg") as "groupKgTotal",

		 sum("cls1MReg")+sum("cls2MReg")+sum("cls3MReg")+sum("cls4MReg")+sum("cls5MReg") as "group1_5Male",
		 sum("cls1FReg")+sum("cls2FReg")+sum("cls3FReg")+sum("cls4FReg")+sum("cls5FReg") as "group1_5Female",
		 sum("cls1TReg")+sum("cls2TReg")+sum("cls3TReg")+sum("cls4TReg")+sum("cls5TReg") as "group1_5Total",
		 
		 sum("cls6MReg")+sum("cls7MReg")+sum("cls8MReg") as "group6_8Male",
		 sum("cls6FReg")+sum("cls7FReg")+sum("cls8FReg") as "group6_8Female",
		 sum("cls6TReg")+sum("cls7TReg")+sum("cls8TReg") as "group6_8Total",
		 
		  sum("cls9MReg")+sum("cls10MReg") as "group9_10Male",
		 sum("cls9FReg")+sum("cls10FReg") as "group9_10Female",
		 sum("cls9TReg")+sum("cls10TReg") as "group9_10Total",

		  sum("cls11MReg")+sum("cls12MReg") as "group11_12Male",
		 sum("cls11FReg")+sum("cls12FReg") as "group11_12Female",
		 sum("cls11TReg")+sum("cls12TReg") as "group11_12Total",

		 
		count(*) as "totalSchools"
		from '.$table_name.'
		limit 1;

		--sch
		CREATE OR REPLACE VIEW '.$table_name.'_ind_sch AS
		select (select school_id from '.$table_name.' limit 1) as "id",
		(select count(*) from '.$table_name.' where "schType" = \'Primary\') as "primarySchools",
		(select count(*) from '.$table_name.' where "schType" = \'Middle\') as "middleSchools",
		(select count(*) from '.$table_name.' where "schType" = \'Elementary\') as "elementarySchools",
		(select count(*) from '.$table_name.' where "schType" = \'High\') as "highSchools",
		(select count(*) from '.$table_name.' where "schType" = \'High Secondary\') as "highSecondarySchools",
		(select count(*) from '.$table_name.' where "ghostSchool" = \'Yes\') as "ghostSchools",
		(select count(*) from '.$table_name.' where "shelterless" = \'Yes\') as "shelterless",
		(select count(*) from '.$table_name.' where "schType" = \'\') as "other",
		count(*) as "totalSchools"
		from '.$table_name.';
	';
	
	//echo $view;
	
	$viewQuery = pg_query($pgsql_conn, $view);
	
	if(!$viewQuery){
		//pg_free_result($tableQuery);
		return 0;
	}else{
		pg_free_result($viewQuery);
		return 1;
	}
}
?>
