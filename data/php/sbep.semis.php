<?php

// Include database connection settings
include('../../../../../dbconnect/pgsql/sbep.schoolassessments.connect.php');

//comments more so

$i = 0;
$semisCode = $_GET['semisCode'];

if($semisCode){
	$pgsql_conn = openSchools();

	if($pgsql_conn){	

		//get all tehsils
		$tehsilSql = "select st.surveyteam_teamnumber, s.school_semiscode, s.school_schoolname, t.tehsil_tehsilname, sa.schoolassessment_lon, sa.schoolassessment_lat
						from schoolassessment sa, school s, surveyteam st, tehsil t
						where sa.schoolnameschoolassessment_id = s.school_id
						and s.tehsilnameschool_id = t.tehsil_id
						and s.school_semiscode::text like '".$semisCode."%'
						and sa.surveyteamschoolassessment_id = st.surveyteam_id
						order by s.school_semiscode ASC";
		$tehsilQuery = pg_query($pgsql_conn, $tehsilSql);
		if($tehsilQuery){
			echo "<html>";
			echo "<head>";
			echo "</head>";
			echo "<body>";
			echo "<div align='center'>";
			echo "<table border='2'>";
			echo "<tr align='center'>";
				echo "<td width='100px'>";
					echo "<b>Team</b>";
				echo "</td>";
				echo "<td width='150px'>";
					echo "<b>Semis Code</b>";
				echo "</td>";			
				echo "<td width='350px'>";
					echo "<b>School Name</b>";
				echo "</td>";
				echo "<td width='150px'>";
					echo "<b>Tehsil</b>";
				echo "</td>";
				echo "<td width='150px'>";
					echo "<b>Union Council</b>";
				echo "</td>";		
				echo "<td width='200px'>";
					echo "<b>Village</b>";
				echo "</td>";		
				echo "<td width='150px'>";
					echo "<b>Lon</b>";
				echo "</td>";				
				echo "<td width='150px'>";
					echo "<b>Lat</b>";
				echo "</td>";	
			echo "</tr>";
			while($tehsilRow = pg_fetch_array($tehsilQuery)){
				$i++;
				echo "<tr align='center'>";
					echo "<td width='100px'>";
						echo $tehsilRow[0];
					echo "</td>";
					echo "<td width='150px'>";
						echo $tehsilRow[1];
					echo "</td>";
					echo "<td width='350px'align='left'>";
						echo $tehsilRow[2];
					echo "</td>";
					echo "<td width='150px'align='left'>";
						echo $tehsilRow[3];
					echo "</td>";
					
					$ucSql = "select uc.unioncouncil_unioncouncilname
								from school s,unioncouncil uc
								where s.unioncouncilnameschool_id = uc.unioncouncil_id
								and s.school_semiscode = ".$tehsilRow[1]."
								order by s.school_semiscode ASC";
								
					$ucQuery = pg_query($pgsql_conn, $ucSql);
					if($ucQuery){
						$ucRow = pg_fetch_array($ucQuery);
						
						if (count($ucRow) > 1){
							$uc = $ucRow[0];
						}else{
							$uc = "<b>No UC!</b>";
						}
					}else{
						$uc = "No UC!";
					}
					echo "<td width='150px'align='left'>";
						echo $uc;
					echo "</td>";					
					
					$vSql = "select v.village_villagename
								from school s, village v
								where s.villagenameschool_id = v.village_id
								and s.school_semiscode = ".$tehsilRow[1]."
								order by s.school_semiscode ASC";
								
					$vQuery = pg_query($pgsql_conn, $vSql);
					if($vQuery){
						$vRow = pg_fetch_array($vQuery);	
						if(count($vRow)>1){
							$village = $vRow[0];
						}else{
							$village = "<b>No Village!</b>";
						}
					}else{
						$village = "No Village!";
					}
					echo "<td width='200px'align='left'>";
						echo $village;
					echo "</td>";					
					
					echo "<td width='150px'>";
						echo $tehsilRow[4];
					echo "</td>";					
					echo "<td width='150px'>";
						echo $tehsilRow[5];
					echo "</td>";
				echo "</tr>";
			}
			echo "</table>";
			echo "</div>";
			echo "</body>";
			echo "<html>";			
			//database session can be closed
			closeSchools($pgsql_conn);
		}else{
			echo "Database Query Error!";
		}
		
	}else{
		echo "Database Connection Error!";
	}

}else{

echo "Enter Semis Code";

}


?>
