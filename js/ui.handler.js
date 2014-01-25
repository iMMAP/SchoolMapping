/**
*
* manages user interface and calls to indicator obj and table
*
*/
var indicatorObj_id;
var indicator = 'enrollment';
var indicatorSlideNo = 1;
var indicatorStore = new Array();
var tableObj;
var indTable;
	

function getIndicatorObj(indObj_id){

	indicatorObj_id = indObj_id; //used to access indicator obj from indicator list (schools, enrollment, admin etc)

	if(!indicatorStore[indicatorObj_id]){
		indicatorStore[indicatorObj_id] = new indicatorObj();
		indicatorStore[indicatorObj_id].initIndicator(indicatorData[indicatorObj_id]);
	}

	var newFeatures = new Array();
	for (var i=0;i<indicatorStore[indicatorObj_id].features.length;i++){
		newFeatures[i] = indicatorStore[indicatorObj_id].features[i].clone();
	}
	
	layerSindh.destroyFeatures();
	layerSindh.addFeatures(newFeatures);
	map.zoomToExtent(layerSindh.getDataExtent());
	//tweak map zoom for selected districts
	if((indicatorStore[indicatorObj_id].tableName == 'schools_jacobabad_district') ||
	   (indicatorStore[indicatorObj_id].tableName == 'schools_kashmore_district') ||
	   (indicatorStore[indicatorObj_id].tableName == 'schools_sukkur_district')){
		map.zoomTo(map.getZoom()-1);
	}
	
	//update download reports
	updateDownloadReport();
	
	//update indicator menu
	updateHudDisplay();	

	//update indicator display
	updateIndicatorDisplay();
	
	//update table
	if(!indTable){				
		indTable = $('#example').dataTable( {			
			"iDisplayLength": 15,
			"sScrollX": "100%",
	 		"sScrollXInner": "150%",
			"iLeftColumns": 1,
	 		"iLeftWidth": 150,	
	 		"bScrollCollapse": true,
			"bInfo": true,
			"bPaginate": true,
			"bFilter": true,
			"bLengthChange": false,
		    "bProcessing": true,
	        "bServerSide": true,
	        "sAjaxSource": "data/php/sbep.schools.getTable.php",
			"aoColumns": [
				{ "sTitle": "Semis Code", "sClass": "center"},
				{ "sTitle": "School Name"},
				{ "sTitle": "Type", "sClass": "center" },
				{ "sTitle": "Gender", "sClass": "center" },
				{ "sTitle": "Ghost School", "sClass": "center" },
				{ "sTitle": "SMC Func", "sClass": "center" },
				{ "sTitle": "Condition", "sClass": "center" },
				{ "sTitle": "Plot Size", "sClass": "center", "sType" : "string-case"  },
				{ "sTitle": "Students", "sClass": "center", "sType" : "string-case"  },
				{ "sTitle": "Teachers", "sClass": "center", "sType" : "string-case"  },
				{ "sTitle": "Comments", "sClass": "center", "sType" : "string-case"  },
				{ "sTitle": "Schools 100m", "sClass": "center"},
				{ "sTitle": "Schools 500m", "sClass": "center" },
				{ "sTitle": "Schools 1000m", "sClass": "center" },
				{ "sTitle": "Schools 1500m", "sClass": "center" },
				//hidden
				// { "sTitle": "Location", "sClass": "center" }, //15
				// { "sTitle": "Images", "sClass": "center" },
				// { "sTitle": "Sch 100m Id", "sClass": "center" },
				// { "sTitle": "Sch 500m Id", "sClass": "center" },
				// { "sTitle": "Sch 1000m Id", "sClass": "center" },
				// { "sTitle": "Sch 1500m Id", "sClass": "center" }
			]
		});
		
		/*
		new FixedColumns( indTable, {
			"iLeftColumns": 1,
			"iLeftWidth": 150
		});
		*/
		
		/* Add events */
		$('#example tbody tr').live('click', function () {
			/*
			var sTitle;
			var nTds = $('td', this);
			var comments = $(nTds[12]).text();
			*/
			
			aData = indTable.fnGetData(this);	
			
			//var messiTableBox = new Messi('<div align="center"><table align="center"><tr><td align="left"><img src="images/drop-add.gif"/></td><td> '+aData[0]+' added to the map</td></tr></table></div>', {autoclose: '5000', modal: false, closeButton:false, width: '350px'});
			
			var messiCatchmentHtml = false;
			
			//if schools closer than 1500m
			if(aData[14] > 0){
				messiCatchmentHtml = '<div align="left"><h2>'+aData[0]+'</h2><span class = "darkgray" style="padding:0px 0px 0px 15px"><b>Schools Catchment</b></span></div><br/>';
				messiCatchmentHtml += '<div align="left" style="padding: 0px 0px 0px 25px">';
				messiCatchmentHtml += '<form name="schCatchment" method="get" action="accept">';
					messiCatchmentHtml += '<input id="r100" type="radio" name="sch" value="100m" onclick="addCatchment('+aData[0]+',111);">';
					messiCatchmentHtml += '<label for="r100">100m</label><br><br>';
					messiCatchmentHtml += '<input id="r500" type="radio" name="sch" value="500m" onclick="addCatchment('+aData[0]+',555)">';
					messiCatchmentHtml += '<label for="r500">500m</label><br><br>';
					messiCatchmentHtml += '<input id="r1000" type="radio" name="sch" value="1000m" onclick="addCatchment('+aData[0]+',1111);">';
					messiCatchmentHtml += '<label for="r1000">1000m</label><br><br>';
					messiCatchmentHtml += '<input id="r1500" type="radio" name="sch" value="1500m" onclick="addCatchment('+aData[0]+',1555)">';
					messiCatchmentHtml += '<label for="r1500">1500m</label><br><br>';				
				messiCatchmentHtml += '</form>';
				messiCatchmentHtml += '</div>';
				
			}
			
			addSchoolMain(messiCatchmentHtml, aData);
			
		} );		
		
	}else{
		if(indicatorStore[indicatorObj_id].districtSelected){
			$('#example').dataTable().fnFilter('district||'+indicatorStore[indicatorObj_id].title, 1 , true);
		}else if(indicatorStore[indicatorObj_id].taluka){
			$('#example').dataTable().fnFilter('taluka||'+indicatorStore[indicatorObj_id].title, 1 , true);	
		}
	}
	
	//clear features in schools/radius layer
	clearLayerFeatures();
	
}

