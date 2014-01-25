<?php

set_time_limit(0);
ignore_user_abort(1);

function getSql($taluka_id){

	$sql = '
		select sa.schoolassessment_id as "schoolA_id", sa.schoolassessment_semiscode as "semisCode", sa.schoolassessment_surveydate as "surveyDate", sa.schoolassessment_schoolname as "schName",

			case 
				when sa.schoolassessment_schooltype = \'1\' then \'Primary\'
				when sa.schoolassessment_schooltype = \'2\' then \'Middle\'
				when sa.schoolassessment_schooltype = \'3\' then \'Elementary\'
				when sa.schoolassessment_schooltype = \'4\' then \'High\'
				when sa.schoolassessment_schooltype = \'5\' then \'High Secondary\'
			end as "schType",

		case 
			when sa.schoolassessment_schoolname ILIKE \'GB%\' then \'Boys\'
			when sa.schoolassessment_schoolname ILIKE \'GG%\' then \'Girls\'
			else \'Mixed\'
		end as "schGender",					

			d.district_districtname as "district",
			t.tehsil_tehsilname as "tehsil",
			u.unioncouncil_unioncouncilname as "unionCouncil",			
			v.village_villagename as "village",
			
			case
				when sa.schoolassessment_schoollanguage = \'1\' then \'English\'
				when sa.schoolassessment_schoollanguage = \'2\' then \'Sindhi\'
				when sa.schoolassessment_schoollanguage = \'3\' then \'Urdu\'
			end as "schLang",
			case 
				when sa.schoolassessment_floodaffected = \'1\' then \'Yes\'
				else \'No\'
			end as "floodAffected",
			case 
				when sa.schoolassessment_ghostschool = \'1\' then \'Yes\'
				else \'No\'
			end as "ghostSchool",
			case 
				when sa.schoolassessment_smcfunctional = \'1\' then \'Yes\'
				else \'No\'
			end as "smcFunctional",
			case 
				when sa.schoolassessment_merged = \'1\' then \'Yes\'
				else \'No\'
			end as "schMerged",	
			case
				when sa.schoolassessment_merged = \'1\' then \'Yes\'
				else \'n.a\'
			end as "schMergedId",	
			case 
				when sa.schoolassessment_induskachaarea = \'1\' then \'Yes\'
				else \'No\'
			end as "schIndusKacha",	
			
			/*General Information*/
			case 
				when sa.schoolassessment_orgsupport = \'1\' then \'Yes\'
				else \'No\'
			end as "OrgSupport",
			case 
				when sa.schoolassessment_usaidsupport = \'1\' then \'Yes\'
				else \'No\'
			end as "usaidSupport",
			case
				when schoolassessment_sizeofcompoundlength is not null and schoolassessment_sizeofcompoundwidth is not null
					then schoolassessment_sizeofcompoundlength * schoolassessment_sizeofcompoundwidth
				else \'0\'
			end as "compoundSi",			
			case
				when sa.schoolassessment_undevelopedland = \'1\' then \'Yes\'
				else \'No\'
			end as "landWithin",
			case
				when sa.schoolassessment_undevelopedland = \'1\' 
					then sa.schoolassessment_sizeofundevelopedlength * sa.schoolassessment_sizeofundevelopedwidth
				else 0
			end as "landWiSize",
			case
				when sa.schoolclassroomschoolassessment_id is not null 
					then sa.schoolclassroomschoolassessment_id
				else \'No\'
			end as "classRmSize",
			
			case
				when sa.schoolassessment_directsurrounding = \'1\' then \'Yes\'
				else \'No\'
			end as "landSurround",
			case
				when sa.schoolassessment_directsurrounding = \'1\' 
					then sa.directsurroundingdescschoolassessment_id
				else \'No\'
			end as "landSuSize",			
			case
				when sa.schoolassessment_averagetraveltime is not null 
					then sa.schoolassessment_averagetraveltime
				else 0
			end as "travelTime",
			case
				when sa.schoolassessment_averagetraveltimedesc = \'1\'
					then \'Walking\'
				when sa.schoolassessment_averagetraveltimedesc = \'2\'
					then \'Vehicle\'
				else \'n.a\'
			end as "travelDesc",
			
			/*Damage Assessment*/
			case
				when sa.schoolassessment_buildingdamage = \'0\'
					then \'No Damage\'			
				when sa.schoolassessment_buildingdamage = \'1\'
					then \'Partially Damaged\'
				when sa.schoolassessment_buildingdamage = \'2\'
					then \'Fully Damaged\'					
				else \'n.a\'			
			end as "bDamage",
			case
				when sa.schoolassessment_damagepercent = \'1\' 
					then \'1-5\'
				when sa.schoolassessment_damagepercent = \'2\' 
					then \'6-20\'
				when sa.schoolassessment_damagepercent = \'3\' 
					then \'21-35\'
				when sa.schoolassessment_damagepercent = \'4\' 
					then \'>35\'
				else \'0\'
			end as "bDaPercent",	
			case
				when sa.schoolassessment_buildingcondition = \'0\' 
					then \'No Damage\'
				when sa.schoolassessment_buildingcondition = \'1\' 
					then \'Very Poor\'	
				when sa.schoolassessment_buildingcondition = \'2\' 
					then \'Poor\'
				when sa.schoolassessment_buildingcondition = \'3\' 
					then \'Fair\'
				when sa.schoolassessment_buildingcondition = \'4\' 
					then \'Good\'
				when sa.schoolassessment_buildingcondition = \'5\' 
					then \'Excellent\'		
				else \'n.a\'
			end as "bCondition",			

			/*DRR Assessment*/
			case
				when sa.schoolassessment_landslides = \'1\'
					then \'Yes\'
				else \'No\'			
			end as "landslides",
			case
				when sa.schoolassessment_nearstreamorriver = \'1\'
					then \'Yes\'
				else \'No\'
			end as "nearRiver",
			case
				when sa.schoolassessment_streamhazard != \'\'
					then \'Yes\'
				else \'No\'
			end as "riverHazard",
			case
				when sa.schoolassessment_otherhazard = \'1\'
					then \'Yes\'
				else \'No\'
			end as "hazardProne",
			case
				when sa.schoolassessment_industrialpolution = \'1\'
					then \'Yes\'
				else \'No\'
			end as "indPolution",			
			
			/* Conclusion */
			case
				when sa.schoolassessment_sharingwall = \'1\' or sa.schoolassessment_sharingboundary = \'1\' then \'Yes\'
				else \'No\'
			end as "schMergeCa",
			case
				when sa.schoolassessment_sharingwall = \'1\' or sa.schoolassessment_sharingboundary = \'1\' then \'Yes\'
				else \'n.a\'
			end as "schMergeId",
			case
				when sa.schoolassessment_closerthan500m = \'1\' then \'Yes\'
				else \'No\'
			end as "schConsCa",
			case
				when sa.schoolassessment_closerthan500m = \'1\' then \'Yes\'
				else \'n.a\'
			end as "schConsIds",
			case
				when sa.schoolassessment_reconstruction = \'1\' then \'Yes\'
				else \'No\'
			end as "schReconCa",
			case
				when sa.schoolassessment_rehabilitation = \'1\' then \'Yes\'
				else \'No\'
			end as "schRehabCa",
			case
				when sa.schoolassessment_relocation = \'1\' then \'Yes\'
				else \'No\'
			end as "schRelocCa",
			case
				when sa.schoolassessment_schoolshelter = \'1\'
					then \'Yes\'
				when sa.schoolassessment_schoolshelter = \'0\'
					then \'No\'					
				else \'n.a\'					
			end as "shelterless",
			
			sa.the_geom as "sch100m",
			sa.the_geom as "sch500m",
			sa.the_geom as "sch1000m",
			sa.the_geom as "sch1500m",			
			
			case
				when sa.schoolassessment_comments is null then \'n.a\'
				else sa.schoolassessment_comments
			end as "comments",
			
			
			/*Actual children*/
			/*Grade KG*/
			case
				when 
					sda.schooldemoactual_malekg is null then 0 
				else
					sda.schooldemoactual_malekg 
			end as "clsKgMAct",
			case
				when
					sda.schooldemoactual_femalekg is null then 0
				else
					sda.schooldemoactual_femalekg
			end as "clsKgFAct",
			case
				when (sum(sda.schooldemoactual_malekg) is null) AND (sum(sda.schooldemoactual_femalekg) is null)
					then 0
				when (sum(sda.schooldemoactual_malekg) is not null) AND (sum(sda.schooldemoactual_femalekg) is null)
					then sum(sda.schooldemoactual_malekg)
				when (sum(sda.schooldemoactual_malekg) is null) AND (sum(sda.schooldemoactual_femalekg) is not null)
					then sum(sda.schooldemoactual_femalekg)
				when (sum(sda.schooldemoactual_malekg) is not null) AND (sum(sda.schooldemoactual_femalekg) is not null)
					then sum(sda.schooldemoactual_malekg)+sum(sda.schooldemoactual_femalekg)
			end as "clsKgTAct",	
			
			/*Grade 1*/
			case
				when 
					sda.schooldemoactual_male1 is null then 0 
				else
					sda.schooldemoactual_male1 
			end as "cls1MAct",
			case
				when
					sda.schooldemoactual_female1 is null then 0
				else
					sda.schooldemoactual_female1
			end as "cls1FAct",
			case
				when (sum(sda.schooldemoactual_male1) is null) AND (sum(sda.schooldemoactual_female1) is null)
					then 0
				when (sum(sda.schooldemoactual_male1) is not null) AND (sum(sda.schooldemoactual_female1) is null)
					then sum(sda.schooldemoactual_male1)
				when (sum(sda.schooldemoactual_male1) is null) AND (sum(sda.schooldemoactual_female1) is not null)
					then sum(sda.schooldemoactual_female1)
				when (sum(sda.schooldemoactual_male1) is not null) AND (sum(sda.schooldemoactual_female1) is not null)
					then sum(sda.schooldemoactual_male1)+sum(sda.schooldemoactual_female1)
			end as "cls1TAct",	
			
			/*Grade 2*/
			case
				when 
					sda.schooldemoactual_male2 is null then 0 
				else
					sda.schooldemoactual_male2 
			end as "cls2MAct",
			case
				when
					sda.schooldemoactual_female2 is null then 0
				else
					sda.schooldemoactual_female2
			end as "cls2FAct",
			case
				when (sum(sda.schooldemoactual_male2) is null) AND (sum(sda.schooldemoactual_female2) is null)
					then 0
				when (sum(sda.schooldemoactual_male2) is not null) AND (sum(sda.schooldemoactual_female2) is null)
					then sum(sda.schooldemoactual_male2)
				when (sum(sda.schooldemoactual_male2) is null) AND (sum(sda.schooldemoactual_female2) is not null)
					then sum(sda.schooldemoactual_female2)
				when (sum(sda.schooldemoactual_male2) is not null) AND (sum(sda.schooldemoactual_female2) is not null)
					then sum(sda.schooldemoactual_male2)+sum(sda.schooldemoactual_female2)
			end as "cls2TAct",		

			/*Grade 3*/
			case
				when 
					sda.schooldemoactual_male3 is null then 0 
				else
					sda.schooldemoactual_male3 
			end as "cls3MAct",
			case
				when
					sda.schooldemoactual_female3 is null then 0
				else
					sda.schooldemoactual_female3
			end as "cls3FAct",
			case
				when (sum(sda.schooldemoactual_male3) is null) AND (sum(sda.schooldemoactual_female3) is null)
					then 0
				when (sum(sda.schooldemoactual_male3) is not null) AND (sum(sda.schooldemoactual_female3) is null)
					then sum(sda.schooldemoactual_male3)
				when (sum(sda.schooldemoactual_male3) is null) AND (sum(sda.schooldemoactual_female3) is not null)
					then sum(sda.schooldemoactual_female3)
				when (sum(sda.schooldemoactual_male3) is not null) AND (sum(sda.schooldemoactual_female3) is not null)
					then sum(sda.schooldemoactual_male3)+sum(sda.schooldemoactual_female3)
			end as "cls3TAct",

			/*Grade 4*/
			case
				when 
					sda.schooldemoactual_male4 is null then 0 
				else
					sda.schooldemoactual_male4 
			end as "cls4MAct",
			case
				when
					sda.schooldemoactual_female4 is null then 0
				else
					sda.schooldemoactual_female4
			end as "cls4FAct",
			case
				when (sum(sda.schooldemoactual_male4) is null) AND (sum(sda.schooldemoactual_female4) is null)
					then 0
				when (sum(sda.schooldemoactual_male4) is not null) AND (sum(sda.schooldemoactual_female4) is null)
					then sum(sda.schooldemoactual_male4)
				when (sum(sda.schooldemoactual_male4) is null) AND (sum(sda.schooldemoactual_female4) is not null)
					then sum(sda.schooldemoactual_female4)
				when (sum(sda.schooldemoactual_male4) is not null) AND (sum(sda.schooldemoactual_female4) is not null)
					then sum(sda.schooldemoactual_male4)+sum(sda.schooldemoactual_female4)
			end as "cls4TAct",

			/*Grade 5*/
			case
				when 
					sda.schooldemoactual_male5 is null then 0 
				else
					sda.schooldemoactual_male5 
			end as "cls5MAct",
			case
				when
					sda.schooldemoactual_female5 is null then 0
				else
					sda.schooldemoactual_female5
			end as "cls5FAct",
			case
				when (sum(sda.schooldemoactual_male5) is null) AND (sum(sda.schooldemoactual_female5) is null)
					then 0
				when (sum(sda.schooldemoactual_male5) is not null) AND (sum(sda.schooldemoactual_female5) is null)
					then sum(sda.schooldemoactual_male5)
				when (sum(sda.schooldemoactual_male5) is null) AND (sum(sda.schooldemoactual_female5) is not null)
					then sum(sda.schooldemoactual_female5)
				when (sum(sda.schooldemoactual_male5) is not null) AND (sum(sda.schooldemoactual_female5) is not null)
					then sum(sda.schooldemoactual_male5)+sum(sda.schooldemoactual_female5)
			end as "cls5TAct",

			/*Grade 6*/
			case
				when 
					sda.schooldemoactual_male6 is null then 0 
				else
					sda.schooldemoactual_male6 
			end as "cls6MAct",
			case
				when
					sda.schooldemoactual_female6 is null then 0
				else
					sda.schooldemoactual_female6
			end as "cls6FAct",
			case
				when (sum(sda.schooldemoactual_male6) is null) AND (sum(sda.schooldemoactual_female6) is null)
					then 0
				when (sum(sda.schooldemoactual_male6) is not null) AND (sum(sda.schooldemoactual_female6) is null)
					then sum(sda.schooldemoactual_male6)
				when (sum(sda.schooldemoactual_male6) is null) AND (sum(sda.schooldemoactual_female6) is not null)
					then sum(sda.schooldemoactual_female6)
				when (sum(sda.schooldemoactual_male6) is not null) AND (sum(sda.schooldemoactual_female6) is not null)
					then sum(sda.schooldemoactual_male6)+sum(sda.schooldemoactual_female6)
			end as "cls6TAct",

			/*Grade 7*/
			case
				when 
					sda.schooldemoactual_male7 is null then 0 
				else
					sda.schooldemoactual_male7 
			end as "cls7MAct",
			case
				when
					sda.schooldemoactual_female7 is null then 0
				else
					sda.schooldemoactual_female7
			end as "cls7FAct",
			case
				when (sum(sda.schooldemoactual_male7) is null) AND (sum(sda.schooldemoactual_female7) is null)
					then 0
				when (sum(sda.schooldemoactual_male7) is not null) AND (sum(sda.schooldemoactual_female7) is null)
					then sum(sda.schooldemoactual_male7)
				when (sum(sda.schooldemoactual_male7) is null) AND (sum(sda.schooldemoactual_female7) is not null)
					then sum(sda.schooldemoactual_female7)
				when (sum(sda.schooldemoactual_male7) is not null) AND (sum(sda.schooldemoactual_female7) is not null)
					then sum(sda.schooldemoactual_male7)+sum(sda.schooldemoactual_female7)
			end as "cls7TAct",

			/*Grade 8*/
			case
				when 
					sda.schooldemoactual_male8 is null then 0 
				else
					sda.schooldemoactual_male8 
			end as "cls8MAct",
			case
				when
					sda.schooldemoactual_female8 is null then 0
				else
					sda.schooldemoactual_female8
			end as "cls8FAct",
			case
				when (sum(sda.schooldemoactual_male8) is null) AND (sum(sda.schooldemoactual_female8) is null)
					then 0
				when (sum(sda.schooldemoactual_male8) is not null) AND (sum(sda.schooldemoactual_female8) is null)
					then sum(sda.schooldemoactual_male8)
				when (sum(sda.schooldemoactual_male8) is null) AND (sum(sda.schooldemoactual_female8) is not null)
					then sum(sda.schooldemoactual_female8)
				when (sum(sda.schooldemoactual_male8) is not null) AND (sum(sda.schooldemoactual_female8) is not null)
					then sum(sda.schooldemoactual_male8)+sum(sda.schooldemoactual_female8)
			end as "cls8TAct",

			/*Grade 9*/
			case
				when 
					sda.schooldemoactual_male9 is null then 0 
				else
					sda.schooldemoactual_male9 
			end as "cls9MAct",
			case
				when
					sda.schooldemoactual_female9 is null then 0
				else
					sda.schooldemoactual_female9
			end as "cls9FAct",
			case
				when (sum(sda.schooldemoactual_male9) is null) AND (sum(sda.schooldemoactual_female9) is null)
					then 0
				when (sum(sda.schooldemoactual_male9) is not null) AND (sum(sda.schooldemoactual_female9) is null)
					then sum(sda.schooldemoactual_male9)
				when (sum(sda.schooldemoactual_male9) is null) AND (sum(sda.schooldemoactual_female9) is not null)
					then sum(sda.schooldemoactual_female9)
				when (sum(sda.schooldemoactual_male9) is not null) AND (sum(sda.schooldemoactual_female9) is not null)
					then sum(sda.schooldemoactual_male9)+sum(sda.schooldemoactual_female9)
			end as "cls9TAct",
			
			/*Grade 10*/
			case
				when 
					sda.schooldemoactual_male10 is null then 0 
				else
					sda.schooldemoactual_male10 
			end as "cls10MAct",
			case
				when
					sda.schooldemoactual_female10 is null then 0
				else
					sda.schooldemoactual_female10
			end as "cls10FAct",
			case
				when (sum(sda.schooldemoactual_male10) is null) AND (sum(sda.schooldemoactual_female10) is null)
					then 0
				when (sum(sda.schooldemoactual_male10) is not null) AND (sum(sda.schooldemoactual_female10) is null)
					then sum(sda.schooldemoactual_male10)
				when (sum(sda.schooldemoactual_male10) is null) AND (sum(sda.schooldemoactual_female10) is not null)
					then sum(sda.schooldemoactual_female10)
				when (sum(sda.schooldemoactual_male10) is not null) AND (sum(sda.schooldemoactual_female10) is not null)
					then sum(sda.schooldemoactual_male10)+sum(sda.schooldemoactual_female10)
			end as "cls10TAct",

			/*Grade 11*/
			case
				when 
					sda.schooldemoactual_male11 is null then 0 
				else
					sda.schooldemoactual_male11 
			end as "cls11MAct",
			case
				when
					sda.schooldemoactual_female11 is null then 0
				else
					sda.schooldemoactual_female11
			end as "cls11FAct",
			case
				when (sum(sda.schooldemoactual_male11) is null) AND (sum(sda.schooldemoactual_female11) is null)
					then 0
				when (sum(sda.schooldemoactual_male11) is not null) AND (sum(sda.schooldemoactual_female11) is null)
					then sum(sda.schooldemoactual_male11)
				when (sum(sda.schooldemoactual_male11) is null) AND (sum(sda.schooldemoactual_female11) is not null)
					then sum(sda.schooldemoactual_female11)
				when (sum(sda.schooldemoactual_male11) is not null) AND (sum(sda.schooldemoactual_female11) is not null)
					then sum(sda.schooldemoactual_male11)+sum(sda.schooldemoactual_female11)
			end as "cls11TAct",

			/*Grade 12*/
			case
				when 
					sda.schooldemoactual_male12 is null then 0 
				else
					sda.schooldemoactual_male12 
			end as "cls12MAct",
			case
				when
					sda.schooldemoactual_female12 is null then 0
				else
					sda.schooldemoactual_female12
			end as "cls12FAct",
			case
				when (sum(sda.schooldemoactual_male12) is null) AND (sum(sda.schooldemoactual_female12) is null)
					then 0
				when (sum(sda.schooldemoactual_male12) is not null) AND (sum(sda.schooldemoactual_female12) is null)
					then sum(sda.schooldemoactual_male12)
				when (sum(sda.schooldemoactual_male12) is null) AND (sum(sda.schooldemoactual_female12) is not null)
					then sum(sda.schooldemoactual_female12)
				when (sum(sda.schooldemoactual_male12) is not null) AND (sum(sda.schooldemoactual_female12) is not null)
					then sum(sda.schooldemoactual_male12)+sum(sda.schooldemoactual_female12)
			end as "cls12TAct",	
			
			/*Total Male Students*/
			sum(case
				when 
					(sda.schooldemoactual_maleKg) is null then 0
				else
					(sda.schooldemoactual_maleKg)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male1) is null then 0
				else
					(sda.schooldemoactual_male1)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male2) is null then 0
				else
					(sda.schooldemoactual_male2)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male3) is null then 0
				else
					(sda.schooldemoactual_male3)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male4) is null then 0
				else
					(sda.schooldemoactual_male4)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male5) is null then 0
				else
					(sda.schooldemoactual_male5)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male6) is null then 0
				else
					(sda.schooldemoactual_male6)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male7) is null then 0
				else
					(sda.schooldemoactual_male7)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male8) is null then 0
				else
					(sda.schooldemoactual_male8)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male9) is null then 0
				else
					(sda.schooldemoactual_male9)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male10) is null then 0
				else
					(sda.schooldemoactual_male10)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male11) is null then 0
				else
					(sda.schooldemoactual_male11)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male12) is null then 0
				else
					(sda.schooldemoactual_male12)
			end) as "stuTotMAct",
			
			/*Total Female Students*/
			sum(case
				when 
					(sda.schooldemoactual_femaleKg) is null then 0
				else
					(sda.schooldemoactual_femaleKg)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female1) is null then 0
				else
					(sda.schooldemoactual_female1)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female2) is null then 0
				else
					(sda.schooldemoactual_female2)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female3) is null then 0
				else
					(sda.schooldemoactual_female3)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female4) is null then 0
				else
					(sda.schooldemoactual_female4)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female5) is null then 0
				else
					(sda.schooldemoactual_female5)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female6) is null then 0
				else
					(sda.schooldemoactual_female6)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female7) is null then 0
				else
					(sda.schooldemoactual_female7)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female8) is null then 0
				else
					(sda.schooldemoactual_female8)
			end) 
			+sum(case
				when 
					(sda.schooldemoactual_female9) is null then 0
				else
					(sda.schooldemoactual_female9)
			end) 
			+sum(case
				when 
					(sda.schooldemoactual_female10) is null then 0
				else
					(sda.schooldemoactual_female10)
			end) 
			+sum(case
				when 
					(sda.schooldemoactual_female11) is null then 0
				else
					(sda.schooldemoactual_female11)
			end) 
			+sum(case
				when 
					(sda.schooldemoactual_female12) is null then 0
				else
					(sda.schooldemoactual_female12)
			end) as "stuTotFAct",
			
			/*Total Actual Students*/
			sum(case
				when 
					(sda.schooldemoactual_maleKg) is null then 0
				else
					(sda.schooldemoactual_maleKg)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male1) is null then 0
				else
					(sda.schooldemoactual_male1)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male2) is null then 0
				else
					(sda.schooldemoactual_male2)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male3) is null then 0
				else
					(sda.schooldemoactual_male3)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male4) is null then 0
				else
					(sda.schooldemoactual_male4)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male5) is null then 0
				else
					(sda.schooldemoactual_male5)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male6) is null then 0
				else
					(sda.schooldemoactual_male6)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male7) is null then 0
				else
					(sda.schooldemoactual_male7)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male8) is null then 0
				else
					(sda.schooldemoactual_male8)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male9) is null then 0
				else
					(sda.schooldemoactual_male9)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male10) is null then 0
				else
					(sda.schooldemoactual_male10)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male11) is null then 0
				else
					(sda.schooldemoactual_male11)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_male12) is null then 0
				else
					(sda.schooldemoactual_male12)
			end)	
			+sum(case
				when 
					(sda.schooldemoactual_femaleKg) is null then 0
				else
					(sda.schooldemoactual_femaleKg)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female1) is null then 0
				else
					(sda.schooldemoactual_female1)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female2) is null then 0
				else
					(sda.schooldemoactual_female2)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female3) is null then 0
				else
					(sda.schooldemoactual_female3)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female4) is null then 0
				else
					(sda.schooldemoactual_female4)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female5) is null then 0
				else
					(sda.schooldemoactual_female5)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female6) is null then 0
				else
					(sda.schooldemoactual_female6)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female7) is null then 0
				else
					(sda.schooldemoactual_female7)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female8) is null then 0
				else
					(sda.schooldemoactual_female8)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female9) is null then 0
				else
					(sda.schooldemoactual_female9)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female10) is null then 0
				else
					(sda.schooldemoactual_female10)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female11) is null then 0
				else
					(sda.schooldemoactual_female11)
			end)
			+sum(case
				when 
					(sda.schooldemoactual_female12) is null then 0
				else
					(sda.schooldemoactual_female12)
			end) as "stuTotAct",




			/*Grade KG*/
			case
				when 
					sdr.schooldemoregistered_malekg is null then 0 
				else
					sdr.schooldemoregistered_malekg 
			end as "clsKgMReg",
			case
				when
					sdr.schooldemoregistered_femalekg is null then 0
				else
					sdr.schooldemoregistered_femalekg
			end as "clsKgFReg",
			case
				when (sum(sdr.schooldemoregistered_malekg) is null) AND (sum(sdr.schooldemoregistered_femalekg) is null)
					then 0
				when (sum(sdr.schooldemoregistered_malekg) is not null) AND (sum(sdr.schooldemoregistered_femalekg) is null)
					then sum(sdr.schooldemoregistered_malekg)
				when (sum(sdr.schooldemoregistered_malekg) is null) AND (sum(sdr.schooldemoregistered_femalekg) is not null)
					then sum(sdr.schooldemoregistered_femalekg)
				when (sum(sdr.schooldemoregistered_malekg) is not null) AND (sum(sdr.schooldemoregistered_femalekg) is not null)
					then sum(sdr.schooldemoregistered_malekg)+sum(sdr.schooldemoregistered_femalekg)
			end as "clsKgTReg",	
			
			/*Grade 1*/
			case
				when 
					sdr.schooldemoregistered_male1 is null then 0 
				else
					sdr.schooldemoregistered_male1 
			end as "cls1MReg",
			case
				when
					sdr.schooldemoregistered_female1 is null then 0
				else
					sdr.schooldemoregistered_female1
			end as "cls1FReg",
			case
				when (sum(sdr.schooldemoregistered_male1) is null) AND (sum(sdr.schooldemoregistered_female1) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male1) is not null) AND (sum(sdr.schooldemoregistered_female1) is null)
					then sum(sdr.schooldemoregistered_male1)
				when (sum(sdr.schooldemoregistered_male1) is null) AND (sum(sdr.schooldemoregistered_female1) is not null)
					then sum(sdr.schooldemoregistered_female1)
				when (sum(sdr.schooldemoregistered_male1) is not null) AND (sum(sdr.schooldemoregistered_female1) is not null)
					then sum(sdr.schooldemoregistered_male1)+sum(sdr.schooldemoregistered_female1)
			end as "cls1TReg",	
			
			/*Grade 2*/
			case
				when 
					sdr.schooldemoregistered_male2 is null then 0 
				else
					sdr.schooldemoregistered_male2 
			end as "cls2MReg",
			case
				when
					sdr.schooldemoregistered_female2 is null then 0
				else
					sdr.schooldemoregistered_female2
			end as "cls2FReg",
			case
				when (sum(sdr.schooldemoregistered_male2) is null) AND (sum(sdr.schooldemoregistered_female2) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male2) is not null) AND (sum(sdr.schooldemoregistered_female2) is null)
					then sum(sdr.schooldemoregistered_male2)
				when (sum(sdr.schooldemoregistered_male2) is null) AND (sum(sdr.schooldemoregistered_female2) is not null)
					then sum(sdr.schooldemoregistered_female2)
				when (sum(sdr.schooldemoregistered_male2) is not null) AND (sum(sdr.schooldemoregistered_female2) is not null)
					then sum(sdr.schooldemoregistered_male2)+sum(sdr.schooldemoregistered_female2)
			end as "cls2TReg",		

			/*Grade 3*/
			case
				when 
					sdr.schooldemoregistered_male3 is null then 0 
				else
					sdr.schooldemoregistered_male3 
			end as "cls3MReg",
			case
				when
					sdr.schooldemoregistered_female3 is null then 0
				else
					sdr.schooldemoregistered_female3
			end as "cls3FReg",
			case
				when (sum(sdr.schooldemoregistered_male3) is null) AND (sum(sdr.schooldemoregistered_female3) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male3) is not null) AND (sum(sdr.schooldemoregistered_female3) is null)
					then sum(sdr.schooldemoregistered_male3)
				when (sum(sdr.schooldemoregistered_male3) is null) AND (sum(sdr.schooldemoregistered_female3) is not null)
					then sum(sdr.schooldemoregistered_female3)
				when (sum(sdr.schooldemoregistered_male3) is not null) AND (sum(sdr.schooldemoregistered_female3) is not null)
					then sum(sdr.schooldemoregistered_male3)+sum(sdr.schooldemoregistered_female3)
			end as "cls3TReg",

			/*Grade 4*/
			case
				when 
					sdr.schooldemoregistered_male4 is null then 0 
				else
					sdr.schooldemoregistered_male4 
			end as "cls4MReg",
			case
				when
					sdr.schooldemoregistered_female4 is null then 0
				else
					sdr.schooldemoregistered_female4
			end as "cls4FReg",
			case
				when (sum(sdr.schooldemoregistered_male4) is null) AND (sum(sdr.schooldemoregistered_female4) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male4) is not null) AND (sum(sdr.schooldemoregistered_female4) is null)
					then sum(sdr.schooldemoregistered_male4)
				when (sum(sdr.schooldemoregistered_male4) is null) AND (sum(sdr.schooldemoregistered_female4) is not null)
					then sum(sdr.schooldemoregistered_female4)
				when (sum(sdr.schooldemoregistered_male4) is not null) AND (sum(sdr.schooldemoregistered_female4) is not null)
					then sum(sdr.schooldemoregistered_male4)+sum(sdr.schooldemoregistered_female4)
			end as "cls4TReg",

			/*Grade 5*/
			case
				when 
					sdr.schooldemoregistered_male5 is null then 0 
				else
					sdr.schooldemoregistered_male5 
			end as "cls5MReg",
			case
				when
					sdr.schooldemoregistered_female5 is null then 0
				else
					sdr.schooldemoregistered_female5
			end as "cls5FReg",
			case
				when (sum(sdr.schooldemoregistered_male5) is null) AND (sum(sdr.schooldemoregistered_female5) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male5) is not null) AND (sum(sdr.schooldemoregistered_female5) is null)
					then sum(sdr.schooldemoregistered_male5)
				when (sum(sdr.schooldemoregistered_male5) is null) AND (sum(sdr.schooldemoregistered_female5) is not null)
					then sum(sdr.schooldemoregistered_female5)
				when (sum(sdr.schooldemoregistered_male5) is not null) AND (sum(sdr.schooldemoregistered_female5) is not null)
					then sum(sdr.schooldemoregistered_male5)+sum(sdr.schooldemoregistered_female5)
			end as "cls5TReg",

			/*Grade 6*/
			case
				when 
					sdr.schooldemoregistered_male6 is null then 0 
				else
					sdr.schooldemoregistered_male6 
			end as "cls6MReg",
			case
				when
					sdr.schooldemoregistered_female6 is null then 0
				else
					sdr.schooldemoregistered_female6
			end as "cls6FReg",
			case
				when (sum(sdr.schooldemoregistered_male6) is null) AND (sum(sdr.schooldemoregistered_female6) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male6) is not null) AND (sum(sdr.schooldemoregistered_female6) is null)
					then sum(sdr.schooldemoregistered_male6)
				when (sum(sdr.schooldemoregistered_male6) is null) AND (sum(sdr.schooldemoregistered_female6) is not null)
					then sum(sdr.schooldemoregistered_female6)
				when (sum(sdr.schooldemoregistered_male6) is not null) AND (sum(sdr.schooldemoregistered_female6) is not null)
					then sum(sdr.schooldemoregistered_male6)+sum(sdr.schooldemoregistered_female6)
			end as "cls6TReg",

			/*Grade 7*/
			case
				when 
					sdr.schooldemoregistered_male7 is null then 0 
				else
					sdr.schooldemoregistered_male7 
			end as "cls7MReg",
			case
				when
					sdr.schooldemoregistered_female7 is null then 0
				else
					sdr.schooldemoregistered_female7
			end as "cls7FReg",
			case
				when (sum(sdr.schooldemoregistered_male7) is null) AND (sum(sdr.schooldemoregistered_female7) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male7) is not null) AND (sum(sdr.schooldemoregistered_female7) is null)
					then sum(sdr.schooldemoregistered_male7)
				when (sum(sdr.schooldemoregistered_male7) is null) AND (sum(sdr.schooldemoregistered_female7) is not null)
					then sum(sdr.schooldemoregistered_female7)
				when (sum(sdr.schooldemoregistered_male7) is not null) AND (sum(sdr.schooldemoregistered_female7) is not null)
					then sum(sdr.schooldemoregistered_male7)+sum(sdr.schooldemoregistered_female7)
			end as "cls7TReg",
			
			/*Grade 8*/
			case
				when 
					sdr.schooldemoregistered_male8 is null then 0 
				else
					sdr.schooldemoregistered_male8 
			end as "cls8MReg",
			case
				when
					sdr.schooldemoregistered_female8 is null then 0
				else
					sdr.schooldemoregistered_female8
			end as "cls8FReg",
			case
				when (sum(sdr.schooldemoregistered_male8) is null) AND (sum(sdr.schooldemoregistered_female8) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male8) is not null) AND (sum(sdr.schooldemoregistered_female8) is null)
					then sum(sdr.schooldemoregistered_male8)
				when (sum(sdr.schooldemoregistered_male8) is null) AND (sum(sdr.schooldemoregistered_female8) is not null)
					then sum(sdr.schooldemoregistered_female8)
				when (sum(sdr.schooldemoregistered_male8) is not null) AND (sum(sdr.schooldemoregistered_female8) is not null)
					then sum(sdr.schooldemoregistered_male8)+sum(sdr.schooldemoregistered_female8)
			end as "cls8TReg",	

			/*Grade 9*/
			case
				when 
					sdr.schooldemoregistered_male9 is null then 0 
				else
					sdr.schooldemoregistered_male9 
			end as "cls9MReg",
			case
				when
					sdr.schooldemoregistered_female9 is null then 0
				else
					sdr.schooldemoregistered_female9
			end as "cls9FReg",
			case
				when (sum(sdr.schooldemoregistered_male9) is null) AND (sum(sdr.schooldemoregistered_female9) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male9) is not null) AND (sum(sdr.schooldemoregistered_female9) is null)
					then sum(sdr.schooldemoregistered_male9)
				when (sum(sdr.schooldemoregistered_male9) is null) AND (sum(sdr.schooldemoregistered_female9) is not null)
					then sum(sdr.schooldemoregistered_female9)
				when (sum(sdr.schooldemoregistered_male9) is not null) AND (sum(sdr.schooldemoregistered_female9) is not null)
					then sum(sdr.schooldemoregistered_male9)+sum(sdr.schooldemoregistered_female9)
			end as "cls9TReg",	
			
			/*Grade 10*/
			case
				when 
					sdr.schooldemoregistered_male10 is null then 0 
				else
					sdr.schooldemoregistered_male10 
			end as "cls10MReg",
			case
				when
					sdr.schooldemoregistered_female10 is null then 0
				else
					sdr.schooldemoregistered_female10
			end as "cls10FReg",
			case
				when (sum(sdr.schooldemoregistered_male10) is null) AND (sum(sdr.schooldemoregistered_female10) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male10) is not null) AND (sum(sdr.schooldemoregistered_female10) is null)
					then sum(sdr.schooldemoregistered_male10)
				when (sum(sdr.schooldemoregistered_male10) is null) AND (sum(sdr.schooldemoregistered_female10) is not null)
					then sum(sdr.schooldemoregistered_female10)
				when (sum(sdr.schooldemoregistered_male10) is not null) AND (sum(sdr.schooldemoregistered_female10) is not null)
					then sum(sdr.schooldemoregistered_male10)+sum(sdr.schooldemoregistered_female10)
			end as "cls10TReg",	

			/*Grade 11*/
			case
				when 
					sdr.schooldemoregistered_male11 is null then 0 
				else
					sdr.schooldemoregistered_male11 
			end as "cls11MReg",
			case
				when
					sdr.schooldemoregistered_female11 is null then 0
				else
					sdr.schooldemoregistered_female11
			end as "cls11FReg",
			case
				when (sum(sdr.schooldemoregistered_male11) is null) AND (sum(sdr.schooldemoregistered_female11) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male11) is not null) AND (sum(sdr.schooldemoregistered_female11) is null)
					then sum(sdr.schooldemoregistered_male11)
				when (sum(sdr.schooldemoregistered_male11) is null) AND (sum(sdr.schooldemoregistered_female11) is not null)
					then sum(sdr.schooldemoregistered_female11)
				when (sum(sdr.schooldemoregistered_male11) is not null) AND (sum(sdr.schooldemoregistered_female11) is not null)
					then sum(sdr.schooldemoregistered_male11)+sum(sdr.schooldemoregistered_female11)
			end as "cls11TReg",	

			/*Grade 12*/
			case
				when 
					sdr.schooldemoregistered_male12 is null then 0 
				else
					sdr.schooldemoregistered_male12 
			end as "cls12MReg",
			case
				when
					sdr.schooldemoregistered_female12 is null then 0
				else
					sdr.schooldemoregistered_female12
			end as "cls12FReg",
			case
				when (sum(sdr.schooldemoregistered_male12) is null) AND (sum(sdr.schooldemoregistered_female12) is null)
					then 0
				when (sum(sdr.schooldemoregistered_male12) is not null) AND (sum(sdr.schooldemoregistered_female12) is null)
					then sum(sdr.schooldemoregistered_male12)
				when (sum(sdr.schooldemoregistered_male12) is null) AND (sum(sdr.schooldemoregistered_female12) is not null)
					then sum(sdr.schooldemoregistered_female12)
				when (sum(sdr.schooldemoregistered_male12) is not null) AND (sum(sdr.schooldemoregistered_female12) is not null)
					then sum(sdr.schooldemoregistered_male12)+sum(sdr.schooldemoregistered_female12)
			end as "cls12TReg",
			
			/*Total Male Registered Students*/
			sum(case
				when 
					(sdr.schooldemoregistered_maleKg) is null then 0
				else
					(sdr.schooldemoregistered_maleKg)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male1) is null then 0
				else
					(sdr.schooldemoregistered_male1)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male2) is null then 0
				else
					(sdr.schooldemoregistered_male2)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male3) is null then 0
				else
					(sdr.schooldemoregistered_male3)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male4) is null then 0
				else
					(sdr.schooldemoregistered_male4)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male5) is null then 0
				else
					(sdr.schooldemoregistered_male5)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male6) is null then 0
				else
					(sdr.schooldemoregistered_male6)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male7) is null then 0
				else
					(sdr.schooldemoregistered_male7)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male8) is null then 0
				else
					(sdr.schooldemoregistered_male8)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male9) is null then 0
				else
					(sdr.schooldemoregistered_male9)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male10) is null then 0
				else
					(sdr.schooldemoregistered_male10)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male11) is null then 0
				else
					(sdr.schooldemoregistered_male11)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male12) is null then 0
				else
					(sdr.schooldemoregistered_male12)
			end) as "stuTotMReg",
			
			/*Total Female Students*/
			sum(case
				when 
					(sdr.schooldemoregistered_femaleKg) is null then 0
				else
					(sdr.schooldemoregistered_femaleKg)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female1) is null then 0
				else
					(sdr.schooldemoregistered_female1)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female2) is null then 0
				else
					(sdr.schooldemoregistered_female2)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female3) is null then 0
				else
					(sdr.schooldemoregistered_female3)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female4) is null then 0
				else
					(sdr.schooldemoregistered_female4)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female5) is null then 0
				else
					(sdr.schooldemoregistered_female5)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female6) is null then 0
				else
					(sdr.schooldemoregistered_female6)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female7) is null then 0
				else
					(sdr.schooldemoregistered_female7)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female8) is null then 0
				else
					(sdr.schooldemoregistered_female8)
			end) 
			+sum(case
				when 
					(sdr.schooldemoregistered_female9) is null then 0
				else
					(sdr.schooldemoregistered_female9)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female10) is null then 0
				else
					(sdr.schooldemoregistered_female10)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female11) is null then 0
				else
					(sdr.schooldemoregistered_female11)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female12) is null then 0
				else
					(sdr.schooldemoregistered_female12)
			end) as "stuTotFReg",
			
			/*Total Registered Students*/
			sum(case
				when 
					(sdr.schooldemoregistered_maleKg) is null then 0
				else
					(sdr.schooldemoregistered_maleKg)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male1) is null then 0
				else
					(sdr.schooldemoregistered_male1)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male2) is null then 0
				else
					(sdr.schooldemoregistered_male2)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male3) is null then 0
				else
					(sdr.schooldemoregistered_male3)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male4) is null then 0
				else
					(sdr.schooldemoregistered_male4)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male5) is null then 0
				else
					(sdr.schooldemoregistered_male5)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male6) is null then 0
				else
					(sdr.schooldemoregistered_male6)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male7) is null then 0
				else
					(sdr.schooldemoregistered_male7)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male8) is null then 0
				else
					(sdr.schooldemoregistered_male8)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male9) is null then 0
				else
					(sdr.schooldemoregistered_male9)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male10) is null then 0
				else
					(sdr.schooldemoregistered_male10)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male11) is null then 0
				else
					(sdr.schooldemoregistered_male11)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_male12) is null then 0
				else
					(sdr.schooldemoregistered_male12)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_femaleKg) is null then 0
				else
					(sdr.schooldemoregistered_femaleKg)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female1) is null then 0
				else
					(sdr.schooldemoregistered_female1)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female2) is null then 0
				else
					(sdr.schooldemoregistered_female2)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female3) is null then 0
				else
					(sdr.schooldemoregistered_female3)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female4) is null then 0
				else
					(sdr.schooldemoregistered_female4)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female5) is null then 0
				else
					(sdr.schooldemoregistered_female5)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female6) is null then 0
				else
					(sdr.schooldemoregistered_female6)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female7) is null then 0
				else
					(sdr.schooldemoregistered_female7)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female8) is null then 0
				else
					(sdr.schooldemoregistered_female8)
			end) 
			+sum(case
				when 
					(sdr.schooldemoregistered_female9) is null then 0
				else
					(sdr.schooldemoregistered_female9)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female10) is null then 0
				else
					(sdr.schooldemoregistered_female10)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female11) is null then 0
				else
					(sdr.schooldemoregistered_female11)
			end)
			+sum(case
				when 
					(sdr.schooldemoregistered_female12) is null then 0
				else
					(sdr.schooldemoregistered_female12)
			end) as "stuTotReg",			
			
			/*Trained Teacher*/
			case
				when	
					sdr.schooldemoregistered_maletrained is null then 0
				else
					sdr.schooldemoregistered_maletrained
			end as "mTeacher",
			case
				when	
					sdr.schooldemoregistered_femaletrained is null then 0
				else
					sdr.schooldemoregistered_femaletrained
			end as "fTeacher",
			case
				when (sum(sdr.schooldemoregistered_maletrained) is null) AND (sum(sdr.schooldemoregistered_femaletrained) is null)
					then 0
				when (sum(sdr.schooldemoregistered_maletrained) is not null) AND (sum(sdr.schooldemoregistered_femaletrained) is null)
					then sum(sdr.schooldemoregistered_maletrained)
				when (sum(sdr.schooldemoregistered_maletrained) is null) AND (sum(sdr.schooldemoregistered_femaletrained) is not null)
					then sum(sdr.schooldemoregistered_femaletrained)
				when (sum(sdr.schooldemoregistered_maletrained) is not null) AND (sum(sdr.schooldemoregistered_femaletrained) is not null)
					then sum(sdr.schooldemoregistered_maletrained)+sum(sdr.schooldemoregistered_femaletrained) 
			end as "tTeacher",
			
			/*Untrained Teacher*/
			case
				when	
					sdr.schooldemoregistered_maleuntrained is null then 0
				else
					sdr.schooldemoregistered_maleuntrained
			end as "mUnTrained",
			case
				when	
					sdr.schooldemoregistered_femaleuntrained is null then 0
				else
					sdr.schooldemoregistered_femaleuntrained
			end as "fUnTrained",
			case
				when (sum(sdr.schooldemoregistered_maleuntrained) is null) AND (sum(sdr.schooldemoregistered_femaleuntrained) is null)
					then 0
				when (sum(sdr.schooldemoregistered_maleuntrained) is not null) AND (sum(sdr.schooldemoregistered_femaleuntrained) is null)
					then sum(sdr.schooldemoregistered_maleuntrained)
				when (sum(sdr.schooldemoregistered_maleuntrained) is null) AND (sum(sdr.schooldemoregistered_femaleuntrained) is not null)
					then sum(sdr.schooldemoregistered_femaleuntrained)
				when (sum(sdr.schooldemoregistered_maleuntrained) is not null) AND (sum(sdr.schooldemoregistered_femaleuntrained) is not null)
					then sum(sdr.schooldemoregistered_maleuntrained)+sum(sdr.schooldemoregistered_femaleuntrained) 
			end as "tUnTrained",
			
			/*Support Staff*/
			case
				when	
					sdr.schooldemoregistered_malesupportstaff is null then 0
				else
					sdr.schooldemoregistered_malesupportstaff
			end as "mSupport",
			case
				when	
					sdr.schooldemoregistered_femalesupportstaff is null then 0
				else
					sdr.schooldemoregistered_femalesupportstaff
			end as "fSupport",
			case
				when (sum(sdr.schooldemoregistered_malesupportstaff) is null) AND (sum(sdr.schooldemoregistered_femalesupportstaff) is null)
					then 0
				when (sum(sdr.schooldemoregistered_malesupportstaff) is not null) AND (sum(sdr.schooldemoregistered_femalesupportstaff) is null)
					then sum(sdr.schooldemoregistered_malesupportstaff)
				when (sum(sdr.schooldemoregistered_malesupportstaff) is null) AND (sum(sdr.schooldemoregistered_femalesupportstaff) is not null)
					then sum(sdr.schooldemoregistered_femalesupportstaff)
				when (sum(sdr.schooldemoregistered_malesupportstaff) is not null) AND (sum(sdr.schooldemoregistered_femalesupportstaff) is not null)
					then sum(sdr.schooldemoregistered_malesupportstaff)+sum(sdr.schooldemoregistered_femalesupportstaff) 
			end as "tSupport",	
			
			sa.the_geom as "the_geom"

		from schoolassessment sa, schooldemoactual sda, schooldemoregistered sdr, district d, tehsil t, unioncouncil u, village v
		where sda.schooldemoactual_id = sa.schooldemographicsschoolassessment_id
			and sdr.schooldemoregistered_id = sa.schoolregistrationschoolassessment_id


		and d.district_id = sa.districtnameschoolassessment_id
		and t.tehsil_id = sa.tehsilnameschoolassessment_id
		and u.unioncouncil_id = sa.unioncouncilnameschoolassessment_id
		and v.village_id = sa.villagenameschoolassessment_id ';
		if($taluka_id != 'district'){
			$sql .= 'and t.tehsil_id = \''.$taluka_id.'\'';
		}
		$sql .= 'group by "schoolA_id", "semisCode", "surveyDate", "schName", "schType", "schGender",
			"schLang", "floodAffected", "ghostSchool", "smcFunctional",
			"schMerged", "schMergedId","schIndusKacha", "landSuSize", "schMergeId","schConsIds",
			"landWithin", "landWiSize", "classRmSize", "landSurround", "travelTime", "travelDesc",
			"bDamage", "bDaPercent", "bCondition",
			"landslides", "nearRiver", "riverHazard", "hazardProne", "indPolution",
			"schReconCa","schRehabCa","schRelocCa",
			"schMergeCa", "schConsCa", "shelterless", 
			"sch100m", "sch500m", "sch1000m","sch1500m",
			"comments",
			"district", "tehsil", "unionCouncil", "village", 
			"OrgSupport", "usaidSupport", "compoundSi",
			"clsKgMAct","clsKgFAct",
			"cls1MAct","cls1FAct",
			"cls2MAct","cls2FAct",
			"cls3MAct","cls3FAct",
			"cls4MAct","cls4FAct",
			"cls5MAct","cls5FAct",
			"cls6MAct","cls6FAct",
			"cls7MAct","cls7FAct",
			"cls8MAct","cls8FAct",
			"cls9MAct","cls9FAct",
			"cls10MAct","cls10FAct",
			"cls11MAct","cls11FAct",
			"cls12MAct","cls12FAct",

			"clsKgMReg","clsKgFReg", 
			"cls1MReg","cls1FReg",
			"cls2MReg","cls2FReg",
			"cls3MReg","cls3FReg",
			"cls4MReg","cls4FReg",
			"cls5MReg","cls5FReg",
			"cls6MReg","cls6FReg",
			"cls7MReg","cls7FReg",
			"cls8MReg","cls8FReg",
			"cls9MReg","cls9FReg",
			"cls10MReg","cls10FReg",
			"cls11MReg","cls11FReg",
			"cls12MReg","cls12FReg",
			"mTeacher","fTeacher",
			"mUnTrained","fUnTrained",
			"mSupport","fSupport",

			"the_geom"';
	
	return $sql;
}
?>