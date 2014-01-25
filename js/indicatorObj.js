/**
*
* every object instance (all, district, tehsil) has a summary and indicators
*
*/

function indicatorObj() {	
	
	/*set at init*/
	this.title = 0;
	this.allSelected = 0;
	this.districtSelected = 0;
	this.districtIndex = 0;
	this.districtTalukasList;
	this.districtTalukaTblList;
	this.talukaDistrict = 0;
	this.taluka = true;
	this.talukaIndex = 0;
	//name of file for all indicators & table
	this.tableName = 0;
	//location to GeoServer
	this.serverUrl = "http://sbep.gos.pk:8080/geoserver/sbep/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50000&outputFormat=json&typeName=sbep:";

	//school
	this.indicatorSchoolObj = 0;
	this.indicatorSchoolChart = 0;
	this.indicatorSchoolHtml = 0;
	this.indicatorSchoolPdfHtml = 0;

	//enrollment (initial display)
	this.indicatorEnrollmentObj = 0;
	this.indicatorEnrollmentChart = 0;
	this.indicatorEnrollmentPdfHtml = 0;
	this.indicatorEnrollmentHtml = 0;
	
	//admin
	this.indicatorAdminObj = 0;	
	//this.indicatorAdminChart;	
	this.indicatorAdminHtml = 0;
	this.indicatorAdminPdfHtml = 0;
	
	//infrastructure
	this.indicatorBuildingObj = 0;
	this.indicatorBuildingChart = 0;
	this.indicatorBuildingHtml = 0;
	
	//DRR
	this.indicatorDrrObj = 0;
	this.indicatorDrrChart = 0;
	this.indicatorDrrHtml = 0;
	this.indicatorDrrPdfHtml = 0;
	
	//attributes for OpenLayers layer
	this.bbox = 0;
	this.lon = 0;
	this.lat = 0;
	this.zoom = 0;	
	this.schools = 0;
	this.boys = 0;
	this.girls = 0;
	this.totalStudents = 0;
	this.pointRadius = 0;
	this.style = 0;
	//layer
	this.features = new Array();
	
	this.initIndicator = function(data) {
		
		this.title = data.title;
		this.allSelected = data.allSelected;
		this.districtSelected = data.districtSelected;
		this.districtIndex = data.districtIndex;
		this.districtTalukasList = data.districtTalukasList;
		this.districtTalukaTblList = data.districtTalukaTblList;
		this.talukaDistrict = data.talukaDistrict;
		this.taluka = data.taluka;
		this.talukaIndex = data.talukaIndex;
		//tableName
		this.tableName = data.tableName;

		/**OpenLayers*/
		this.lon = data.lon;
		this.lat = data.lat;
		this.zoom = data.zoom;	
		this.schools = data.schools;
		this.boys = data.boys;
		this.girls = data.girls;
		this.totalStudents = data.totalStudents;
		this.pointRadius = data.pointRadius;
		//layer
		if (this.allSelected){
			var i = 0;
			var maxValue = 0;
			var minValue = 1000000000000;
			for (a in indicatorData) {
				if (indicatorData[a].districtSelected){
					// console.log(indicatorData[a]);
					var geom = new OpenLayers.Geometry.Point(indicatorData[a].lon, indicatorData[a].lat).transform(options4326.projection, options900913.projection);
					var attributes = {
						key: indicatorData[a].tableName, 
						i: indicatorData[a].districtIndex,
						title: indicatorData[a].title, 
						label: indicatorData[a].title+'\n'+numberWithCommas(indicatorData[a].schools), 
						schools: numberWithCommas(indicatorData[a].schools), 
						boys: indicatorData[a].boys, 
						girls: indicatorData[a].girls, 
						totalStudents: indicatorData[a].totalStudents, 
						lon: indicatorData[a].lon, 
						lat: indicatorData[a].lat, 
						zoom: indicatorData[a].zoom, 
						pointRadius: indicatorData[a].pointRadius, 
						pointRadiusSmall: indicatorData[a].pointRadiusSmall, 
						districtName: false, 
						district: true,
						taluka: false,
					};
					if (indicatorData[a].schools > maxValue) maxValue = indicatorData[a].schools;
					if (indicatorData[a].schools < minValue) minValue = indicatorData[a].schools;
					// layerSindh.addFeatures(new OpenLayers.Feature.Vector(geom, attributes));
					this.features[i] = new OpenLayers.Feature.Vector(geom, attributes);
					// console.log(this.features);
					i++;
				}	
				
			}
			// console.log('maxValue : '+maxValue+' - min value : '+minValue);
			var compare = maxValue - minValue;
			for (var x=0;x<this.features.length;x++){
				var number = this.features[x].attributes.schools;
				number = parseFloat(number.replace(/\s/g, "").replace(",", ""));
				this.features[x].attributes.pointRadius = ((number/maxValue)*50);
				this.features[x].data.pointRadius = ((number/maxValue)*50);
				// console.log(this.features[x].attributes.pointRadius); 
			}
			

		} else if (this.districtSelected){
			var i = 0;
			var maxValue = 0;
			var minValue = 1000000000000;
			for (a in indicatorData) {
				if (indicatorData[a].taluka){
					if (in_array(indicatorData[a].tableName, this.districtTalukaTblList)){
						// console.log(indicatorData[a]);	
						var geom = new OpenLayers.Geometry.Point(indicatorData[a].lon, indicatorData[a].lat).transform(options4326.projection, options900913.projection);
						var attributes = {
							key: indicatorData[a].tableName, 
							i: indicatorData[a].talukaIndex,
							title: indicatorData[a].title, 
							label: indicatorData[a].title+'\n'+numberWithCommas(indicatorData[a].schools), 
							schools: numberWithCommas(indicatorData[a].schools), 
							boys: indicatorData[a].boys, 
							girls: indicatorData[a].girls, 
							totalStudents: indicatorData[a].totalStudents, 
							lon: indicatorData[a].lon, 
							lat: indicatorData[a].lat, 
							zoom: indicatorData[a].zoom, 
							pointRadius: indicatorData[a].pointRadius, 
							pointRadiusSmall: indicatorData[a].pointRadiusSmall, 
							districtName: indicatorData[a].talukaDistrict, 
							district: false,
							taluka: true,
						};	
						if (indicatorData[a].schools > maxValue) maxValue = indicatorData[a].schools;
						if (indicatorData[a].schools < minValue) minValue = indicatorData[a].schools;
						// layerSindh.addFeatures(new OpenLayers.Feature.Vector(geom, attributes));
						this.features[i] = new OpenLayers.Feature.Vector(geom, attributes);
						// console.log(this.features);
						i++;			
					}
				}	
			}
			var compare = maxValue - minValue;
			for (var x=0;x<this.features.length;x++){
				var number = this.features[x].attributes.schools;
				number = parseFloat(number.replace(/\s/g, "").replace(",", ""));
				this.features[x].attributes.pointRadius = ((number/maxValue)*50);
				this.features[x].data.pointRadius = ((number/maxValue)*50);
				// console.log(this.features[x].attributes.pointRadius); 
			}
		} else if (this.taluka){
			
			var geom = new OpenLayers.Geometry.Point(data.lon, data.lat).transform(options4326.projection, options900913.projection);
			var attributes = {
							key: data.tableName, 
							i: data.talukaIndex,
							title: data.title, 
							label: data.title+'\n'+numberWithCommas(data.schools), 
							schools: numberWithCommas(data.schools), 
							boys: data.boys, 
							girls: data.girls, 
							totalStudents: data.totalStudents, 
							lon: data.lon, 
							lat: data.lat, 
							zoom: data.zoom, 
							pointRadius: data.pointRadius, 
							pointRadiusSmall: data.pointRadiusSmall, 
							districtName: data.talukaDistrict, 
							district: false,
							taluka: true,
						};
						this.features[0] = new OpenLayers.Feature.Vector(geom, attributes);
						
		}
		
			
	}

	/**
	* get/set methods
	*/
	//title
	this.getTitle = function(){
		return this.title;
	}
	this.setTitle = function(title){
	
		this.title = title;
		
	}
	
	//all selected
	this.getAllSelected = function(){
		return this.allSelected;
	}
	this.setAllSelected = function(check){
	
		if(check){
			this.allSelected = true;
		}else{
			this.allSelected = true;		
		}
		
	}
	
	//district selected
	this.getDistrictSelected = function(){
		return this.districtSelected;
	}	
	this.setDistrictSelected = function(check){
		
		if(check){
			this.districtSelected = true;
		}else{
			this.districtSelected = true;		
		}
		
	}
	
	//array of selected districts talukas
	this.getdistrictTalukasList = function(){
		return this.districtTalukasList;
	}
	this.setdistrictTalukasList = function(data){
		
		//process data
		
		this.districtTalukasList = new Array();
		
		this.districtTalukasList = data;
		
	}
	//selected talukas' district
	this.getTalukaDistrict = function(){
		return this.talukaDistrict;
	}
	this.setTalukaDistrict = function(districtName){
		
		this.talukaDistrict = districtName;
		
	}
	
	//school data
	this.getIndicatorSchoolObj = function() {
		return this.indicatorSchoolObj;
	}
	this.setIndicatorSchoolObj = function(tn) {
	
		var schoolObj = new Object();
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var xmlhttp = new XMLHttpRequest();
				//alert('data/php/sbep.ie.proxy.php?url='+encodeURI(this.serverUrl+tn+'_ind_sch'));
				xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_sch&output=json', false);
				//xmlhttp.open('GET', this.serverUrl+tn+'_ind_sch.json', 0);
				
				xmlhttp.send();
				//xmlhttp.onload = function() {	
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					
					var json = $.parseJSON(xmlhttp.responseText);
					
					if (json == null || typeof (json) == 'undefined'){
						json = $.parseJSON(json.firstChild.textContent);
					}
					//for(i=0;i<json.features.length;i++){
						schoolObj.totalSchools = json.features[0].properties.totalSchools;
						schoolObj.primarySchools = json.features[0].properties.primarySchools;
						schoolObj.middleSchools = json.features[0].properties.middleSchools;
						schoolObj.elementarySchools = json.features[0].properties.elementarySchools;
						schoolObj.highSchools = json.features[0].properties.highSchools;
						schoolObj.highSecondarySchools = json.features[0].properties.highSecondarySchools;
						schoolObj.ghostSchools = json.features[0].properties.ghostSchools;
						schoolObj.shelterless = json.features[0].properties.shelterless;
						schoolObj.otherSchools = json.features[0].properties.other;
					//}
				//}
			//};
			//xmlhttp.send();
			
		} else {
			//netscape
			$.ajax({type: 'GET', url:'data/php/sbep.ie.proxy.php?table='+tn+'_ind_sch&output=json', async: 0, dataType: 'json', success: function (json) {
			//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_sch.json', async: 0, dataType: 'json', success: function (json) {
						
					//for(i=0;i<json.features.length;i++){
						schoolObj.totalSchools = json.features[0].properties.totalSchools;
						schoolObj.primarySchools = json.features[0].properties.primarySchools;
						schoolObj.middleSchools = json.features[0].properties.middleSchools;
						schoolObj.elementarySchools = json.features[0].properties.elementarySchools;
						schoolObj.highSchools = json.features[0].properties.highSchools;
						schoolObj.highSecondarySchools = json.features[0].properties.highSecondarySchools;
						schoolObj.ghostSchools = json.features[0].properties.ghostSchools;
						schoolObj.shelterless = json.features[0].properties.shelterless;
						schoolObj.otherSchools = json.features[0].properties.other;
					//}
				},
				error: function(xhr, textStatus, errorThrown){
					
				}
			});
		}
		
		this.indicatorSchoolObj = schoolObj;
		
	}
	//school chart
	this.getIndicatorSchoolChart = function() {
		return this.indicatorSchoolChart;
	}
	this.setIndicatorSchoolChart = function() {
	
	/**http://chart.apis.google.com/chart?chxr=0,0,300&chxt=y&chbh=25,25,25&chxt=x,y&chxl=0:|Primary|Middle|Elementary|High|High%20Secondary|Ghost&chs=400x225&cht=bvg&chco=A2C180&chds=0,300&chd=t:386,18,8,17,4,5*/
		
	var chart = "http://chart.apis.google.com/chart";
		//chart += "?chs=400x150";
		chart += "?chs=403x147";
		chart += "&chds=0,"+Math.max(this.indicatorSchoolObj.primarySchools,this.indicatorSchoolObj.middleSchools,this.indicatorSchoolObj.elementarySchools,this.indicatorSchoolObj.highSchools,this.indicatorSchoolObj.highSecondarySchools,this.indicatorSchoolObj.ghostSchools,this.indicatorSchoolObj.shelterless)+"";
		chart += "&cht=p3";
		chart += "&chco=A2C180,3D7930";
		chart += "&chl=Primary("+Math.round((this.indicatorSchoolObj.primarySchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|Middle("+Math.round((this.indicatorSchoolObj.middleSchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|Elementary("+Math.round((this.indicatorSchoolObj.elementarySchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|High("+Math.round((this.indicatorSchoolObj.highSchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|Secondary("+Math.round((this.indicatorSchoolObj.highSecondarySchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|Ghost("+Math.round((this.indicatorSchoolObj.ghostSchools / this.indicatorSchoolObj.totalSchools)*100)+"%)|Shelterless("+Math.round((this.indicatorSchoolObj.shelterless / this.indicatorSchoolObj.totalSchools)*100)+"%)";
		chart += "&chd=t:"+this.indicatorSchoolObj.primarySchools+","+this.indicatorSchoolObj.middleSchools+","+this.indicatorSchoolObj.elementarySchools+","+this.indicatorSchoolObj.highSchools+","+this.indicatorSchoolObj.highSecondarySchools+","+this.indicatorSchoolObj.ghostSchools+","+this.indicatorSchoolObj.shelterless+"";
		
		this.indicatorSchoolChart = chart;
		
	}
	//school html
	this.getIndicatorSchoolHtml = function() {
		return this.indicatorSchoolHtml;
	}
	this.setIndicatorSchoolHtml = function() {
		
		var html = '<div id="schoolLbl" style="z-index:999;position:absolute;padding:4px 0px 0px 320px;"><table><tr><td><h2 style="font-size:1.8em;"><span class="green1">'+Math.round((this.indicatorSchoolObj.primarySchools / this.indicatorSchoolObj.totalSchools)*100)+'%</span></h2></td><td><h3 style="font-size:1.0em;"> Primary Schools</h3></td></tr></table></div>';
		html += '<table width="100%">';
			html += '<tr>';
			html += '<td width="40%">';
			html += '<div id="chartHud">';
			html += '<table><tr><td><h2><span class="darkgray">Schools</span></h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.primarySchools)+'</span></h2></td><td><h2> Primary</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.middleSchools)+'</span></h2></td><td><h2> Middle</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.elementarySchools)+'</span></h2></td><td><h2> Elementary</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.highSchools)+'</span></h2></td><td><h2> High</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.highSecondarySchools)+'</td><td><h2> High Secondary</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.ghostSchools)+'</span></h2></td><td><h2> Ghost</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.shelterless)+'</span></h2></td><td><h2> Shelterless</h2></td></tr>';
			if(this.indicatorSchoolObj.otherSchools){
				html += '<tr><td align="right"><h2 style="font-size: 1.2em;><span class="gray">'+numberWithCommas(this.indicatorSchoolObj.otherSchools)+'</span></h2></td><td><h2> Other</h2></td></tr>';
			}
			html += '<tr><td align="right"><h2 style="font-size: 2.1em;"><span class="green">'+numberWithCommas(this.indicatorSchoolObj.totalSchools)+'</span></h2></td><td><h2><span class="darkgreen"> Total Schools</span></h2></td></tr>';
			html += '</table>';
			html += '</div>';	
			html += '</td>';
			html +=	'<td width="60%">';
			html += '<div id="chartIndicator" align="left">';
			if(this.allSelected){		
				//chart title
				html += '<img title="Sindh" src="'+this.getIndicatorSchoolChart()+'"/>';
			}else if(this.districtSelected){
				//chart title sindh > district
				html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorSchoolChart()+'"/>';
			}else if(this.talukaDistrict){
				//chart title sindh > district > taluka		 
				html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorSchoolChart()+'"/>';		
			}													
			html += '</div>';
			html += '</td>';
			html += '</tr>';
		html += '</table>';
			
		this.indicatorSchoolHtml = html;
		
	}
	this.getIndicatorSchoolPdfHtml = function(){
		return this.indicatorSchoolPdfHtml;
	}
	this.setIndicatorSchoolPdfHtml = function(){
		
		var	html = '<div id="schoolLbl" style="z-index:999;position:absolute;padding:0px 0px 0px 220px;"><table><tr><td><h2><span class="green1">'+Math.round((this.indicatorSchoolObj.primarySchools / this.indicatorSchoolObj.totalSchools)*100)+'%</span></h2></td><td><h3><span class="gray"> Primary Schools</span></h3></td></tr></table></div>';
			html += '<table width="100%" class="indTbl" style="border-bottom:#f2f2f2 1px solid;">';
				html += '<tbody>';
					html += '<tr>';
						html += '<td width="20%">';
							html += '<table>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.primarySchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Primary</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.middleSchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Middle</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.elementarySchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Elementary</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.highSchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> High</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.highSecondarySchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> High Secondary</span>';
									html += '</td>';						
								html += '</tr>';	
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.ghostSchools)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Ghost</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.shelterless)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Shelterless</span>';
									html += '</td>';						
								html += '</tr>';
								if(this.indicatorSchoolObj.otherSchools){
									html += '<tr>';
										html += '<td style="text-align:right;">';
											html += '<span class="darkgray">'+numberWithCommas(this.indicatorSchoolObj.otherSchools)+'</span>';
										html += '</td>';
										html += '<td width="100%" style="text-align:left;">';
											html += '<span class="gray"> Other</span>';
										html += '</td>';						
									html += '</tr>';									
								}
							html += '</table>';
						html += '</td>';
						html += '<td width="50%">';
								html += '<div align="center">';
									if(this.allSelected){		
										//chart title
										html += '<img title="Sindh" src="'+this.getIndicatorSchoolChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
									}else if(this.districtSelected){
										//chart title sindh > district
										html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorSchoolChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
									}else if(this.talukaDistrict){
										//chart title sindh > district > taluka		 
										html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorSchoolChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';		
									}							
								html += '<div>';
						html += '</td>';						
					html += '</tr>';						
				html += '</tbody>';
			html += '</table>';
			html += '<table width="100%" class="indTbl">';
				html += '<tbody>';	
					html += '<tr>';
						html += '<td style="text-align:right;">';
							html += '<span class="green">'+numberWithCommas(this.indicatorSchoolObj.totalSchools)+'</span>';
						html += '</td>';
						html += '<td width="100%" style="text-align:left;">';
							html += '<span class="darkgreen"> Total Schools</span>';
						html += '</td>';						
					html += '</tr>';
				html += '</tbody>';					
			html += '</table>';
		
		this.indicatorSchoolPdfHtml = html;
	}	
	
	//enrollment data
	this.getIndicatorEnrollmentObj = function() {
		return this.indicatorEnrollmentObj;
	}
	this.setIndicatorEnrollmentObj = function(tn) {
	
		var enrollmentObj = new Object();
		
		//alert(navigator.appName);
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_enr&output=json', false);
				//xmlhttp.open('GET', this.serverUrl+tn+'_ind_enr.json', 0);
				
				xmlhttp.send();
				
				//xmlhttp.onload = function() { 		
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					var json = $.parseJSON(xmlhttp.responseText);			
					
					if (json == null || typeof (json) == 'undefined'){
						json = $.parseJSON(json.firstChild.textContent);
					}
						//for(i=0;i<json.features.length;i++){
							//kg
							enrollmentObj.clsKgMReg = json.features[0].properties.clsKgMReg;
							enrollmentObj.clsKgMAct = json.features[0].properties.clsKgMAct;
							enrollmentObj.clsKgFReg = json.features[0].properties.clsKgFReg;
							enrollmentObj.clsKgFAct = json.features[0].properties.clsKgFAct;
							enrollmentObj.clsKgTReg = json.features[0].properties.clsKgTReg;
							enrollmentObj.clsKgTAct = json.features[0].properties.clsKgTAct;
							//1
							enrollmentObj.cls1MReg = json.features[0].properties.cls1MReg;
							enrollmentObj.cls1MAct = json.features[0].properties.cls1MAct;
							enrollmentObj.cls1FReg = json.features[0].properties.cls1FReg;
							enrollmentObj.cls1FAct = json.features[0].properties.cls1FAct;
							enrollmentObj.cls1TReg = json.features[0].properties.cls1TReg;
							enrollmentObj.cls1TAct = json.features[0].properties.cls1TAct;
							//2
							enrollmentObj.cls2MReg = json.features[0].properties.cls2MReg;
							enrollmentObj.cls2MAct = json.features[0].properties.cls2MAct;
							enrollmentObj.cls2FReg = json.features[0].properties.cls2FReg;
							enrollmentObj.cls2FAct = json.features[0].properties.cls2FAct;
							enrollmentObj.cls2TReg = json.features[0].properties.cls2TReg;
							enrollmentObj.cls2TAct = json.features[0].properties.cls2TAct;
							//3
							enrollmentObj.cls3MReg = json.features[0].properties.cls3MReg;
							enrollmentObj.cls3MAct = json.features[0].properties.cls3MAct;
							enrollmentObj.cls3FReg = json.features[0].properties.cls3FReg;
							enrollmentObj.cls3FAct = json.features[0].properties.cls3FAct;
							enrollmentObj.cls3TReg = json.features[0].properties.cls3TReg;
							enrollmentObj.cls3TAct = json.features[0].properties.cls3TAct;
							//4
							enrollmentObj.cls4MReg = json.features[0].properties.cls4MReg;
							enrollmentObj.cls4MAct = json.features[0].properties.cls4MAct;
							enrollmentObj.cls4FReg = json.features[0].properties.cls4FReg;
							enrollmentObj.cls4FAct = json.features[0].properties.cls4FAct;
							enrollmentObj.cls4TReg = json.features[0].properties.cls4TReg;
							enrollmentObj.cls4TAct = json.features[0].properties.cls4TAct;
							//5
							enrollmentObj.cls5MReg = json.features[0].properties.cls5MReg;
							enrollmentObj.cls5MAct = json.features[0].properties.cls5MAct;
							enrollmentObj.cls5FReg = json.features[0].properties.cls5FReg;
							enrollmentObj.cls5FAct = json.features[0].properties.cls5FAct;
							enrollmentObj.cls5TReg = json.features[0].properties.cls5TReg;
							enrollmentObj.cls5TAct = json.features[0].properties.cls5TAct;
							//6
							enrollmentObj.cls6MReg = json.features[0].properties.cls6MReg;
							enrollmentObj.cls6MAct = json.features[0].properties.cls6MAct;
							enrollmentObj.cls6FReg = json.features[0].properties.cls6FReg;
							enrollmentObj.cls6FAct = json.features[0].properties.cls6FAct;
							enrollmentObj.cls6TReg = json.features[0].properties.cls6TReg;
							enrollmentObj.cls6TAct = json.features[0].properties.cls6TAct;
							//7
							enrollmentObj.cls7MReg = json.features[0].properties.cls7MReg;
							enrollmentObj.cls7MAct = json.features[0].properties.cls7MAct;
							enrollmentObj.cls7FReg = json.features[0].properties.cls7FReg;
							enrollmentObj.cls7FAct = json.features[0].properties.cls7FAct;
							enrollmentObj.cls7TReg = json.features[0].properties.cls7TReg;
							enrollmentObj.cls7TAct = json.features[0].properties.cls7TAct;
							//8
							enrollmentObj.cls8MReg = json.features[0].properties.cls8MReg;
							enrollmentObj.cls8MAct = json.features[0].properties.cls8MAct;
							enrollmentObj.cls8FReg = json.features[0].properties.cls8FReg;
							enrollmentObj.cls8FAct = json.features[0].properties.cls8FAct;
							enrollmentObj.cls8TReg = json.features[0].properties.cls8TReg;
							enrollmentObj.cls8TAct = json.features[0].properties.cls8TAct;
							//9
							enrollmentObj.cls9MReg = json.features[0].properties.cls9MReg;
							enrollmentObj.cls9MAct = json.features[0].properties.cls9MAct;
							enrollmentObj.cls9FReg = json.features[0].properties.cls9FReg;
							enrollmentObj.cls9FAct = json.features[0].properties.cls9FAct;
							enrollmentObj.cls9TReg = json.features[0].properties.cls9TReg;
							enrollmentObj.cls9TAct = json.features[0].properties.cls9TAct;
							//10
							enrollmentObj.cls10MReg = json.features[0].properties.cls10MReg;
							enrollmentObj.cls10MAct = json.features[0].properties.cls10MAct;
							enrollmentObj.cls10FReg = json.features[0].properties.cls10FReg;
							enrollmentObj.cls10FAct = json.features[0].properties.cls10FAct;
							enrollmentObj.cls10TReg = json.features[0].properties.cls10TReg;
							enrollmentObj.cls10TAct = json.features[0].properties.cls10TAct;
							//11
							enrollmentObj.cls11MReg = json.features[0].properties.cls11MReg;
							enrollmentObj.cls11MAct = json.features[0].properties.cls11MAct;
							enrollmentObj.cls11FReg = json.features[0].properties.cls11FReg;
							enrollmentObj.cls11FAct = json.features[0].properties.cls11FAct;
							enrollmentObj.cls11TReg = json.features[0].properties.cls11TReg;
							enrollmentObj.cls11TAct = json.features[0].properties.cls11TAct;
							//12
							enrollmentObj.cls12MReg = json.features[0].properties.cls12MReg;
							enrollmentObj.cls12MAct = json.features[0].properties.cls12MAct;
							enrollmentObj.cls12FReg = json.features[0].properties.cls12FReg;
							enrollmentObj.cls12FAct = json.features[0].properties.cls12FAct;
							enrollmentObj.cls12TReg = json.features[0].properties.cls12TReg;
							enrollmentObj.cls12TAct = json.features[0].properties.cls12TAct;
							//student totals
							enrollmentObj.stuTotMReg = json.features[0].properties.stuTotMReg;
							enrollmentObj.stuTotMAct = json.features[0].properties.stuTotMAct;
							enrollmentObj.stuTotFReg = json.features[0].properties.stuTotFReg;
							enrollmentObj.stuTotMAct = json.features[0].properties.stuTotMAct;
							enrollmentObj.stuTotReg = json.features[0].properties.stuTotReg;
							enrollmentObj.stuTotAct = json.features[0].properties.stuTotAct;
							//group Kg
							enrollmentObj.groupKgMale = json.features[0].properties.groupKgMale;
							enrollmentObj.groupKgFemale = json.features[0].properties.groupKgFemale;
							enrollmentObj.groupKgTotal = json.features[0].properties.groupKgTotal;
							//group 1-5
							enrollmentObj.group1_5Male = json.features[0].properties.group1_5Male;
							enrollmentObj.group1_5Female = json.features[0].properties.group1_5Female;
							enrollmentObj.group1_5Total = json.features[0].properties.group1_5Total;					
							//group 6-8
							enrollmentObj.group6_8Male = json.features[0].properties.group6_8Male;
							enrollmentObj.group6_8Female = json.features[0].properties.group6_8Female;
							enrollmentObj.group6_8Total = json.features[0].properties.group6_8Total;					
							//group 9-10
							enrollmentObj.group9_10Male = json.features[0].properties.group9_10Male;
							enrollmentObj.group9_10Female = json.features[0].properties.group9_10Female;
							enrollmentObj.group9_10Total = json.features[0].properties.group9_10Total;					
							//group 11-12
							enrollmentObj.group11_12Male = json.features[0].properties.group11_12Male;
							enrollmentObj.group11_12Female = json.features[0].properties.group11_12Female;
							enrollmentObj.group11_12Total = json.features[0].properties.group11_12Total;
							//total schools
							enrollmentObj.totalSchools = json.features[0].properties.totalSchools;
						//}
					//}
			
			//xmlhttp.send();
			
		} else {
			
			$.ajax({type: 'GET', url:'data/php/sbep.ie.proxy.php?table='+tn+'_ind_enr&output=json', async: 0, dataType: 'json', success: function (json) {
			
			//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_enr', async: 0, dataType: 'json', success: function (json) {
			//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_enr.json', async: 0, dataType: 'json', success: function (json) {
				
					//console.log(json.features[0].properties.clsKgMReg);
				
					//for(i=0;i<json.features.length;i++){
						
						//kg
						enrollmentObj.clsKgMReg = json.features[0].properties.clsKgMReg;
						enrollmentObj.clsKgMAct = json.features[0].properties.clsKgMAct;
						enrollmentObj.clsKgFReg = json.features[0].properties.clsKgFReg;
						enrollmentObj.clsKgFAct = json.features[0].properties.clsKgFAct;
						enrollmentObj.clsKgTReg = json.features[0].properties.clsKgTReg;
						enrollmentObj.clsKgTAct = json.features[0].properties.clsKgTAct;
						//1
						enrollmentObj.cls1MReg = json.features[0].properties.cls1MReg;
						enrollmentObj.cls1MAct = json.features[0].properties.cls1MAct;
						enrollmentObj.cls1FReg = json.features[0].properties.cls1FReg;
						enrollmentObj.cls1FAct = json.features[0].properties.cls1FAct;
						enrollmentObj.cls1TReg = json.features[0].properties.cls1TReg;
						enrollmentObj.cls1TAct = json.features[0].properties.cls1TAct;
						//2
						enrollmentObj.cls2MReg = json.features[0].properties.cls2MReg;
						enrollmentObj.cls2MAct = json.features[0].properties.cls2MAct;
						enrollmentObj.cls2FReg = json.features[0].properties.cls2FReg;
						enrollmentObj.cls2FAct = json.features[0].properties.cls2FAct;
						enrollmentObj.cls2TReg = json.features[0].properties.cls2TReg;
						enrollmentObj.cls2TAct = json.features[0].properties.cls2TAct;
						//3
						enrollmentObj.cls3MReg = json.features[0].properties.cls3MReg;
						enrollmentObj.cls3MAct = json.features[0].properties.cls3MAct;
						enrollmentObj.cls3FReg = json.features[0].properties.cls3FReg;
						enrollmentObj.cls3FAct = json.features[0].properties.cls3FAct;
						enrollmentObj.cls3TReg = json.features[0].properties.cls3TReg;
						enrollmentObj.cls3TAct = json.features[0].properties.cls3TAct;
						//4
						enrollmentObj.cls4MReg = json.features[0].properties.cls4MReg;
						enrollmentObj.cls4MAct = json.features[0].properties.cls4MAct;
						enrollmentObj.cls4FReg = json.features[0].properties.cls4FReg;
						enrollmentObj.cls4FAct = json.features[0].properties.cls4FAct;
						enrollmentObj.cls4TReg = json.features[0].properties.cls4TReg;
						enrollmentObj.cls4TAct = json.features[0].properties.cls4TAct;
						//5
						enrollmentObj.cls5MReg = json.features[0].properties.cls5MReg;
						enrollmentObj.cls5MAct = json.features[0].properties.cls5MAct;
						enrollmentObj.cls5FReg = json.features[0].properties.cls5FReg;
						enrollmentObj.cls5FAct = json.features[0].properties.cls5FAct;
						enrollmentObj.cls5TReg = json.features[0].properties.cls5TReg;
						enrollmentObj.cls5TAct = json.features[0].properties.cls5TAct;
						//6
						enrollmentObj.cls6MReg = json.features[0].properties.cls6MReg;
						enrollmentObj.cls6MAct = json.features[0].properties.cls6MAct;
						enrollmentObj.cls6FReg = json.features[0].properties.cls6FReg;
						enrollmentObj.cls6FAct = json.features[0].properties.cls6FAct;
						enrollmentObj.cls6TReg = json.features[0].properties.cls6TReg;
						enrollmentObj.cls6TAct = json.features[0].properties.cls6TAct;
						//7
						enrollmentObj.cls7MReg = json.features[0].properties.cls7MReg;
						enrollmentObj.cls7MAct = json.features[0].properties.cls7MAct;
						enrollmentObj.cls7FReg = json.features[0].properties.cls7FReg;
						enrollmentObj.cls7FAct = json.features[0].properties.cls7FAct;
						enrollmentObj.cls7TReg = json.features[0].properties.cls7TReg;
						enrollmentObj.cls7TAct = json.features[0].properties.cls7TAct;
						//8
						enrollmentObj.cls8MReg = json.features[0].properties.cls8MReg;
						enrollmentObj.cls8MAct = json.features[0].properties.cls8MAct;
						enrollmentObj.cls8FReg = json.features[0].properties.cls8FReg;
						enrollmentObj.cls8FAct = json.features[0].properties.cls8FAct;
						enrollmentObj.cls8TReg = json.features[0].properties.cls8TReg;
						enrollmentObj.cls8TAct = json.features[0].properties.cls8TAct;
						//9
						enrollmentObj.cls9MReg = json.features[0].properties.cls9MReg;
						enrollmentObj.cls9MAct = json.features[0].properties.cls9MAct;
						enrollmentObj.cls9FReg = json.features[0].properties.cls9FReg;
						enrollmentObj.cls9FAct = json.features[0].properties.cls9FAct;
						enrollmentObj.cls9TReg = json.features[0].properties.cls9TReg;
						enrollmentObj.cls9TAct = json.features[0].properties.cls9TAct;
						//10
						enrollmentObj.cls10MReg = json.features[0].properties.cls10MReg;
						enrollmentObj.cls10MAct = json.features[0].properties.cls10MAct;
						enrollmentObj.cls10FReg = json.features[0].properties.cls10FReg;
						enrollmentObj.cls10FAct = json.features[0].properties.cls10FAct;
						enrollmentObj.cls10TReg = json.features[0].properties.cls10TReg;
						enrollmentObj.cls10TAct = json.features[0].properties.cls10TAct;
						//11
						enrollmentObj.cls11MReg = json.features[0].properties.cls11MReg;
						enrollmentObj.cls11MAct = json.features[0].properties.cls11MAct;
						enrollmentObj.cls11FReg = json.features[0].properties.cls11FReg;
						enrollmentObj.cls11FAct = json.features[0].properties.cls11FAct;
						enrollmentObj.cls11TReg = json.features[0].properties.cls11TReg;
						enrollmentObj.cls11TAct = json.features[0].properties.cls11TAct;
						//12
						enrollmentObj.cls12MReg = json.features[0].properties.cls12MReg;
						enrollmentObj.cls12MAct = json.features[0].properties.cls12MAct;
						enrollmentObj.cls12FReg = json.features[0].properties.cls12FReg;
						enrollmentObj.cls12FAct = json.features[0].properties.cls12FAct;
						enrollmentObj.cls12TReg = json.features[0].properties.cls12TReg;
						enrollmentObj.cls12TAct = json.features[0].properties.cls12TAct;
						//student totals
						enrollmentObj.stuTotMReg = json.features[0].properties.stuTotMReg;
						enrollmentObj.stuTotMAct = json.features[0].properties.stuTotMAct;
						enrollmentObj.stuTotFReg = json.features[0].properties.stuTotFReg;
						enrollmentObj.stuTotMAct = json.features[0].properties.stuTotMAct;
						enrollmentObj.stuTotReg = json.features[0].properties.stuTotReg;
						enrollmentObj.stuTotAct = json.features[0].properties.stuTotAct;
						//group Kg
						enrollmentObj.groupKgMale = json.features[0].properties.groupKgMale;
						enrollmentObj.groupKgFemale = json.features[0].properties.groupKgFemale;
						enrollmentObj.groupKgTotal = json.features[0].properties.groupKgTotal;
						//group 1-5
						enrollmentObj.group1_5Male = json.features[0].properties.group1_5Male;
						enrollmentObj.group1_5Female = json.features[0].properties.group1_5Female;
						enrollmentObj.group1_5Total = json.features[0].properties.group1_5Total;					
						//group 6-8
						enrollmentObj.group6_8Male = json.features[0].properties.group6_8Male;
						enrollmentObj.group6_8Female = json.features[0].properties.group6_8Female;
						enrollmentObj.group6_8Total = json.features[0].properties.group6_8Total;					
						//group 9-10
						enrollmentObj.group9_10Male = json.features[0].properties.group9_10Male;
						enrollmentObj.group9_10Female = json.features[0].properties.group9_10Female;
						enrollmentObj.group9_10Total = json.features[0].properties.group9_10Total;					
						//group 11-12
						enrollmentObj.group11_12Male = json.features[0].properties.group11_12Male;
						enrollmentObj.group11_12Female = json.features[0].properties.group11_12Female;
						enrollmentObj.group11_12Total = json.features[0].properties.group11_12Total;
						//total schools
						enrollmentObj.totalSchools = json.features[0].properties.totalSchools;
					//}
				},
				error: function(xhr, textStatus, errorThrown){
					
				}
			});
		}
		
		this.indicatorEnrollmentObj = enrollmentObj;
		
	}
	//enrollment chart
	this.getIndicatorEnrollmentChart = function() {
		return this.indicatorEnrollmentChart;
	}
	this.setIndicatorEnrollmentChart = function() {
	
		var max = Math.max(this.indicatorEnrollmentObj.clsKgTReg,this.indicatorEnrollmentObj.clsKgTAct,this.indicatorEnrollmentObj.cls1TReg,this.indicatorEnrollmentObj.cls1TAct,this.indicatorEnrollmentObj.cls2TReg,this.indicatorEnrollmentObj.cls2TAct,this.indicatorEnrollmentObj.cls3TReg,this.indicatorEnrollmentObj.cls3TAct,this.indicatorEnrollmentObj.cls4TReg,this.indicatorEnrollmentObj.cls4TAct,this.indicatorEnrollmentObj.cls5TReg,this.indicatorEnrollmentObj.cls5TAct,this.indicatorEnrollmentObj.cls6TReg,this.indicatorEnrollmentObj.cls6TAct,this.indicatorEnrollmentObj.cls7TReg,this.indicatorEnrollmentObj.cls7TAct,this.indicatorEnrollmentObj.cls8TReg,this.indicatorEnrollmentObj.cls8TAct,this.indicatorEnrollmentObj.cls9TReg,this.indicatorEnrollmentObj.cls9TAct,this.indicatorEnrollmentObj.cls10TReg,this.indicatorEnrollmentObj.cls10TAct,this.indicatorEnrollmentObj.cls11TReg,this.indicatorEnrollmentObj.cls11TAct,this.indicatorEnrollmentObj.cls12TReg,this.indicatorEnrollmentObj.cls12TAct);
		var chartRange;
		if(this.allSelected){ //sindh
			chartRange = max + 10000;
		}else if (this.districtSelected){ //district
			chartRange = max + 10000;
		}else{ //taluka
			chartRange = max + 1000;
		}
		var	chart = 'http://chart.apis.google.com/chart';
			chart += '?cht=bvg';
			chart += '&chs=670x260';
			chart += '&chxt=y,x,y,x';
			chart += '&chco=A2C180,3D7930';
			chart += '&chxr=0,0,'+chartRange+'';
			chart += '&chds=0,'+chartRange+',0,'+chartRange+'';
			chart += '&chbh=17,1,11';
			chart += '&chxl=1:|Kg|1|2|3|4|5|6|7|8|9|10|11|12|2:|Students|3:|Grade';
			chart += '&chxp=2,50|3,50';
			//chart += '&chm=N*fs*,282828,0,-1,11,,h::4|N*fs*,282828,1,-1,11,,h::4';
			chart += '&chd=t:'+this.indicatorEnrollmentObj.clsKgTReg+','+this.indicatorEnrollmentObj.cls1TReg+','+this.indicatorEnrollmentObj.cls2TReg+','+this.indicatorEnrollmentObj.cls3TReg+','+this.indicatorEnrollmentObj.cls4TReg+','+this.indicatorEnrollmentObj.cls5TReg+','+this.indicatorEnrollmentObj.cls6TReg+','+this.indicatorEnrollmentObj.cls7TReg+','+this.indicatorEnrollmentObj.cls8TReg+','+this.indicatorEnrollmentObj.cls9TReg+','+this.indicatorEnrollmentObj.cls10TReg+','+this.indicatorEnrollmentObj.cls11TReg+','+this.indicatorEnrollmentObj.cls12TReg+'';
			chart += '|'+this.indicatorEnrollmentObj.clsKgTAct+','+this.indicatorEnrollmentObj.cls1TAct+','+this.indicatorEnrollmentObj.cls2TAct+','+this.indicatorEnrollmentObj.cls3TAct+','+this.indicatorEnrollmentObj.cls4TAct+','+this.indicatorEnrollmentObj.cls5TAct+','+this.indicatorEnrollmentObj.cls6TAct+','+this.indicatorEnrollmentObj.cls7TAct+','+this.indicatorEnrollmentObj.cls8TAct+','+this.indicatorEnrollmentObj.cls9TAct+','+this.indicatorEnrollmentObj.cls10TAct+','+this.indicatorEnrollmentObj.cls11TAct+','+this.indicatorEnrollmentObj.cls12TAct+'';

		this.indicatorEnrollmentChart = chart;
		
	}	
	//enrolment html
	this.getIndicatorEnrollmentHtml = function() {
		return this.indicatorEnrollmentHtml;
	}
	this.setIndicatorEnrollmentHtml = function() {
		
		var html = '<table width="100%">';
			//html += '<table width="100%">';
			html += '<tr><td align="center"><h2><span style="color:#A2C180;">Registered ('+numberWithCommas(this.indicatorEnrollmentObj.stuTotReg)+')</span><span class="darkgray"> vs. </span><span style="color:#3D7930;">Actual ('+numberWithCommas(this.indicatorEnrollmentObj.stuTotAct)+')</span><span class="darkgray"> Students</span></h2></td></tr>';		
			html += '<tr>';
				html += '<td align-"center">';
					html += '<div id="chartIndicator" align="center">';
						if(this.allSelected){		
							//chart title
							html += '<img title="Sindh" src="'+this.getIndicatorEnrollmentChart()+'"/>';
						}else if(this.districtSelected){
							//chart title sindh > district
							html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorEnrollmentChart()+'"/>';
						}else if(this.talukaDistrict){
							//chart title sindh > district > taluka		 
							html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorEnrollmentChart()+'"/>';		
						}
					html += '</div>';	
				html += '</td>';
			html += '</tr>';
			html += '</table>';	
			
			html += '</br>';			
			/**Grade breakdown*/
			html += '<table width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgray">by Grade</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="gray">Boys</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="gray">Girls</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="gray">Total</span></h2></td></tr>';
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgreen">Kg</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgMReg)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgFReg)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgTReg)+'</span></h2></td>';			
				html += '</tr>';
			html += '</table>';
			html += '<table width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">1</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">2</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">3</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">4</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">5</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5TReg)+'</span></h3></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgreen">Grades 1-5</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Male)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Female)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Total)+'</span></h2></td>';						
				html += '</tr>';
			html += '</table>';
			html += '<table width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">6</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">7</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">8</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8TReg)+'</span></h3></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgreen">Grades 6-8</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Male)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Female)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Total)+'</span></h2></td>';						
				html += '</tr>';
			html += '</table>';
			
			html += '<table width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">9</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">10</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10TReg)+'</span></h3></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgreen">Grades 9-10</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Male)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Female)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Total)+'</span></h2></td>';						
				html += '</tr>';
			html += '</table>';
			
			html += '<table width="100%" style="border-bottom: 1px solid #72A545;">';			
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">11</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11TReg)+'</span></h3></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="gray">12</span></h2></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12MReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12FReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h3><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12TReg)+'</span></h3></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><h2><span class="darkgreen">Grades 11-12</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Male)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Female)+'</span></h2></td>';
					html += '<td width="22%" align="center"><h2><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Total)+'</span></h2></td>';						
				html += '</tr>';			
			html += '</table>';
			
			html += '<table width="100%" style="padding: 15px 0px 0px 0px">';
				html += '<tr>';
					html += '<td width="30%" align="center"><h2 style="font-size:2.0em"><span class="darkgreen">Total</span></h2></td>';
					html += '<td width="22%" align="center"><h2 style="font-size:2.0em"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotMReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h2 style="font-size:2.0em"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotFReg)+'</span></h3></td>';
					html += '<td width="22%" align="center"><h2 style="font-size:2.0em"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotReg)+'</span></h3></td>';						
				html += '</tr>';
			html += '</table>';
		
		this.indicatorEnrollmentHtml = html;
		
	}	
	//enrolment PDF html
	this.getIndicatorEnrollmentPdfHtml = function() {
		return this.indicatorEnrollmentPdfHtml;
	}
	this.setIndicatorEnrollmentPdfHtml = function() {	
		
		var html = '<table width="100%">';
			//html += '<table width="100%">';
			html += '<tr><td align="center"><span style="color:#A2C180;">Registered ('+numberWithCommas(this.indicatorEnrollmentObj.stuTotReg)+')</span><span class="darkgray"> vs. </span><span style="color:#3D7930;">Actual ('+numberWithCommas(this.indicatorEnrollmentObj.stuTotAct)+')</span><span class="darkgray"> Students</span></td></tr>';		
			html += '<tr>';
				html += '<td align-"center">';
					html += '<div id="chartIndicator" align="center">';
						if(this.allSelected){		
							//chart title
							html += '<img title="Sindh" src="'+this.getIndicatorEnrollmentChart()+'" width="520px;"/>';
						}else if(this.districtSelected){
							//chart title sindh > district
							html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorEnrollmentChart()+'" width="520px;"/>';
						}else if(this.talukaDistrict){
							//chart title sindh > district > taluka		 
							html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorEnrollmentChart()+'" width="520px;"/>';		
						}
					html += '</div>';	
				html += '</td>';
			html += '</tr>';
			html += '</table>';	
			
			html += '</br>';			
			/**Grade breakdown*/
			html += '<table class="indTbl" width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgray">by Grade</span></td>';
					html += '<td width="22%" align="center"><span class="gray">Boys</span></td>';
					html += '<td width="22%" align="center"><span class="gray">Girls</span></td>';
					html += '<td width="22%" align="center"><span class="gray">Total</span></td></tr>';
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Kg</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgMReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgFReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.clsKgTReg)+'</span></td>';			
				html += '</tr>';
			html += '</table >';
			html += '<br/>';
			html += '<table class="indTbl" width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">1</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls1TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">2</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls2TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">3</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls3TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">4</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls4TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">5</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls5TReg)+'</span></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Grades 1-5</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Male)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Female)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group1_5Total)+'</span></td>';						
				html += '</tr>';
			html += '</table>';
			html += '<br/>';
			html += '<table class="indTbl" width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">6</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls6TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">7</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls7TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">8</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls8TReg)+'</span></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Grades 6-8</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Male)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Female)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group6_8Total)+'</span></td>';						
				html += '</tr>';
			html += '</table>';
			html += '<br/>';
			html += '<table class="indTbl" width="100%" style="border-bottom: 1px solid #f2f2f2;">';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">9</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls9TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">10</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls10TReg)+'</span></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Grades 9-10</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Male)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Female)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group9_10Total)+'</span></td>';						
				html += '</tr>';
			html += '</table>';
			html += '<br/>';
			html += '<table class="indTbl" width="100%" style="border-bottom: 2px solid #72A545;">';			
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">11</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls11TReg)+'</span></td>';	
				html += '</tr>';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="gray">12</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12MReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12FReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.cls12TReg)+'</span></td>';	
				html += '</tr>';
				//summary
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Grades 11-12</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Male)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Female)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgreen">'+numberWithCommas(this.indicatorEnrollmentObj.group11_12Total)+'</span></td>';						
				html += '</tr>';			
			html += '</table>';
			
			html += '<table class="indTbl" width="100%" style="padding: 5px 0px 0px 0px">';
				html += '<tr>';
					html += '<td width="30%" align="center"><span class="darkgreen">Total</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotMReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotFReg)+'</span></td>';
					html += '<td width="22%" align="center"><span class="darkgray">'+numberWithCommas(this.indicatorEnrollmentObj.stuTotReg)+'</span></td>';						
				html += '</tr>';
			html += '</table>';
		
		this.indicatorEnrollmentPdfHtml = html;
	}
	
	//admin data
	this.getIndicatorAdminObj = function() {
		return this.indicatorAdminObj;
	}
	this.setIndicatorAdminObj = function(tn) {
	
		var adminObj = new Object();
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_adm&output=json', false);
				//xmlhttp.open('GET', this.serverUrl+tn+'_ind_adm.json', 0);
				
				xmlhttp.send();
				
				//xmlhttp.onload = function() { 		
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					var json = $.parseJSON(xmlhttp.responseText);	
						
						if (json == null || typeof (json) == 'undefined'){
							json = $.parseJSON(json.firstChild.textContent);
						}
							//for(i=0;i<json.features.length;i++){
								adminObj.smcFuncYes = json.features[0].properties.smcFuncYes;
								adminObj.smcFuncNo = json.features[0].properties.smcFuncNo;
								adminObj.clsRmSize = json.features[0].properties.clsRmSize;
								adminObj.mTeacher = json.features[0].properties.mTeacher;
								adminObj.fTeacher = json.features[0].properties.fTeacher;
								adminObj.tTeacher = json.features[0].properties.tTeacher;
								adminObj.mUnTrained = json.features[0].properties.mUnTrained;
								adminObj.fUnTrained = json.features[0].properties.fUnTrained;
								adminObj.tUnTrained = json.features[0].properties.tUnTrained;					
								adminObj.mSupport = json.features[0].properties.mSupport;
								adminObj.fSupport = json.features[0].properties.fSupport;
								adminObj.tSupport = json.features[0].properties.tSupport;										
								adminObj.totalStudents = json.features[0].properties.totalStudents;
								adminObj.totalSchools = json.features[0].properties.totalSchools;
							//}
				//};
				//xmlhttp.send();
				
			} else {			
		
				$.ajax({type: 'GET', url: 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_adm&output=json', async: 0, dataType: 'json', success: function (json) {
				//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_adm.json', async: 0, dataType: 'json', success: function (json) {
						//for(i=0;i<json.features.length;i++){
							adminObj.smcFuncYes = json.features[0].properties.smcFuncYes;
							adminObj.smcFuncNo = json.features[0].properties.smcFuncNo;
							adminObj.clsRmSize = json.features[0].properties.clsRmSize;
							adminObj.mTeacher = json.features[0].properties.mTeacher;
							adminObj.fTeacher = json.features[0].properties.fTeacher;
							adminObj.tTeacher = json.features[0].properties.tTeacher;
							adminObj.mUnTrained = json.features[0].properties.mUnTrained;
							adminObj.fUnTrained = json.features[0].properties.fUnTrained;
							adminObj.tUnTrained = json.features[0].properties.tUnTrained;					
							adminObj.mSupport = json.features[0].properties.mSupport;
							adminObj.fSupport = json.features[0].properties.fSupport;
							adminObj.tSupport = json.features[0].properties.tSupport;										
							adminObj.totalStudents = json.features[0].properties.totalStudents;
							adminObj.totalSchools = json.features[0].properties.totalSchools;
						//}
					},
					error: function(xhr, textStatus, errorThrown){
						
					}					
				});
			}
		
		this.indicatorAdminObj = adminObj;
		
	}		
	//admin html
	this.getIndicatorAdminHtml = function() {
		return this.indicatorAdminHtml;
	}
	this.setIndicatorAdminHtml = function() {
		
		var html = '<div id="smcVal" align="left" style="z-index:999;position:absolute;padding:0px 0px 0px 360px;">';
					html += '<h2><span class="darkgray">SMC Functional</span></h2>';
			html += '</div>';
				html += '<div id="smcYesLbl" align="center" style="z-index:999;position:absolute;padding:30px 0px 0px 420px;"><h3 style="font-size:1.2em;">Yes</h3></div>';					
				html += '<div id="smcYesVal" align="center" style="z-index:999;position:absolute;padding:35px 0px 0px 390px;"><h2 style="font-size:4.1em;"><span class="green4">'+Math.round((this.indicatorAdminObj.smcFuncYes / this.indicatorAdminObj.totalSchools)*100)+'%</span></h2></div>';
			
				html += '<div id="smcNoLbl" align="center" style="z-index:999;position:absolute;padding:30px 0px 0px 560px;"><h3 style="font-size:1.2em;">No</h3></div>';					
				html += '<div id="smcNoVal" align="center" style="z-index:999;position:absolute;padding:35px 0px 0px 530px;"><h2 style="font-size:4.1em;"><span class="red3">'+Math.round((this.indicatorAdminObj.smcFuncNo / this.indicatorAdminObj.totalSchools)*100)+'%</span></h2></div>';
			
				html += '<div id="studentSqft" align="center" style="z-index:999;position:absolute;padding:120px 0px 0px 360px;"><table width="100%"><tr><td><h2 style="font-size:3.1em;"><span class="darkgray">1</span></h2></td><td><h2><span class="gray">Student</span></h2></td><td><h3 style="font-size:1.2em;"><span class="gray">per</span></h2></td><td><td><h2 style="font-size:4.1em;"><span class="green4">'+Math.round(Math.sqrt((this.indicatorAdminObj.clsRmSize / this.indicatorAdminObj.totalStudents)))+'</span></h2></td><td><h3 style="font-size:1.2em;"><span class="gray">Sq ft</span></h3></td></tr></table></div>';
				html += '<div id="studentTeacher" align="center" style="z-index:999;position:absolute;padding:180px 0px 0px 360px;"><table width="100%"><tr><td><h2 style="font-size:3.1em;"><span class="darkgray">1</span></h2></td><td><h2><span class="gray">Teacher</span></h2></td><td><h3 style="font-size:1.2em;"><span class="gray">for every</span></h2></td><td><td><h2 style="font-size:5.1em;"><span class="green4">'+Math.round((this.indicatorAdminObj.totalStudents / this.indicatorAdminObj.tTeacher))+'</span></h2></td><td><h3 style="font-size:1.2em;"><span class="gray">Students</span></h3></td></tr></table></div>';
				
			//var html = '';
			html += '<table width="100%">';
				html += '<tr>';
					html += '<td width="60%">';
						html += '<div id="chartHud">';
						html += '<table><tr><td align="right"><h2><span class="darkgray">School</span></h2></td><td><h2><span class="darkgray">Administration</span></h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.mTeacher)+'</span></h2></td><td><h2> Male Teachers</h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.fTeacher)+'</span></h2></td><td><h2> Female Teachers</h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tUnTrained)+'</span></h2></td><td><h2> Untrained Teachers</h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tTeacher+this.indicatorAdminObj.tUnTrained)+'</span></h2></td><td><h2> Total Teachers</h2></td></tr>';
							html += '<tr><td align="right"><h2></h2></td><td><h2><span class="darkgray">with</span></h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tSupport)+'</span></h2></td><td><h2> Support Staff</h2></td></tr>';
							html += '<tr><td align="right"><h2></h2></td><td><h2><span class="darkgray">for</span></h2></td></tr>';
							html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.totalStudents)+'</span></h2></td><td><h2> Total Students</h2></td></tr>';
							html += '<tr><td align="right"><h2 style="font-size: 2.1em;"><span class="green">'+numberWithCommas(this.indicatorAdminObj.totalSchools)+'</span></h2></td><td><h2><span class="darkgreen"> Total Schools</span></h2></td></tr>';
						html += '</table>';
						html += '</div>';
					html += '</td>';
					html +=	'<td width="40%">';
						
					html += '</td>';
				html += '</tr>';
			html += '</table>';
		
		this.indicatorAdminHtml = html;
		
	}	
	this.getIndicatorAdminPdfHtml = function(){
		return this.indicatorAdminPdfHtml;
	}
	this.setIndicatorAdminPdfHtml = function(){
		
		var html = '<div id="smcVal" align="left" style="z-index:999;position:absolute;padding:0px 0px 0px 345px;">';
			html += '<h2><span class="darkgray">SMC Functional</span></h2>';
			html += '</div>';
			html += '<div id="smcYesLbl" align="center" style="z-index:999;position:absolute;padding:30px 0px 0px 135px;"><h3>Yes</h3></div>';					
			html += '<div id="smcYesVal" align="center" style="z-index:999;position:absolute;padding:45px 0px 0px 145px;"><h1><span class="green4" style="font-size:42px;">'+Math.round((this.indicatorAdminObj.smcFuncYes / this.indicatorAdminObj.totalSchools)*100)+'%</span></h1></div>';
			
			html += '<div id="smcNoLbl" align="center" style="z-index:999;position:absolute;padding:30px 0px 0px 325px;"><h3>No</h3></div>';					
			html += '<div id="smcNoVal" align="center" style="z-index:999;position:absolute;padding:45px 0px 0px 335px;"><h1><span class="red3" style="font-size:42px;">'+Math.round((this.indicatorAdminObj.smcFuncNo / this.indicatorAdminObj.totalSchools)*100)+'%</span></h1></div>';
			
			html += '<table width="100%" class="indTbl" style="border-bottom:#f2f2f2 1px solid;">';
				html += '<tbody>';
					html += '<tr>';
						html += '<td width="40%">';
							html += '<table>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.mTeacher)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Male Teachers</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.fTeacher)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Female Teachers</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tUnTrained)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Untrained Teachers</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tTeacher+this.indicatorAdminObj.tUnTrained)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Total Teachers</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td width="50%" style="text-align:right;">';
										html += '<span class="darkgray"></span>';
									html += '</td>';
									html += '<td width="50%" style="text-align:left;">';
										html += '<span class="darkgray">with</span>';
									html += '</td>';						
								html += '</tr>';	
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.tSupport)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Support Staff</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td width="50%" style="text-align:right;">';
										html += '<span class="darkgray"></span>';
									html += '</td>';
									html += '<td width="50%" style="text-align:left;">';
										html += '<span class="darkgray">for</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
								html += '<td style="text-align:right;">';
									html += '<span class="darkgray">'+numberWithCommas(this.indicatorAdminObj.totalStudents)+'</span>';
								html += '</td>';
								html += '<td width="100%" style="text-align:left;">';
									html += '<span class="gray"> Total Students</span>';
								html += '</td>';						
							html += '</tr>';								
							html += '</table>';
						html += '</td>';
						html += '<td width="40%">';
							html += '<div id="studentSqft" align="right" style="z-index:999;position:absolute;padding:110px 0px 0px 20px;"><table class="indTbl" width="70%"><tr><td style="text-align:left;"><h1><span class="darkgray">1</span></h1></td><td><span class="gray">Student per</span></td><td><td><h1><span class="green4">'+Math.round(Math.sqrt((this.indicatorAdminObj.clsRmSize / this.indicatorAdminObj.totalStudents)))+'</span></h1></td><td><h3><span class="gray">Sq ft</span></h3></td></tr></table></div>';
							html += '<div id="studentTeacher" align="right" style="z-index:999;position:absolute;padding:150px 0px 0px 0px;"><table  class="indTbl" width="95%"><tr><td style="text-align:left;"><h1><span class="darkgray">1</span></h1></td><td><span class="gray">Teacher for every</span></td><td><td><h1><span class="green4">'+Math.round((this.indicatorAdminObj.totalStudents / this.indicatorAdminObj.tTeacher))+'</span></h1></td><td><h3><span class="gray">Students</span></h3></td></tr></table></div>';
						html += '</td>';						
					html += '</tr>';						
				html += '</tbody>';
			html += '</table>';
			html += '<table width="100%" class="indTbl" style="padding-left:20px;">';
				html += '<tbody>';	
					html += '<tr>';
						html += '<td style="text-align:right;">';
							html += '<span class="green">'+numberWithCommas(this.indicatorAdminObj.totalSchools)+'</span>';
						html += '</td>';
						html += '<td width="100%" style="text-align:left;">';
							html += '<span class="darkgreen"> Total Schools</span>';
						html += '</td>';						
					html += '</tr>';
				html += '</tbody>';					
			html += '</table>';
		
		this.indicatorAdminPdfHtml = html;
	}
	
	//infrastructure data
	this.getIndicatorBuildingObj = function() {
		return this.indicatorBuildingObj;
	}
	this.setIndicatorBuildingObj = function(tn) {
	
		var buildingObj = new Object();
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_bld&output=json', false);
			//xmlhttp.open('GET', this.serverUrl+tn+'_ind_bld.json', 0);
			
			xmlhttp.send();
				
				//xmlhttp.onload = function() { 		
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					var json = $.parseJSON(xmlhttp.responseText);
						
						if (json == null || typeof (json) == 'undefined'){
							json = $.parseJSON(json.firstChild.textContent);
						}
							//for(i=0;i<json.features.length;i++){
								buildingObj.excellent = json.features[0].properties.excellent;
								buildingObj.good = json.features[0].properties.good;
								buildingObj.fair = json.features[0].properties.fair;
								buildingObj.poor = json.features[0].properties.poor;
								buildingObj.veryPoor = json.features[0].properties.veryPoor;
								buildingObj.other = json.features[0].properties.other;
								buildingObj.totalSchools = json.features[0].properties.totalSchools;
							//}
				//};
				//xmlhttp.send();
				
			} else {
				$.ajax({type: 'GET', url:'data/php/sbep.ie.proxy.php?table='+tn+'_ind_bld&output=json', async: 0, dataType: 'json', success: function (json) {
				//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_bld.json', async: 0, dataType: 'json', success: function (json) {
						//for(i=0;i<json.features.length;i++){
							buildingObj.excellent = json.features[0].properties.excellent;
							buildingObj.good = json.features[0].properties.good;
							buildingObj.fair = json.features[0].properties.fair;
							buildingObj.poor = json.features[0].properties.poor;
							buildingObj.veryPoor = json.features[0].properties.veryPoor;
							buildingObj.other = json.features[0].properties.other;
							buildingObj.totalSchools = json.features[0].properties.totalSchools;
						//}
					},
					error: function(xhr, textStatus, errorThrown){
						
					}					
				});
				
		}
		
		this.indicatorBuildingObj = buildingObj;
		
	}
	//infrastructure chart
	this.getIndicatorBuildingChart = function() {
		return this.indicatorBuildingChart;
	}
	this.setIndicatorBuildingChart = function() {
	
		/**http://chart.apis.google.com/chart?chxr=0,0,300&chxt=y&chbh=25,25,25&chxt=x,y&chxl=0:|Primary|Middle|Elementary|High|High%20Secondary|Ghost&chs=400x225&cht=bvg&chco=A2C180&chds=0,300&chd=t:386,18,8,17,4,5*/
		
		var chart = "http://chart.apis.google.com/chart";
			chart += "?chs=400x150";
			chart += "&chds=0,"+Math.max(this.indicatorBuildingObj.excellent,this.indicatorBuildingObj.good,this.indicatorBuildingObj.fair,this.indicatorBuildingObj.poor,this.indicatorBuildingObj.veryPoor,this.indicatorBuildingObj.other)+"";
			chart += "&cht=p3";
			chart += "&chco=4d89f9,6599fa,7da9fb,FFC469,C67171";
			chart += "&chl=Excellent("+Math.round((this.indicatorBuildingObj.excellent / this.indicatorBuildingObj.totalSchools)*100)+"%)|Good("+Math.round((this.indicatorBuildingObj.good / this.indicatorBuildingObj.totalSchools)*100)+"%)|Fair("+Math.round((this.indicatorBuildingObj.fair / this.indicatorBuildingObj.totalSchools)*100)+"%)|Poor("+Math.round((this.indicatorBuildingObj.poor / this.indicatorBuildingObj.totalSchools)*100)+"%)|Very+Poor("+Math.round((this.indicatorBuildingObj.veryPoor / this.indicatorBuildingObj.totalSchools)*100)+"%)";
			chart += "&chd=t:"+this.indicatorBuildingObj.excellent+","+this.indicatorBuildingObj.good+","+this.indicatorBuildingObj.fair+","+this.indicatorBuildingObj.poor+","+this.indicatorBuildingObj.veryPoor+"";
			
		this.indicatorBuildingChart = chart;
		
	}
	//infrastructure html
	this.getIndicatorBuildingHtml = function() {
		return this.indicatorBuildingHtml;
	}
	this.setIndicatorBuildingHtml = function() {
		
		var html = '<div id="buildingLbl" style="z-index:999;position:absolute;padding:4px 0px 0px 320px;"><table><tr><td><h2 style="font-size:1.8em;"><span class="bld4">'+Math.round((this.indicatorBuildingObj.poor / this.indicatorBuildingObj.totalSchools)*100)+'%</span></h2></td><td><h3 style="font-size:1.0em;"> in Poor Condition</h3></td></tr></table></div>';
			html += '<table width="100%">';
			html += '<tr>';
			html += '<td width="40%">';
			html += '<div id="chartHud">';
			html += '<table><tr><td><h2><span class="darkgray">Building</span></h2></td><td><h2><span class="darkgray">Condition</span></h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.excellent)+'</span></h2></td><td><h2> Excellent</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.good)+'</span></h2></td><td><h2> Good</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.fair)+'</span></h2></td><td><h2> Fair</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.poor)+'</span></h2></td><td><h2> Poor</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.veryPoor)+'</td><td><h2> Very Poor</h2></td></tr>';
			html += '<tr><td align="right"><h2><span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.other)+'</span></h2></td><td><h2> N/A</h2></td></tr>';
			html += '<tr><td align="right"><h2 style="font-size: 2.1em;"><span class="green">'+numberWithCommas(this.indicatorBuildingObj.totalSchools)+'</span></h2></td><td><h2><span class="darkgreen"> Total Schools</span></h2></td></tr>';
			html += '</table>';
			html += '</div>';	
			html += '</td>';
			html +=	'<td width="60%">';
			html += '<div id="chartIndicator" align="left">';
			if(this.allSelected){		
				//chart title
				html += '<img title="Sindh" src="'+this.getIndicatorBuildingChart()+'"/>';
			}else if(this.districtSelected){
				//chart title sindh > district
				html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorBuildingChart()+'"/>';
			}else if(this.talukaDistrict){
				//chart title sindh > district > taluka		 
				html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorBuildingChart()+'"/>';		
		}													
		html += '</div>';
		html += '</td>';
		html += '</tr>';
		html += '</table>';

		
		this.indicatorBuildingHtml = html;
		
	}
	//infrastructure pdf html
	this.getIndicatorBuildingPdfHtml = function() {
		return this.indicatorBuildingPdfHtml;
	}
	this.setIndicatorBuildingPdfHtml = function() {
		
		var	html = '<div id="schoolLbl" style="z-index:999;position:absolute;padding:0px 0px 0px 220px;"><table><tr><td><h2><span class="bld4">'+Math.round((this.indicatorBuildingObj.poor / this.indicatorBuildingObj.totalSchools)*100)+'%</span></h2></td><td><h3><span class="gray"> in Poor Condition</span></h3></td></tr></table></div>';
			html += '<table width="100%" class="indTbl" style="border-bottom:#f2f2f2 1px solid;">';
				html += '<tbody>';
					html += '<tr>';
						html += '<td width="20%">';
							html += '<table>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.excellent)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Excellent</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.good)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Good</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.fair)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Fair</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.poor)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Poor</span>';
									html += '</td>';						
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.veryPoor)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Very Poor</span>';
									html += '</td>';						
								html += '</tr>';	
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorBuildingObj.other)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> N/A</span>';
									html += '</td>';						
								html += '</tr>';
							html += '</table>';
						html += '</td>';
						html += '<td width="50%">';
								html += '<div align="center">';
									if(this.allSelected){		
										//chart title
										html += '<img title="Sindh" src="'+this.getIndicatorBuildingChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
									}else if(this.districtSelected){
										//chart title sindh > district
										html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorBuildingChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
									}else if(this.talukaDistrict){
										//chart title sindh > district > taluka		 
										html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorBuildingChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';		
									}							
								html += '<div>';
						html += '</td>';						
					html += '</tr>';						
				html += '</tbody>';
			html += '</table>';
			html += '<table width="100%" class="indTbl">';
				html += '<tbody>';	
					html += '<tr>';
						html += '<td style="text-align:right;">';
							html += '<span class="green">'+numberWithCommas(this.indicatorBuildingObj.totalSchools)+'</span>';
						html += '</td>';
						html += '<td width="100%" style="text-align:left;">';
							html += '<span class="darkgreen"> Total Schools</span>';
						html += '</td>';						
					html += '</tr>';
				html += '</tbody>';					
			html += '</table>';		
			
		this.indicatorBuildingPdfHtml = html;
		
	}
	
	//DRR data
	this.getIndicatorDrrObj = function() {
		return this.indicatorDrrObj;
	}
	this.setIndicatorDrrObj = function(tn) {
	
		var drrObj = new Object();
		
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', 'data/php/sbep.ie.proxy.php?table='+tn+'_ind_drr&output=json', false);
				//xmlhttp.open('GET', this.serverUrl+tn+'_ind_drr.json', 0);
				
				xmlhttp.send();
				
				//xmlhttp.onload = function() { 		
				//if (xmlhttp.readyState==4 && xmlhttp.status==200){
					var json = $.parseJSON(xmlhttp.responseText);
						
						if (json == null || typeof (json) == 'undefined'){
							json = $.parseJSON(json.firstChild.textContent);
						}
							//for(i=0;i<json.features.length;i++){
								drrObj.floodAffected = json.features[0].properties.floodAffected;
								drrObj.schIndusKacha = json.features[0].properties.schIndusKacha;
								drrObj.riverHazard = json.features[0].properties.riverHazard;
								drrObj.landSlides = json.features[0].properties.landSlides;
								drrObj.indPolution = json.features[0].properties.indPolution;
								drrObj.otherHazard = json.features[0].properties.other;
								drrObj.totalHazards = drrObj.schIndusKacha+drrObj.riverHazard+drrObj.landSlides+drrObj.indPolution+drrObj.otherHazard;
								drrObj.totalSchools = json.features[0].properties.totalSchools;
							//}
				//};
				//xmlhttp.send();
				
			} else {			
		
				$.ajax({type: 'GET', url:'data/php/sbep.ie.proxy.php?table='+tn+'_ind_drr&output=json', async: 0, dataType: 'json', success: function (json) {
				//$.ajax({type: 'GET', url: this.serverUrl+tn+'_ind_drr.json', async: 0, dataType: 'json', success: function (json) {
						//for(i=0;i<json.features.length;i++){
							drrObj.floodAffected = json.features[0].properties.floodAffected;
							drrObj.schIndusKacha = json.features[0].properties.schIndusKacha;
							drrObj.riverHazard = json.features[0].properties.riverHazard;
							drrObj.landSlides = json.features[0].properties.landSlides;
							drrObj.indPolution = json.features[0].properties.indPolution;
							drrObj.otherHazard = json.features[0].properties.other;
							drrObj.totalHazards = drrObj.schIndusKacha+drrObj.riverHazard+drrObj.landSlides+drrObj.indPolution+drrObj.otherHazard;
							drrObj.totalSchools = json.features[0].properties.totalSchools;
						//}
					},
					error: function(xhr, textStatus, errorThrown){
						
					}					
				});
				
		}
		
		this.indicatorDrrObj = drrObj;
		
	}
	//DRR chart
	this.getIndicatorDrrChart = function() {
		return this.indicatorDrrChart;
	}
	this.setIndicatorDrrChart = function() {
	
	/**http://chart.apis.google.com/chart?chxr=0,0,300&chxt=y&chbh=25,25,25&chxt=x,y&chxl=0:|Primary|Middle|Elementary|High|High%20Secondary|Ghost|Other&chs=400x225&cht=bvg&chco=A2C180&chds=0,300&chd=t:386,18,8,17,4,5,9*/
		
	var chart = "http://chart.apis.google.com/chart";
		chart += "?chs=410x145";
		chart += "&chds=0,"+Math.max(this.indicatorDrrObj.schIndusKacha,this.indicatorDrrObj.landSlides,this.indicatorDrrObj.indPolution,this.indicatorDrrObj.otherHazard,this.indicatorDrrObj.riverHazard)+"";
		chart += "&cht=p3";
		chart += "&chco=C67171,B22222";
		chart += "&chl=Ind.+Polution("+Math.round((this.indicatorDrrObj.indPolution / this.indicatorDrrObj.totalHazards)*100)+"%)|Landslides("+Math.round((this.indicatorDrrObj.landSlides / this.indicatorDrrObj.totalHazards)*100)+"%)|River+Hzd("+Math.round((this.indicatorDrrObj.riverHazard / this.indicatorDrrObj.totalHazards)*100)+"%)|Indus+Kacha("+Math.round((this.indicatorDrrObj.schIndusKacha / this.indicatorDrrObj.totalHazards)*100)+"%)|Other+Hzd("+Math.round((this.indicatorDrrObj.otherHazard / this.indicatorDrrObj.totalHazards)*100)+"%)";
		chart += "&chd=t:"+this.indicatorDrrObj.indPolution+","+this.indicatorDrrObj.landSlides+","+this.indicatorDrrObj.riverHazard+","+this.indicatorDrrObj.schIndusKacha+","+this.indicatorDrrObj.otherHazard+"";
		
		this.indicatorDrrChart = chart;
		
	}
	//DRR html
	this.getIndicatorDrrHtml = function() {
		return this.indicatorDrrHtml;
	}
	this.setIndicatorDrrHtml = function() {
		
		if(this.allSelected || this.districtSelected){
			var html = '<div id="floodLbl" style="z-index:999;position:absolute;padding:4px 0px 0px 320px;"><table><tr><td><h2 style="font-size:1.8em;"><span class="bluegray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h2></td><td><h3 style="font-size:1.0em;"> Flood Affected</h3></td></tr></table></div>';
		}else{
			if((!this.indicatorDrrObj.floodAffected) &&
					(!this.indicatorDrrObj.indPolution) &&
					(!this.indicatorDrrObj.landSlides) &&
					(!this.indicatorDrrObj.riverHazard) &&
					(!this.indicatorDrrObj.schIndusKacha) &&
					(!this.indicatorDrrObj.otherHazard)){
				var html = '<div id="floodLbl" style="z-index:999;position:absolute;padding:0px 0px 0px 0px;"><table><tr><td><h2 style="font-size:14.8em;padding:0px 0px 0px 325px"><span class="darkgray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h2></td></tr></table></div>';
			}else{
				var html = '<div id="floodVal" align="left" style="z-index:999;position:absolute;padding:0px 0px 0px 490px;"><h2 style="font-size:7.1em;"><span class="bluegray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h2></div>';
					html += '<div id="floodLbl" style="z-index:999;position:absolute;padding:49px 0px 0px 580px;"><h3 style="font-size:1.2em;">Flood Affected</h3></div>';
					
					html += '<div id="indusVal" align="left" style="z-index:999;position:absolute;padding:50px 0px 0px 290px;"><h2 style="font-size:7.1em;"><span class="green4">'+Math.round((this.indicatorDrrObj.schIndusKacha / this.indicatorDrrObj.totalSchools)*100)+'%</span></h2></div>';
					html += '<div id="indusLbl" style="z-index:999;position:absolute;padding:99px 0px 0px 380px;"><h3 style="font-size:1.2em;">in Indus Kacha</h4></div>';
					html += '<div id="otherVal" align="left" style="z-index:999;position:absolute;padding:130px 0px 0px 460px;"><h2 style="font-size:7.1em;"><span class="green4">'+Math.round((this.indicatorDrrObj.otherHazard / this.indicatorDrrObj.totalSchools)*100)+'%</span></h2></div>';
					html += '<div id="otherLbl" style="z-index:999;position:absolute;padding:179px 0px 0px 550px;"><h3 style="font-size:1.2em;">Other Hazards</h3></div>';
			}
		}
		html += '<table width="100%">';
			html += '<tr>';
				html += '<td width="40%">';
					html += '<div id="chartHud">';
					html += '<table><tr><td align="right" width="15%"><h2><span class="darkgray">DRR</span></h2></td><td><h2><span class="darkgray">Assessment</span></h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.floodAffected)+'</span></h2></td><td><h2> Flood Affected</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.indPolution)+'</span></h2></td><td><h2> Industrial Polution</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.landSlides)+'</span></h2></td><td><h2> Landslides</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.riverHazard)+'</td><td><h2> River Hazard</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.schIndusKacha)+'</span></h2></td><td><h2> in Indus Kacha</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2><span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.otherHazard)+'</span></h2></td><td><h2> Other Hazard</h2></td></tr>';
						html += '<tr><td align="right" width="15%"><h2 style="font-size: 2.1em;"><span class="green">'+numberWithCommas(this.indicatorDrrObj.totalSchools)+'</span></h2></td><td><h2><span class="darkgreen"> Total Schools</span></h2></td></tr>';
					html += '</table>';
					html += '</div>';
				html += '</td>';
				html +=	'<td width="60%">';
				if(this.allSelected || this.districtSelected){
					html += '<div id="chartIndicator" align="left">';
					if(this.allSelected){		
						//chart title
						html += '<img title="Sindh" src="'+this.getIndicatorDrrChart()+'"/>';
					}else if(this.districtSelected){
						//chart title sindh > district
						html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorDrrChart()+'"/>';
					}else if(this.talukaDistrict){
						//chart title sindh > district > taluka		 
						html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorDrrChart()+'"/>';		
					}													
					html += '</div>';					
				}
				html += '</td>';
			html += '</tr>';
		html += '</table>';
		
		this.indicatorDrrHtml = html;
		
	}	
	//DRR html
	this.getIndicatorDrrPdfHtml = function() {
		return this.indicatorDrrPdfHtml;
	}
	this.setIndicatorDrrPdfHtml = function() {
		
		if(this.allSelected || this.districtSelected){
			var html = '<div id="floodLbl" style="z-index:999;position:absolute;padding:0px 0px 0px 220px;"><table><tr><td><h1><span class="bluegray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h1></td><td><h3><span class="gray"> Flood Affected</span></h3></td></tr></table></div>';
		}else{
			
			if((!this.indicatorDrrObj.floodAffected) &&
					(!this.indicatorDrrObj.indPolution) &&
					(!this.indicatorDrrObj.landSlides) &&
					(!this.indicatorDrrObj.riverHazard) &&
					(!this.indicatorDrrObj.schIndusKacha) &&
					(!this.indicatorDrrObj.otherHazard)){
				var html = '';
			}else{
			
				var html = '<div id="floodVal" align="left" style="z-index:999;position:absolute;padding:0px 0px 0px 320px;valign: top;"><h1 style="font-size:42px;"><span class="bluegray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h1></div>';
					html += '<div id="floodLbl" style="z-index:999;position:absolute;padding:25px 0px 0px 240px;"><h3><span class="gray">Flood Affected</span></h3></div>';
					html += '<div id="indusVal" align="left" style="z-index:999;position:absolute;padding:37px 0px 0px 270px;valign: top;"><h1 style="font-size:42px;"><span class="green4">'+Math.round((this.indicatorDrrObj.schIndusKacha / this.indicatorDrrObj.totalSchools)*100)+'%</span></h1></div>';
					html += '<div id="indusLbl" style="z-index:999;position:absolute;padding:65px 0px 0px 150px;"><h3><span class="gray">in Indus Kacha</span></h3></div>';
					html += '<div id="otherVal" align="left" style="z-index:999;position:absolute;padding:80px 0px 0px 326px;valign: top;"><h1 style="font-size:42px;"><span class="green4">'+Math.round((this.indicatorDrrObj.otherHazard / this.indicatorDrrObj.totalSchools)*100)+'%</span></h1></div>';
					html += '<div id="otherLbl" style="z-index:999;position:absolute;padding:105px 0px 0px 246px;"><h3><span class="gray">Other Hazards</span></h3></div>';
			}
		}	
				
			html += '<table width="100%" class="indTbl" style="border-bottom:#f2f2f2 1px solid;">';
				html += '<tbody>';
					html += '<tr>';
						html += '<td width="20%">';
							html += '<table>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.floodAffected)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Flood Affected</span>';
									html += '</td>';
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.indPolution)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Industrial Polution</span>';
									html += '</td>';
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.landSlides)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Landslides</span>';
									html += '</td>';
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.riverHazard)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> River Hazard</span>';
									html += '</td>';
								html += '</tr>';	
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.schIndusKacha)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> in Indus Kacha</span>';
									html += '</td>';
								html += '</tr>';
								html += '<tr>';
									html += '<td style="text-align:right;">';
										html += '<span class="darkgray">'+numberWithCommas(this.indicatorDrrObj.otherHazard)+'</span>';
									html += '</td>';
									html += '<td width="100%" style="text-align:left;">';
										html += '<span class="gray"> Other</span>';
									html += '</td>';
								html += '</tr>';
							html += '</table>';
						html += '</td>';
						html += '<td width="50%">';
						
						if(this.allSelected || this.districtSelected){
							html += '<div align="center">';
							if(this.allSelected){		
								//chart title
								html += '<img title="Sindh" src="'+this.getIndicatorDrrChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
							}else if(this.districtSelected){
								//chart title sindh > district
								html += '<img title="Sindh > '+this.getTitle()+' District Summary" src="'+this.getIndicatorDrrChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';
							}else if(this.talukaDistrict){
								//chart title sindh > district > taluka		 
								html += '<img title="Sindh > '+this.getTalukaDistrict()+' District > '+this.getTitle()+' Summary" src="'+this.getIndicatorDrrChart()+'" width="360px" style="padding:30px 0px 0px 0px"/>';		
							}										
							html += '</div>';					
						}else if((!this.indicatorDrrObj.floodAffected) &&
								(!this.indicatorDrrObj.indPolution) &&
								(!this.indicatorDrrObj.landSlides) &&
								(!this.indicatorDrrObj.riverHazard) &&
								(!this.indicatorDrrObj.schIndusKacha) &&
								(!this.indicatorDrrObj.otherHazard)){
							html += '<div id="floodLbl" style="z-index:999;position:absolute;padding:0px 0px 0px 0px;" align="center"><table align="center"><tr><td valign="top"><h1 style="font-size:86px;padding:0px 0px 0px 0px;valign:top;"><span class="darkgray">'+Math.round((this.indicatorDrrObj.floodAffected / this.indicatorDrrObj.totalSchools)*100)+'%</span></h1></td></tr></table></div>';
						}

						html += '</td>';						
					html += '</tr>';						
				html += '</tbody>';
			html += '</table>';
			html += '<table width="100%" class="indTbl" style="padding-left:0px;">';
				html += '<tbody>';	
					html += '<tr>';
						html += '<td style="text-align:right;">';
							html += '<span class="green">'+numberWithCommas(this.indicatorDrrObj.totalSchools)+'</span>';
						html += '</td>';
						html += '<td width="100%" style="text-align:left;">';
							html += '<span class="darkgreen"> Total Schools</span>';
						html += '</td>';						
					html += '</tr>';
				html += '</tbody>';					
			html += '</table>';
			
		this.indicatorDrrPdfHtml = html;
	}
		
	
	//generate PDF
	this.getIndicatorPdf = function(){
		
		messiBoxPdf = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>PDF indicator summary loading...</td></tr></table></div>', {autoclose: 5000, modal: true, closeButton:true, closeButton:0, width: '350px'});
		
		if(!this.indicatorSchoolHtml){
			this.setIndicatorSchoolObj(this.tableName);
			this.setIndicatorSchoolChart();
			this.setIndicatorSchoolHtml();
			this.setIndicatorSchoolPdfHtml();
		}
		if(!this.indicatorEnrollmentHtml){
			this.setIndicatorEnrollmentObj(this.tableName);
			this.setIndicatorEnrollmentChart();
			this.setIndicatorEnrollmentHtml();
			this.setIndicatorEnrollmentPdfHtml();
		}
		if(!this.indicatorAdminHtml){
			this.setIndicatorAdminObj(this.tableName);
			this.setIndicatorAdminHtml();
			this.setIndicatorAdminPdfHtml();
		}
		if(!this.indicatorBuildingHtml){
			this.setIndicatorBuildingObj(this.tableName);
			this.setIndicatorBuildingChart();
			this.setIndicatorBuildingHtml();
			this.setIndicatorBuildingPdfHtml();
		}
		if(!this.indicatorDrrHtml){
			this.setIndicatorDrrObj(this.tableName);
			this.setIndicatorDrrChart();
			this.setIndicatorDrrHtml();
			this.setIndicatorDrrPdfHtml();
		}
		
		//call to generate Pdf
		downloadIndPdf(this.allSelected,this.talukaDistrict,this.taluka,this.title,this.indicatorSchoolPdfHtml,this.indicatorEnrollmentPdfHtml,this.indicatorAdminPdfHtml,this.indicatorBuildingPdfHtml,this.indicatorDrrPdfHtml);
		
	}
	
	//use proxy, grab KML
	this.getIndicatorKml = function(){
		
		messiBoxKml = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Preparing KML...</td></tr></table></div>', {autoclose: 7600, modal: true, closeButton:true, closeButton:0, width: '350px'});
		
		//proxy to get GeoServer KML
		//window.open('http://sbep.gos.pk:8080/geoserver/sbep/wms?service=WMS&version=1.1.0&request=GetMap&styles=&bbox=67.6485595703125,26.5732574462891,67.9213562011719,27.1737804412842&width=232&height=512&srs=EPSG:4326&format=application%2Fvnd.google-earth.kml%2Bxml&layers=sbep:'+this.tableName,'_blank');
		getDownload('http://sbep.gos.pk:8080/geoserver/sbep/wms?service=WMS&version=1.1.0&request=GetMap&styles=&bbox=54.1,14.5,81.5,39.1&width=232&height=512&srs=EPSG:4326&format=application%2Fvnd.google-earth.kml%2Bxml&layers=sbep:'+this.tableName);
		
		//messiBoxKml.hide();		
	}	
	
	//use proxy, grab CSV
	this.getIndicatorCsv = function(){
		
		messiBoxCsv = new Messi('<div align="center"><table align="center"><tr><td align="left"><img width="32" src="images/al_loading.gif"/></td><td>Preparing CSV...</td></tr></table></div>', {autoclose: 7600, modal: true, closeButton:true, closeButton:0, width: '350px'});
		
		//proxy to get GeoServer KML
		//window.open('http://sbep.gos.pk:8080/geoserver/sbep/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50000&typeName=sbep:'+this.tableName+'&outputFormat=csv','_blank');
		getDownload('http://sbep.gos.pk:8080/geoserver/sbep/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=20000&typeName=sbep:'+this.tableName+'&outputFormat=csv');
		
		//messiBoxCsv.hide();
		
	}		
	
	//school lon
	this.getLon = function() {
		return this.lon;
	}
	this.setLon = function(lon) {
		
		this.lon = lon;
		
	}
	//school lat
	this.getLat = function() {
		return this.lat;
	}
	this.setLat = function(lat) {
		
		this.lat = lat;
		
	}	
	//school zoom
	this.getZoom = function() {
		return this.zoom;
	}
	this.setZoom = function(zoom) {
		
		this.zoom = zoom;
		
	}
	//school schools
	this.getSchools = function() {
		return this.schools;
	}
	this.setSchools = function(schools) {
		
		this.schools = schools;
		
	}	
	//school boys
	this.getBoys = function() {
		return this.boys;
	}
	this.setBoys = function(boys) {
		
		this.boys = boys;
		
	}	
	//school girls
	this.getGirls = function() {
		return this.girls;
	}
	this.setGirls = function(girls) {
		
		this.girls = girls;
		
	}
	//school totalStudents
	this.getTotalStudents = function() {
		return this.totalStudents;
	}
	this.setTotalStudents = function(totalStudents) {
		
		this.totalStudents = totalStudents;
		
	}
	//school totalStudents
	this.getPointRadius = function() {
		return this.pointRadius;
	}
	this.setPointRadius = function(pointRadius) {
		
		this.pointRadius = pointRadius;
		
	}

	//OpenLayers
	this.getLayer = function() {
		return this.layer;
	}
	this.setLayer = function(layer) {
		
		//create indicator layer
		
		this.layer = layer;
		
	}	
}