//function 
function updateHudDisplay(){
	
	//update map
	/** 
	 * for each object 
	 * 	indicatorStore[i].getLayer().setVisibility(false);
	 * 
	 * for current layer
	 * 	indicatorStore[indicatorObj_id].getLayer().setVisibility(true); 
	 * 
	 * */
	
	//title
	var title = '<h1>Sindh';
	$("#talukaIndicator").css({"display":"none"});

	/*if district*/
	if(indicatorStore[indicatorObj_id].districtSelected){
		//title
		title += ' > '+indicatorStore[indicatorObj_id].title+' District';
		
		//update district in query builder and refresh dispaly
		$("#districtDropDown").val(indicatorStore[indicatorObj_id].districtIndex).attr('selected',true);
		$("#districtDropDown").trigger("liszt:updated");

		//load district taluka drop down 
		$("#talukaDropDown").load('js/data/'+$("#districtDropDown").val()+'TalukaList.json', function(){
			$("#talukaDropDown").trigger("liszt:updated");
		});
		$("#talukaDropDown").attr("disabled", false);
		
		//udpate html to display taluka list
		var talukaHtmllist = '<nav>';
		talukaHtmllist += '<ul id="talukaList">';
		talukaHtmllist += '<li><a href="javascript:void(0)" onclick="getIndicatorObj(\''+indicatorStore[indicatorObj_id].tableName+'\');return false;" class="current" style="border:none;">All</a></li>';	
		for (i=0;i<indicatorStore[indicatorObj_id].districtTalukasList.length;i++){
		
			//var districtindicatorObj_id = indicatorStore[indicatorObj_id].districtTalukasList[i].replace(" ", "_").toLowerCase();
			talukaHtmllist += '<li><a href="javascript:void(0)" onclick="getIndicatorObj(\''+indicatorStore[indicatorObj_id].districtTalukaTblList[i]+'\');return false;" >'+indicatorStore[indicatorObj_id].districtTalukasList[i]+'</a></li>';
			
		}
		talukaHtmllist += '</ul>';
		talukaHtmllist += '</nav>';
		
		//udpate taluka list html & display
		$("#dynamicTalukaList").html(talukaHtmllist);
		$("#talukaIndicator").css({"display":"block"});
		
		//update taluka list css onclick district
		$('#talukaList li a').click( function() {
			$('#talukaList li a').removeClass('current');
			$(this).addClass('current');
		});		
		
	/*else if taluka*/
	}else if(indicatorStore[indicatorObj_id].taluka){
		//title
		title += ' > '+indicatorStore[indicatorObj_id].talukaDistrict+' District > '+indicatorStore[indicatorObj_id].title;

		//display taluka list
		$("#talukaIndicator").css({"display":"block"});	
		//update taluka in query builder and refresh display
		$("#talukaDropDown").val(indicatorStore[indicatorObj_id].talukaIndex).attr('selected',true);
		$("#talukaDropDown").trigger("liszt:updated");
		
	}

	//close & update title
	title += '</h1>';
	$("#districtSummaryTitle").html(title);
	
}

