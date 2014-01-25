
var tableArray = [
	{"id":"G_13abb43","data":"true","table":"schools_dadu","district":"Dadu", "taluka":"Dadu"},
	{"id":"G_13aba8b","data":"true","table":"schools_johi","district":"Dadu", "taluka":"Johi"},
	{"id":"G_13ad2f1","data":"true","table":"schools_khairpur_nathan_shah","district":"Dadu", "taluka":"Khairpur Nathan Shah"},
	{"id":"G_13a619a","data":"true","table":"schools_mehar","district":"Dadu", "taluka":"Mehar"},
	{"id":"G_13cdbbb","data":"true","table":"schools_ghari_khairo","district":"Jacobabad", "taluka":"Ghari Khairo"},
	{"id":"G_13b3960","data":"true","table":"schools_jacobabad","district":"Jacobabad", "taluka":"Jacobabad"},
	{"id":"G_13bb31f","data":"true","table":"schools_thull","district":"Jacobabad", "taluka":"Thull"},
	{"id":"G_13be802","data":"true","table":"schools_bin_qasim_town","district":"Karachi", "taluka":"Bin Qasim Town"},
	{"id":"G_13bb8b3","data":"true","table":"schools_gadap_town","district":"Karachi", "taluka":"Gadap Town"},
	{"id":"G_13bfad3","data":"true","table":"schools_keamari_town","district":"Karachi", "taluka":"Keamari Town"},
	{"id":"G_13b2bbd","data":"true","table":"schools_lyari_town","district":"Karachi", "taluka":"Lyari Town"},
	{"id":"G_13b564c","data":"true","table":"schools_orangi_town","district":"Karachi", "taluka":"Orangi Town"},			  
	{"id":"G_13a7c0b","data":"true","table":"schools_kandh_kot","district":"Kashmore", "taluka":"Kandh Kot"},
	{"id":"G_13a71f5","data":"true","table":"schools_kashmore","district":"Kashmore", "taluka":"Kashmore"},
	{"id":"G_13b6a25","data":"true","table":"schools_tangwani","district":"Kashmore", "taluka":"Tangwani"},
	{"id":"G_138144a","data":"true","table":"schools_faiz_ganj","district":"Khairpur", "taluka":"Faiz Ganj"},
	{"id":"G_1393615","data":"true","table":"schools_gambat","district":"Khairpur", "taluka":"Gambat"},
	{"id":"G_1379c15","data":"true","table":"schools_khairpur","district":"Khairpur", "taluka":"Khairpur"},
	{"id":"G_13793dd","data":"true","table":"schools_kingri","district":"Khairpur", "taluka":"Kingri"},
	{"id":"G_138ec64","data":"true","table":"schools_kotdiji","district":"Khairpur", "taluka":"Kotdiji"},
	{"id":"G_138cf9d","data":"true","table":"schools_mirwah","district":"Khairpur", "taluka":"Mirwah"},
	{"id":"G_139beae","data":"true","table":"schools_nara","district":"Khairpur", "taluka":"Nara"},
	{"id":"G_139df3f","data":"true","table":"schools_sobho_dero","district":"Khairpur", "taluka":"Sobho Dero"},
	{"id":"G_139aefd","data":"true","table":"schools_bakrani","district":"Larkana", "taluka":"Bakrani"},
	{"id":"G_1395521","data":"true","table":"schools_dokri","district":"Larkana", "taluka":"Dokri"},
	{"id":"G_138cf00","data":"true","table":"schools_larkana","district":"Larkana", "taluka":"Larkana"},
	{"id":"G_139e37","data":"true","table":"schools_rato_dero","district":"Larkana", "taluka":"Rato Dero"},
	{"id":"G_13aa903","data":"true","table":"schools_kambar","district":"Qambar Shahdadkot", "taluka":"Kambar"},
	{"id":"G_139fd3a","data":"true","table":"schools_miro_khan","district":"Qambar Shahdadkot", "taluka":"Miro Khan"},
	{"id":"G_13afd99","data":"true","table":"schools_nasir_abad","district":"Qambar Shahdadkot", "taluka":"Nasir Abad"},
	{"id":"G_1392de5","data":"true","table":"schools_qubo_saeed_khan","district":"Qambar Shahdadkot", "taluka":"Qubo Saeed Khan"},
	{"id":"G_1398747","data":"true","table":"schools_shahdadkot","district":"Qambar Shahdadkot", "taluka":"Shahdadkot"},
	{"id":"G_1399ad7","data":"true","table":"schools_sijawal_junejo","district":"Qambar Shahdadkot", "taluka":"Sijawal Junejo"},
	{"id":"G_13914","data":"true","table":"schools_warrah","district":"Qambar Shahdadkot", "taluka":"Warrah"},
	{"id":"G_1399c1b","data":"true","table":"schools_new_sukkur","district":"Sukkur", "taluka":"New Sukkur"},
	{"id":"G_139c85f","data":"true","table":"schools_pano_aqil","district":"Sukkur", "taluka":"Pano Aqil"},
	{"id":"G_1396e5c","data":"true","table":"schools_rohri","district":"Sukkur", "taluka":"Rohri"},
	{"id":"G_13921fc","data":"true","table":"schools_salehpat","district":"Sukkur", "taluka":"Salephat"},
	{"id":"G_13929dd","data":"true","table":"schools_sukkur","district":"Sukkur", "taluka":"Sukkur"}
];

