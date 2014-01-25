<?php

set_time_limit(0);
ignore_user_abort(1);

$status = true;
$district = $_GET["district"]; 

//make temp filder
mkdir('/var/sbep/data/'.$district.'/binaries/tmp/', 0700);
$bin = '/var/sbep/data/'.$district.'/binaries/';
$dir = '/var/sbep/data/'.$district.'/binaries/tmp/';

	//unzip folders
	$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($bin));
	while($it->valid()) {
		if (!$it->isDot()) {
			$file = glob($it->key());
			$fname = basename($file[0]);
			if(strstr($fname, "zip")){
				$zip = new ZipArchive; 
				$res = $zip->open($file[0]);
				if ($res === TRUE) {
					$zip->extractTo($dir);
					$zip->close();				
				} else {
					$status = false;
					echo 'Unzip was not successful<br />';
				}
			}
		}
		$it->next();
	}	
	if($status){
		echo 'Unzip was successful<br />';
		echo 'Processing files...<br />';
	}				
	
	//recurse new files to copy across
	$newit = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
	while($newit->valid()) {
		if (!$newit->isDot()) {
			$newfolder = $newit->getSubPath();
			$newfile = glob($newit->key());
			$newfname = $bin.''.basename($newfile[0]);
			echo $newfolder.'<br />';
			echo $newfile[0].'<br />';
			echo $newfname.'<br /><br />';
			//copy
			//copy($newfile[0],$newfname);	
			unlink($newfile[0]);
		}
		$newit->next();
	}
	delTree($dir);
	echo 'Complete!';

function delTree($dir) {
	$files = array_diff(scandir($dir), array('.','..'));
	foreach ($files as $file) {
		(is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
	}
	return rmdir($dir);
} 

?>