function updateDownloadReport(){
	var html = '<table><tr><td>';
		html += '<a href="javascript:void(0)" onclick="indicatorStore[indicatorObj_id].getIndicatorPdf();return false;"><img title="'+indicatorStore[indicatorObj_id].title+' PDF indicator summary download" src="images/pdf_icon.png"border="0"/></a>';
		html += '</td></tr>';
		html += '<tr><td>';
		html += '<a href="javascript:void(0)" onclick="indicatorStore[indicatorObj_id].getIndicatorKml();return false;"><img title="'+indicatorStore[indicatorObj_id].title+' KML data download" src="images/kml_icon.png"border="0"/></a>';
		html += '</td></tr>';
		html += '<tr><td>';
		html += '<a href="javascript:void(0)" onclick="indicatorStore[indicatorObj_id].getIndicatorCsv();return false;"><img title="'+indicatorStore[indicatorObj_id].title+' CSV data download" src="images/csv_icon.png"border="0"/></a>';		
		html += '</td></tr></table>';
	
	$("#downloadReportsList").html(html);
	
}

function updateIndicatorDisplay(){

	if(indicator == 'schools'){indicatorSchools();}
	if(indicator == 'enrollment'){indicatorEnrollment();}
	if(indicator == 'administration'){indicatorAdministration();}
	if(indicator == 'building'){indicatorBuilding();}
	if(indicator == 'drr'){indicatorDrr();}

}

function indicatorSchools(){

	messiBoxSch = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>School indicator summary loading...</td></tr></table></div>', {modal: true, closeButton:false, width: '350px'});
	
	indicator = "schools";
	
	if(!indicatorStore[indicatorObj_id].getIndicatorSchoolObj()){
		indicatorStore[indicatorObj_id].setIndicatorSchoolObj(indicatorStore[indicatorObj_id].tableName);
		indicatorStore[indicatorObj_id].setIndicatorSchoolChart();
		indicatorStore[indicatorObj_id].setIndicatorSchoolHtml();
		indicatorStore[indicatorObj_id].setIndicatorSchoolPdfHtml();
		
	}
	$("#indicatorHud").html(indicatorStore[indicatorObj_id].getIndicatorSchoolHtml());
	$("#indicatorHud").hide();
	if(indicatorSlideNo > 0){
		$("#indicatorHud").show('slide', {direction: 'left'}, 1200);
	}else if(indicatorSlideNo < 0){
		$("#indicatorHud").show('slide', {direction: 'right'}, 1200);
	}else{
		$("#indicatorHud").show('slide', {direction: 'up'}, 1200);
	}
	indicatorSlideNo = 0;
	if(!switchTable){
		$('#tableDiv').hide('slide', {direction: 'down'}, 0);
	}
	
	messiBoxSch.hide();
	
}

