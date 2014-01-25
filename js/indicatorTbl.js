/**
*
* every object instance (all, district, tehsil) has a summary and indicators
*
*/
var aData;

//columns sorting for datatables
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

function indicatorTbl() {
	
	this.serverUrl = "http://210.56.8.110:8989/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50000&outputFormat=json&typeName=sbep:schools_sbep_tbl";
	//this.serverLocaleUrl = "data/schools_sbep_tbl";
	this.indicatorSchoolTableData;
	
	//this.indTable;

	this.initTable = function() {
		
		//table data
		this.setIndicatorSchoolTableData();
		
	}
	
	//school tableData
	this.getIndicatorSchoolTableData = function() {
		return this.indicatorSchoolTableData;
	}
	this.setIndicatorSchoolTableData = function() {
	
		var schoolTableData = new Array();
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			//console.log('data/php/sbep.ie.proxy.php?url='+encodeURIComponent(this.serverUrl));
			var xmlhttp = new XMLHttpRequest();
				xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table=sbep_tbl', false);
				//xmlhttp.open('GET', this.serverLocaleUrl+'.json', false);
				xmlhttp.send();
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					
					var json = $.parseJSON(xmlhttp.responseText);
					
					//console.log(json);
					
					if (json == null || typeof (json) == 'undefined'){
						json = $.parseJSON(json.firstChild.textContent);
					}
					for(i=0;i<json.features.length;i++){
						schoolTableData[i] = new Array();
						schoolTableData[i][0] = json.features[i].properties.semisCode;
						schoolTableData[i][1] = json.features[i].properties.schName;
						schoolTableData[i][2] = json.features[i].properties.schType;
						schoolTableData[i][3] = json.features[i].properties.schGender;
						schoolTableData[i][4] = json.features[i].properties.ghostSchool;
						schoolTableData[i][5] = json.features[i].properties.smcFunctional;
						schoolTableData[i][6] = json.features[i].properties.bCondition;
						schoolTableData[i][7] = json.features[i].properties.plotSize;
						schoolTableData[i][8] = json.features[i].properties.stuTotReg;
						schoolTableData[i][9] = json.features[i].properties.tTeacher;
						schoolTableData[i][10] = json.features[i].properties.sch100m;	
						
						schoolTableData[i][11] = json.features[i].properties.district;
						schoolTableData[i][12] = json.features[i].properties.tehsil;
						schoolTableData[i][13] = json.features[i].properties.comments;
						schoolTableData[i][14] = json.features[i].properties.imagesUrl;					
						schoolTableData[i][15] = json.features[i].properties.sch100mId;	
						schoolTableData[i][16] = json.features[i].properties.sch500m;	
						schoolTableData[i][17] = json.features[i].properties.sch500mId;	
						schoolTableData[i][18] = json.features[i].properties.sch1000m;	
						schoolTableData[i][19] = json.features[i].properties.sch1000mId;	
						schoolTableData[i][20] = json.features[i].properties.sch1500m;	
						schoolTableData[i][21] = json.features[i].properties.sch1500mId;							
						schoolTableData[i][22] = json.features[i].properties.the_geom;
						//schoolTableData[i][7] = json.features[i].properties.floodAffected;
					}
				//}
		} else {		
			$.ajax({type: 'GET', url: this.serverUrl, async: false, dataType: 'json', success: function (json) {
			//$.ajax({type: 'GET', url: this.serverLocaleUrl+'.json', async: false, dataType: 'json', success: function (json) {
					for(i=0;i<json.features.length;i++){			
						schoolTableData[i] = new Array();
						schoolTableData[i][0] = json.features[i].properties.semisCode;
						schoolTableData[i][1] = json.features[i].properties.schName;
						schoolTableData[i][2] = json.features[i].properties.schType;
						schoolTableData[i][3] = json.features[i].properties.schGender;
						schoolTableData[i][4] = json.features[i].properties.ghostSchool;
						schoolTableData[i][5] = json.features[i].properties.smcFunctional;
						schoolTableData[i][6] = json.features[i].properties.bCondition;
						schoolTableData[i][7] = json.features[i].properties.plotSize;
						schoolTableData[i][8] = json.features[i].properties.stuTotReg;
						schoolTableData[i][9] = json.features[i].properties.tTeacher;
						schoolTableData[i][10] = json.features[i].properties.sch100m;	
						schoolTableData[i][11] = json.features[i].properties.sch500m;
						schoolTableData[i][12] = json.features[i].properties.sch1000m;	
						schoolTableData[i][13] = json.features[i].properties.sch1500m;	
						
						schoolTableData[i][14] = json.features[i].properties.district;
						schoolTableData[i][15] = json.features[i].properties.tehsil;
						schoolTableData[i][16] = json.features[i].properties.comments;
						schoolTableData[i][17] = json.features[i].properties.imagesUrl;					
						schoolTableData[i][18] = json.features[i].properties.sch100mId;	
						schoolTableData[i][19] = json.features[i].properties.sch500mId;	
						schoolTableData[i][20] = json.features[i].properties.sch1000mId;	
						schoolTableData[i][21] = json.features[i].properties.sch1500mId;							
						schoolTableData[i][22] = json.features[i].properties.the_geom;
						//schoolTableData[i][7] = json.features[i].properties.floodAffected;
					}
				}
			});
		}
		
		this.indicatorSchoolTableData = schoolTableData;
		
	}	
	
	this.setSchoolsTable = function() {

		//$('#dynamic').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
		
		var indTable;
		
		/* Add the events etc before DataTables hides a column */
		$("thead input").keyup( function () {
			/* Filter on the column (the index) of this element */
			indTable.fnFilter( this.value, indTable.oApi._fnVisibleToColumnIndex( 
				indTable.fnSettings(), $("thead input").index(this) ) );
		} );
		
		/*
		 * Support functions to provide a little bit of 'user friendlyness' to the textboxes
		 */
		$("thead input").each( function (i) {
			this.initVal = this.value;
		} );
		
		$("thead input").focus( function () {
			if ( this.className == "search_init" ){
				this.className = "";
				this.value = "";
			}
		} );
		
		$("thead input").blur( function (i) {
			if ( this.value == "" )
			{
				this.className = "search_init";
				this.value = this.initVal;
			}
		} );
		
		indTable = $('#example').dataTable( {
			"aaData": this.indicatorSchoolTableData,
			"iDisplayLength": 25,
			"sScrollX": "100%",
			"sScrollXInner": "140%",
			"bScrollCollapse": true,
			//"fnDrawCallback": function(){
				//$('.dataTables_scrollBody').scrollbars();
			//},
			//"sDom": 'RCT<"clear"><"top"li>rtp', //lfrtip
			"sDom": 'itp', //lfrtip
			"bDeferRender": true, //renders as its required
			"oTableTools": {
				"aButtons": [
					//"copy",
					//"print",
					{
						"sExtends":    "collection",
						"sButtonText": "Save",
						//"aButtons":    [ "csv", "xls", "pdf" ]
						//"aButtons":    [ "csv", "xls" , {
						"aButtons":    [ "csv" , {
							"sExtends": "pdf",
							"sPdfOrientation": "landscape",
							//"sPdfMessage": ""
							"mColumns": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13 ]
						}]
					}
				]
			},
			"aoColumnDefs": [
				{ "bVisible": false, "aTargets": [ 14, 15, 16, 17, 18, 19, 20, 21, 22 ] }
			],
			"oColVis": {
				"aiExclude": [ 0, 1, 14, 15, 16, 17, 18, 19, 20, 21, 22 ]
			},
			"bSortCellsTop": true,
			"oLanguage": {
			  "sLengthMenu": 'Show <select>'+
				'<option value="25">25</option>'+
				'<option value="50">50</option>'+
				/*'<option value="-1">All</option>'+*/
				'</select> schools'
			},
			//"aaSorting": [ [7,'desc'], [8,'desc'], [9,'desc'] ],
			"aaSorting": [ [0,'desc']],
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
				{ "sTitle": "Schools 100m", "sClass": "center"},
				{ "sTitle": "Schools 500m", "sClass": "center" },
				{ "sTitle": "Schools 1000m", "sClass": "center" },
				{ "sTitle": "Schools 1500m", "sClass": "center" },
				//hidden
				{ "sTitle": "District", "sClass": "center" }, //14
				{ "sTitle": "Tehsil", "sClass": "center" },
				{ "sTitle": "Comments", "sClass": "center" },
				{ "sTitle": "URL", "sClass": "center" },
				{ "sTitle": "sch100mId", "sClass": "center" },
				{ "sTitle": "sch500mId", "sClass": "center" },
				{ "sTitle": "sch1000mId", "sClass": "center" },
				{ "sTitle": "sch1500mId", "sClass": "center" },				
				{ "sTitle": "Geom", "sClass": "center" }
			]
		} );
		
		//new FixedHeader( indTable );
		
		new FixedColumns( indTable, {
			"iLeftColumns": 2,
			"iLeftWidth": 300
		} );
		
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
			
			if(aData[10] > 0){
				messiCatchmentHtml = '<div align="left"><h2>'+aData[0]+'</h2><span class = "darkgray" style="padding:0px 0px 0px 15px"><b>Schools Catchement</b></span></div><br/>';
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
			
			addSchoolMain(messiCatchmentHtml);
			
		} );
	}
	//school tableData
	this.searchIndicatorSchoolTableData = function(searchObj, search) {
	
		if(search == 1){
			if (searchObj.allSelected){			
				refreshQueryForm();
			}else if(searchObj.districtSelected){
				$('#example').dataTable().fnFilter(searchObj.title, 14);
			}else{
				$('#example').dataTable().fnFilter(searchObj.title, 15);
			}
		}else if(search == 2){
			$('#example').dataTable().fnFilter(searchObj,0,true,false);
		}
	}
}