function capitalize(str) {
    strVal = '';
    str = str.split(' ');
    for (var chr = 0; chr < str.length; chr++) {
        strVal += str[chr].substring(0, 1).toUpperCase() + str[chr].substring(1, str[chr].length) + ' '
    }
    return strVal
}

function refreshData(district,taluka_id,taluka_name,table_name){

	var messiBoxBegin = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="../images/al_loading.gif"/></td><td>   Refreshing data...</td></tr></table></div>', {modal: true, closeButton:false, width: '200px'});	
	
		if (navigator.appName == 'Microsoft Internet Explorer'){
   			// Use Microsoft XDR
    			var xdr = new XDomainRequest();
    			xdr.open('GET', 'php/sbep.schools.php?district='+district+'&taluka_id='+taluka_id+'&taluka_name='+taluka_name+'&table_name='+table_name);
    			xdr.onload = function () {
 				var JSON = $.parseJSON(xdr.responseText);
				if (JSON == null || typeof (JSON) == 'undefined'){
			        	JSON = $.parseJSON(data.firstChild.textContent);
				}
				messiBoxBegin.hide();
				new Messi('Refresh success!',{modal:false,autoclose:3000,width:'275px'});
			};
			xdr.onprogress = function(){ };
			xdr.ontimeout = function(){ };
    			xdr.onerror = function () {
				messiBoxBegin.hide();
				new Messi('Refresh fail!',{modal:true,width:'200px'});
	 		};
			xdr.send();
		} else {
			//netscape
			$.ajax({type: 'GET', url: 'php/sbep.schools.php?district='+district+'&taluka_id='+taluka_id+'&taluka_name='+taluka_name+'&table_name='+table_name, async: false, dataType: 'json', success: function (json) {
				if(json['success']){
					messiBoxBegin.hide();
					new Messi('Refresh success!',{modal:false,autoclose:3000,width:'200px'});
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				messiBoxBegin.hide();
				new Messi('Refresh fail! Contact administrator',{modal:true,width:'275px'});
  			}
			});
		}
}

function getDistrictHtml(district){
	var html ="</br>";
		html +="</br>";
		html +="<h1 style='font-size:16px;'>by Taluka;</h1>";
		html +="</br>";
		html +="<div>";
	if(district == 'District'){
		
		html += "<table border='0'><tr><td width='180px'><li>District</li></td>";
		html += "<td><a href='javascript:void(0)' onclick='refreshData(\"District\",\"district\", \"district\", \"schools_district\");return false;'><img title='Refresh District data' src='../images/refresh.gif' border='0'/></td>";
		html += "<td><a title='Download District Shapefile' href='http://210.56.8.110:8989/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sbep:schools_district_assessment&maxFeatures=5000&outputFormat=SHAPE-ZIP'>Shapefile</a>, </td>";
		html += "<td><a title='Download District CSV' href='http://210.56.8.110:8989/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sbep:schools_district_assessment&maxFeatures=5000&outputFormat=csv'>CSV</a>, </td>";
		html += "<td><a title='Download District KML for Google Earth' href='http://210.56.8.110:8989/geoserver/wms/kml?layers=sbep:schools_district_assessment'>KML</a></td></tr></table>";
		
	}else{
		for(i=0;i<tableArray.length;i++){
			if((tableArray[i]['data'] == "true") && (tableArray[i]['district'] == district)){
				var tableName = tableArray[i]['table'].replace('schools_','');
				tableName = tableName.replace('_',' ');
				tableName = capitalize(tableName.replace('_',' '));	

				//downloads
				html += "<table border='0'><tr><td width='180px'><li>"+tableName+"</li></td>";
				html += "<td><a href='javascript:void(0)' onclick='refreshData(\""+tableArray[i]['district']+"\",\""+tableArray[i]['id']+"\",\""+tableArray[i]['taluka']+"\",\""+tableArray[i]['table']+"\");return false;'><img title='Refresh "+tableName+" ("+tableArray[i]['id']+") data' src='../images/refresh.gif' border='0'/></td>";			
				html += "<td><a title='Download "+tableName+" Shapefile' href='http://sbep.gos.pk:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sbep:"+tableArray[i]['table']+"&maxFeatures=25000&outputFormat=SHAPE-ZIP'>Shapefile</a>, </td>";
				html += "<td><a title='Download "+tableName+" CSV' href='http://sbep.gos.pk:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sbep:"+tableArray[i]['table']+"&maxFeatures=25000&outputFormat=csv'>CSV</a>, </td>";
				html += "<td><a title='Download "+tableName+" KML for Google Earth' href='http://sbep.gos.pk:8080/geoserver/sbep/wms?service=WMS&version=1.1.0&request=GetMap&styles=&bbox=54.1,14.5,81.5,39.1&width=232&height=512&srs=EPSG:4326&format=application%2Fvnd.google-earth.kml%2Bxml&layers=sbep:"+tableArray[i]['table']+"'>KML</a></td></tr></table>";
			}
		}
	}
	html +="</div>";
	$("#districtTitle").html('<h1>'+capitalize(district)+'</h1>');
	$("#districtHtml").html(html);	
}