function indicatorEnrollment(){

	messiBoxEnr = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Enrollment indicator summary loading...</td></tr></table></div>', {modal: true, closeButton:false, width: '350px'});
	
	indicator = "enrollment";
	
	if(!indicatorStore[indicatorObj_id].getIndicatorEnrollmentObj()){
		indicatorStore[indicatorObj_id].setIndicatorEnrollmentObj(indicatorData[indicatorObj_id].tableName);
		indicatorStore[indicatorObj_id].setIndicatorEnrollmentChart();
		indicatorStore[indicatorObj_id].setIndicatorEnrollmentHtml();	
		indicatorStore[indicatorObj_id].setIndicatorEnrollmentPdfHtml();
	}

	$("#indicatorHud").html(indicatorStore[indicatorObj_id].getIndicatorEnrollmentHtml());
	$("#indicatorHud").hide();
	if(indicatorSlideNo > 1){
		$("#indicatorHud").show('slide', {direction: 'left'}, 1200);
	}else if(indicatorSlideNo < 1){
		$("#indicatorHud").show('slide', {direction: 'right'}, 1200);
	}else{
		$("#indicatorHud").show('slide', {direction: 'up'}, 1200);
	}
	indicatorSlideNo = 1;
	if(!switchTable){
		$('#tableDiv').hide('slide', {direction: 'down'}, 0);
	}
	
	messiBoxEnr.hide();
	
}

function indicatorAdministration(){

	messiBoxAdm = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Administration indicator summary loading...</td></tr></table></div>', {modal: true, closeButton:false, width: '350px'});
	
	indicator = "administration";
	
	if(!indicatorStore[indicatorObj_id].getIndicatorAdminObj()){
		indicatorStore[indicatorObj_id].setIndicatorAdminObj(indicatorData[indicatorObj_id].tableName);
		//indicatorStore[indicatorObj_id].setIndicatorAdminChart();
		indicatorStore[indicatorObj_id].setIndicatorAdminHtml();
		indicatorStore[indicatorObj_id].setIndicatorAdminPdfHtml();
	}
		
	$("#indicatorHud").html(indicatorStore[indicatorObj_id].getIndicatorAdminHtml());
	$("#indicatorHud").hide();
	if(indicatorSlideNo > 2){
		$("#indicatorHud").show('slide', {direction: 'left'}, 1200);
	}else if(indicatorSlideNo < 2){
		$("#indicatorHud").show('slide', {direction: 'right'}, 1200);
	}else{
		$("#indicatorHud").show('slide', {direction: 'up'}, 1200);
	}
	indicatorSlideNo = 2;
	if(!switchTable){
		$('#tableDiv').hide('slide', {direction: 'down'}, 0);
	}
	
	messiBoxAdm.hide();
	
}

function indicatorBuilding(){

	messiBoxBld = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Infrastructure indicator summary loading...</td></tr></table></div>', {modal: true, closeButton:false, width: '350px'});
	
	indicator = "building";
	
	if(!indicatorStore[indicatorObj_id].getIndicatorBuildingObj()){
		indicatorStore[indicatorObj_id].setIndicatorBuildingObj(indicatorData[indicatorObj_id].tableName);
		indicatorStore[indicatorObj_id].setIndicatorBuildingChart();		
		indicatorStore[indicatorObj_id].setIndicatorBuildingHtml();
		indicatorStore[indicatorObj_id].setIndicatorBuildingPdfHtml();
	}	
		
	$("#indicatorHud").html(indicatorStore[indicatorObj_id].getIndicatorBuildingHtml());
	$("#indicatorHud").hide();
	if(indicatorSlideNo > 3){
		$("#indicatorHud").show('slide', {direction: 'left'}, 1200);
	}else if(indicatorSlideNo < 3){
		$("#indicatorHud").show('slide', {direction: 'right'}, 1200);
	}else{
		$("#indicatorHud").show('slide', {direction: 'up'}, 1200);
	}
	indicatorSlideNo = 3;
	if(!switchTable){
		$('#tableDiv').hide('slide', {direction: 'down'}, 0);
	}
	
	messiBoxBld.hide();
	
}

function indicatorDrr(){

	messiBoxDrr = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>DRR indicator summary loading...</td></tr></table></div>', {modal: true, closeButton:false, width: '350px'});
	
	indicator = "drr";
	
	if(!indicatorStore[indicatorObj_id].getIndicatorDrrObj()){
		indicatorStore[indicatorObj_id].setIndicatorDrrObj(indicatorData[indicatorObj_id].tableName);
		indicatorStore[indicatorObj_id].setIndicatorDrrChart();		
		indicatorStore[indicatorObj_id].setIndicatorDrrHtml();
		indicatorStore[indicatorObj_id].setIndicatorDrrPdfHtml();
	}

	$("#indicatorHud").html(indicatorStore[indicatorObj_id].getIndicatorDrrHtml());
	$("#indicatorHud").hide();
	if(indicatorSlideNo > 4){
		$("#indicatorHud").show('slide', {direction: 'left'}, 1200);
	}else if(indicatorSlideNo < 4){
		$("#indicatorHud").show('slide', {direction: 'right'}, 1200);
	}else{
		$("#indicatorHud").show('slide', {direction: 'up'}, 1200);
	}
	indicatorSlideNo = 4;
	if(!switchTable){
		$('#tableDiv').hide('slide', {direction: 'down'}, 0);
	}
	
	messiBoxDrr.hide();
	
}

function getDataTableDownload(){

	
	var messiTblDownload = '<div align="left"><h2>Sbep Schools Table</h2><span class = "darkgray" style="padding:0px 0px 0px 15px"><b>Download</b></span></div><br/>';
		messiTblDownload += '<div align="left" style="padding: 0px 0px 0px 25px">';
		messiTblDownload += '<form name="schCatchment" method="get" action="accept">';
			messiTblDownload += '<input id="csv" type="radio" name="schTblForm" value="csv" onclick="sbepTblDownload(\'CSV\');">';
			messiTblDownload += '<label for="csv"> CSV</label><br><br>';
			messiTblDownload += '<input id="pdf" type="radio" name="schTblForm" value="pdf" onclick="sbepTblDownload(\'PDF\')">';
			messiTblDownload += '<label for="PDF"> PDF</label><br><br>';
		messiTblDownload += '</form>';
		messiTblDownload += '</div>';
		
		messiBoxTbl = new Messi(messiTblDownload, {modal: true, closeButton:true, width: '350px'});
		
}
function sbepTblDownload(format){
	
	messiBoxTbl.hide();
	
	messiBoxDownload = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Sbep Schools Table '+format+' loading...</td></tr></table></div>', {autoclose: 9000, modal: true, closeButton:true, width: '350px'});
	
	if(format == 'PDF'){
		getDownload('data/php/sbep.exportTableToPDF.php?res='+$('#example_info').html());
	}else{
		getDownload('data/php/sbep.exportTableToCSV.php?');
	}
	
}

function downloadIndPdf(sindh,district,taluka,title,schHtml,enrHtml,admHtml,bldHtml,drrHtml){
	
	//create frame for PDF download
	$('<iframe />', {
		id:'iframePdf',
		name:'iframePdf',
		style:'visibility:hidden;display:none'
	}).appendTo('body');
	
	$('<form />', {
		id:'formPdf',
		name:'formPdf',
		style:'visibility:hidden;display:none',
		action:'data/php/sbep.exportIndToPDF.php?',
		method:'post'
	}).appendTo('#iframePdf');
	
	$('<input />', {
		id:'sindhPdf',
		name:'sindh',
		style:'visibility:hidden;display:none',
		value:sindh
	}).appendTo('#formPdf');
	$('<input />', {
		id:'districtPdf',
		name:'district',
		style:'visibility:hidden;display:none',
		value:district
	}).appendTo('#formPdf');
	$('<input />', {
		id:'talukaPdf',
		name:'taluka',
		style:'visibility:hidden;display:none',
		value:taluka
	}).appendTo('#formPdf');	
	$('<input />', {
		id:'titlePdf',
		name:'title',
		style:'visibility:hidden;display:none',
		value:title
	}).appendTo('#formPdf');	
	$('<input />', {
		id:'schHtmlPdf',
		name:'schHtml',
		style:'visibility:hidden;display:none',
		value:schHtml
	}).appendTo('#formPdf');
	$('<input />', {
		id:'enrHtmlPdf',
		name:'enrHtml',
		style:'visibility:hidden;display:none',
		value:enrHtml
	}).appendTo('#formPdf');
	$('<input />', {
		id:'admHtmlPdf',
		name:'admHtml',
		style:'visibility:hidden;display:none',
		value:admHtml
	}).appendTo('#formPdf');
	$('<input />', {
		id:'bldHtmlPdf',
		name:'bldHtml',
		style:'visibility:hidden;display:none',
		value:bldHtml
	}).appendTo('#formPdf');
	$('<input />', {
		id:'drrHtmlPdf',
		name:'drrHtml',
		style:'visibility:hidden;display:none',
		value:drrHtml
	}).appendTo('#formPdf');		
	
	//submit
	$('#formPdf').submit();
}

//downlaod url with iframe
function getDownload(url){
	
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;	
}

//open/close map
var switchMap = false;
function toggleMap(){
	if (switchMap){
		$('#map').show('slide', {direction: 'up'}, 0);
		$('#mappanel').show('slide', {direction: 'up'}, 0);
		$('#searchbar').show('slide', {direction: 'up'}, 1600);
		switchMap = false;
	}else{
		$('#searchbar').hide('slide', {direction: 'up'}, 800);
		$('#mappanel').hide('slide', {direction: 'up'}, 1600);
		$('#map').hide('slide', {direction: 'up'}, 1600);
		switchMap = true;
	}
}

//open/close summary/table
var switchTable = 0;
function toggleSummary(){
	
	if (switchTable){
		if(query){
			$('#query_form .form').hide('slide', {direction: 'right'}, 1000);
			query = 0;
		}		
		$('#tableDiv').hide('slide', {direction: 'down'}, 1000);
		$('#post').show('slide', {direction: 'up'}, 1000);
		$('#downloadReports').show('slide', {direction: 'up'}, 1000);
		$("#summaryTableId").html('Summary');
		
		switchTable = 0;
	}else{
		$('#post').hide('slide', {direction: 'up'}, 1000);
		$('#downloadReports').hide('slide', {direction: 'up'}, 1000);
		$('#tableDiv').show('slide', {direction: 'down'}, 1000);
		$('#example').dataTable().fnDraw();
		//$('#example').show('slide', {direction: 'up'}, 0);
		$("#summaryTableId").html('Table');
		
		switchTable = 1;
	}
	
}

var switchForm = false;
function toggleForm(){
	if (switchForm){
		$('#queryFormSchoolTitle').hide(0);	
		$('#queryFormGeneralTitle').show(0);
		$('#queryFormSchools').hide(0);
		$('#queryFormGeneral').show('slide', {direction: 'left'}, 1400);
		switchForm = false;
	}else{		
		$('#queryFormGeneralTitle').hide(0);
		$('#queryFormSchoolTitle').show(0);
		$('#queryFormGeneral').hide('slide', {direction: 'left'}, 150);
		$('#queryFormSchools').show('slide', {direction: 'right'}, 1400);
		switchForm = true;
	}
}

function in_array(needle, haystack) {
    for(var i in haystack) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function numberWithCommas(x) {
	if(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}else{
		return x;
	}
}