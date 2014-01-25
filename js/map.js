


/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[mappanel-div]
 *  Map Panel
 *  ---------
 *  Render a map panel in any block level page element.
 */
 
 
 var idecan = new Object();
idecan.PanZoom = OpenLayers.Class(OpenLayers.Control.PanZoom, {

        bounds: null,

        initialize: function(options) {
            this.position = new OpenLayers.Pixel(OpenLayers.Control.PanZoom.X,
                                                 OpenLayers.Control.PanZoom.Y);

            // if (arguments[0].bounds)
                // this.bounds = arguments[0].bounds;
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
        },

        includeButtons: {
        	"panup": {
        		outImageSrc: "north-mini.png",
                overImageSrc: "north-mini.png"
        	},
        	"panleft":{
        		outImageSrc: "west-mini.png",
                overImageSrc: "west-mini.png"
        	},
        	"panright":{
        		outImageSrc: "east-mini.png",
                overImageSrc: "east-mini.png"
        	},
        	"pandown":{
        		outImageSrc: "south-mini.png",
                overImageSrc: "south-mini.png"
        	},
            "zoomin": {
                outImageSrc: "zoom-plus-mini.png",
                overImageSrc: "zoom-plus-mini.png"
            },
            "zoomout": {
                outImageSrc: "zoom-minus-mini.png",
                overImageSrc: "zoom-minus-mini.png"
            },
            "zoomworld": {
                outImageSrc: "zoom-world-mini.png",
                overImageSrc: "zoom-world-mini.png"
            }
        },

        makeMouseCallback: function(id, state) {
            var selector = state + "ImageSrc";
            var src = OpenLayers.Util.getImagesLocation() + this.includeButtons[id][selector];
            return function(evt) {
                var img = this.firstChild;
                if (img.src != src) {
                    img.src = src;
                }
            };
        },

        _addButton: function(id, img, xy, sz) {

            if (id in this.includeButtons) {
                var src = this.includeButtons[id].outImageSrc;
                var size = new OpenLayers.Size(18,18);
                var btn = OpenLayers.Control.PanZoom.prototype._addButton.call(this, id, src, xy, size);

                if (this.bounds) {
                    var bounds = this.bounds;
                    var getBounds = function() {
                        return bounds;
                    };
                    btn.getBounds = getBounds;
                }

                // btn.className = this.displayClass + id.capitalize();
                btn._btnId = id;
                OpenLayers.Event.observe(btn, "mouseover", OpenLayers.Function.bindAsEventListener(this.makeMouseCallback(id, "over"), btn));
                OpenLayers.Event.observe(btn, "mouseout", OpenLayers.Function.bindAsEventListener(this.makeMouseCallback(id, "out"), btn));
                return btn;
            }
        },

        buttonDown: function (evt) {
            if (!OpenLayers.Event.isLeftClick(evt)) {
                return;
            }

            switch (this.action) {
                case "panup": 
                    this.map.pan(0, -this.getSlideFactor("h"));
                    break;
                case "pandown": 
                    this.map.pan(0, this.getSlideFactor("h"));
                    break;
                case "panleft": 
                    this.map.pan(-this.getSlideFactor("w"), 0);
                    break;
                case "panright": 
                    this.map.pan(this.getSlideFactor("w"), 0);
                    break;
                case "zoomin": 
                    this.map.zoomIn(); 
                    break;
                case "zoomout": 
                    this.map.zoomOut(); 
                    break;
                case "zoomworld":
                    if (map.center) 
                        map.setCenter(idecan.center, idecan.zoom);
                    else
                        this.map.zoomToMaxExtent(); 
                    getIndicatorObj('schools_sindh_province');
                    break;
            }

            OpenLayers.Event.stop(evt);
        },

        CLASS_NAME: "idecan.PanZoom"
    });
 
 
 var popup = true;
 var flexCount = 0;
 var messiCatchmentBox;
 var catchmentSummary = new Array();

var schoolsAddedArr = new Array();

var schools_d_style = new OpenLayers.Style({pointRadius: 12,externalGraphic: 'images/schools.png'});
var schools_s_style = new OpenLayers.Style({pointRadius: 18,externalGraphic: 'images/schools-select.png'});
var schoolsStyleMap = new OpenLayers.StyleMap({
	'default':schools_d_style,
	'select':schools_s_style
});


//default style
var d_style = new OpenLayers.Style({
	fillColor: "#65944A",
	fillColor: "#000",
	strokeColor: "#759262",
	fillOpacity: 0.7,
	strokeWidth: 3,
	label: "${label}",
    //fontFamily: "Arial",
	fontFamily: "Arial",
    fontWeight: "bold",
	fontColor: "#fff",
	fontSize: "12px",
	pointRadius: "${pointRadius}"
});
var s_style = new OpenLayers.Style({
	fillColor: "#65944A",
	//strokeColor: "#FFF",
	strokeColor: "#759262",
	fillOpacity: 0.5,
	strokeWidth: 3,
	label: "${label}",
    fontFamily: "Arial",
    fontWeight: "bold",
	fontColor: "#fff",
	fontSize: "24px",
	pointRadius: "${pointRadius}"
});

var indStyleMap = new OpenLayers.StyleMap({
	'default':d_style,
	'select':s_style
});

//map layers
var map,layerGoogle;

var layerSchools = new OpenLayers.Layer.Vector("Schools",{
	projection: new OpenLayers.Projection("EPSG:4326"),
	styleMap: schoolsStyleMap
});

var layerSindh = new OpenLayers.Layer.Vector("Sindh",{
	styleMap: indStyleMap
});

var layerClickSelect = new OpenLayers.Control.SelectFeature([layerSchools,layerSindh], {
	clickout: true,
	onSelect: layerClickSelectMain
});	

// Create a select feature control and add it to the map.
var layerHoverSelect = new OpenLayers.Control.SelectFeature([layerSchools,layerSindh], {
	hover: true,
	highlightOnly: true,
	//renderIntent: "temporary",
	eventListeners: {
		beforefeaturehighlighted: layerHoverSelectMain,
		featurehighlighted: layerHoverSelectMain,
		featureunhighlighted: layerHoverSelectMain
	}
});

var layerRadius = new OpenLayers.Layer.Vector("Catchment",{
		styleMap: new OpenLayers.StyleMap({
			'default': new OpenLayers.Style({
				fillColor: "#FF7722",
				strokeColor: "#FF7722",
				fillOpacity: 0.4
			})
		})
	});

var layerFlood2012 = new OpenLayers.Layer.WMS("2012 Flood", "http://www.oasispakistan.pk/php/getmap.php", {
	layers: "flood_20121001", 
	transparent: true,
	text : "2012 Flood",
	group : "Base Layers",
	styleMap: new OpenLayers.Style({
		fillColor: "#003399",
		//strokeColor: "#FFF",
		strokeColor: "#003399",
		fillOpacity: 0.5,
		strokeWidth: 1
	})
},{
	isBaseLayer : false,
	visibility : true,
	singleTile : false
});

var layerFlood2011 = new OpenLayers.Layer.WMS("2011 Flood", "http://210.56.8.110:8989/geoserver/wms?", {
	transparent: true,
	layers: "sbep:flood_2011",
	format: "image/png"
},{
	reproject: true,
	isBaseLayer : false,
	visibility : true,
	singleTile : false
});

var layerFlood2010 = new OpenLayers.Layer.WMS("2010 Flood", "http://210.56.8.110:8989/geoserver/wms?", {
	transparent: true,
	layers: "sbep:flood_2010",
	format: "image/png"
},{
	reproject: true,
	isBaseLayer : false,
	visibility : true,
	singleTile : false
});

//map controls
var controls = [];
//4326 options
var bounds4326 = new OpenLayers.Bounds(-180,-90,180,90);
var options4326 = {
	units: 'degrees',
	projection: new OpenLayers.Projection("EPSG:4326"),
	displayProjection: new OpenLayers.Projection("EPSG:4326"),
	controls: controls
};
//900913 options
var bounds900913 = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
var options900913 = {
	numZoomLevels: 17, 
	projection: new OpenLayers.Projection("EPSG:900913"),
	displayProjection: new OpenLayers.Projection("EPSG:4326"),
	units: "m",
	maxResolution: 156543.0339,
	maxExtent: bounds900913,
	restrictedExtent: bounds900913,
	controls: controls
};

var extent = new OpenLayers.Bounds(52, 18, 88, 41).transform(options4326.projection, options900913.projection);

function initMap(){
	
	//Google
    layerGoogle = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN},
		{isBaseLayer: true}
    );
	map = new OpenLayers.Map('mappanel',new OpenLayers.Map(options900913));
	map.addLayer(layerGoogle);
	map.addLayer(layerSindh);
	map.addLayer(layerSchools);
	//map.addLayer(layerFlood2010);
	//map.addLayer(layerFlood2011);
	//map.addLayer(layerFlood2012);
	
	//school summary vector features
	map.addControl(new OpenLayers.Control.Navigation({zoomWheelEnabled: false}));
	map.addControl(new idecan.PanZoom());
	//map.addControl(new OpenLayers.Control.PanZoom());
	map.addControl(new OpenLayers.Control.MousePosition());
	map.setOptions({restrictedExtent: extent});
	map.setCenter(new OpenLayers.LonLat(68.4, 27.5).transform(options4326.projection, options900913.projection),7);
	
	
    map.events.register('zoomend', this, function (event) {
		var x = map.getZoom();
		
		if( x < 6){
			map.setCenter(new OpenLayers.LonLat(68.4, 27.5).transform(options4326.projection, options900913.projection),6);
		}
    });
    
	map.addControl(layerHoverSelect);
	layerHoverSelect.activate();
	
	map.addControl(layerClickSelect);
	layerClickSelect.activate();    
	
}

function clearLayerFeatures(){
	if(layerSchools){
		layerSchools.removeAllFeatures();
	}
	if(layerRadius){
		layerRadius.removeAllFeatures();
	}
}

function addSchoolMain(messiCatchmentHtml, aData){

	clearLayerFeatures();
	
	if(messiCatchmentHtml){
		messiCatchmentBox = new Messi(messiCatchmentHtml, {modal: true, closeButton:true, width: '300px'});
	}else{
		addSchoolVector(aData);
		var messiTableBox = new Messi('<div align="center"><table align="center"><tr><td align="left"><img src="images/drop-add.gif"/></td><td> '+aData[0]+' added to map</td></tr></table></div>', {autoclose: '3500', modal: false, closeButton:true, width: '350px'});
	}
}

function addSchoolVector(aData){
	if (aData!=undefined){
		var feature = addSchoolFeature(aData);		
		//create data object for zoom function
		var data = new Object();
		data.lon = feature.geometry.x;
		data.lat = feature.geometry.y;
		data.zoom = 15;	
		zoomMap(data);
		
		//hover select to update panel and click select to highlight
		layerHoverSelect.select(feature);
		layerHoverSelect.unselect(feature);
		popup = false;
		layerClickSelect.select(feature);
		popup = true;
	}	
}

function addSchoolFeature(tblDataRow){
	// console.log(tblDataRow);
	if (tblDataRow!=undefined){
		var wkt = new OpenLayers.Format.WKT();
		var features = wkt.read(tblDataRow[15]);
		var geom = new OpenLayers.Geometry.Point(features.geometry.x, features.geometry.y).transform(options4326.projection, options900913.projection);
		//process images
		var imgUrl = new Array();
		var imgStr = tblDataRow[16].split(';');
		var m = 0;
		for(n=0;n<imgStr.length; n++){
			if ((imgStr[n].indexOf("zip") == -1) && (imgStr[n].indexOf("pptx") == -1)){
				imgUrl[m] = imgStr[n];
				m++;
			}
		}
		// console.log(tblDataRow[10]);
		
		var attributes = {semisCode: tblDataRow[0], schName: tblDataRow[1], schType: tblDataRow[2], schGender: tblDataRow[3], ghostSchool: tblDataRow[4], smcFunctional: tblDataRow[5], bCondition: tblDataRow[6], plotSize: tblDataRow[7], stuTotReg: tblDataRow[8], tTeacher: tblDataRow[9], district: tblDataRow[21], tehsil: tblDataRow[22], comments: tblDataRow[10], imagesUrl: imgUrl, unionCouncil : tblDataRow[23], village : tblDataRow[24]};
		var feature = new OpenLayers.Feature.Vector(geom, attributes);
		layerSchools.addFeatures(feature);
		schoolsAddedArr.push(tblDataRow[0]);
		
		return feature;
	}	
}

function addCatchment(semisCode, catchment){
	var semisCodeSearch = semisCode+'|';
	messiCatchmentBox.hide();
	// messiBoxBegin.show();
	var catchmentDisplay,semisString;
	catchmentSummary['schools'] = 0;
	catchmentSummary['students'] = 0;
	catchmentSummary['teachers'] = 0;
	catchmentSummary['plotSizeAve'] = 0;	
	
	// tblData = tableObj.getIndicatorSchoolTableData();
	
	if (catchment == 111){
		catchmentDisplay = 100;
		semisString = aData[17];
	}else if(catchment == 555){
		catchmentDisplay = 500;
		semisString = aData[18];
	}else if(catchment == 1111){
		catchmentDisplay = 1000;			
		semisString = aData[19];
	}else if(catchment == 1555){
		catchmentDisplay = 1500;
		semisString = aData[20];
	}
	
	if (navigator.appName == 'Microsoft Internet Explorer'){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET', 'data/php/sbep.getSemisRow.php?semisString='+semisString, false);
		xmlhttp.send();
		
		var json = $.parseJSON(xmlhttp.responseText);
			
		if (json == null || typeof (json) == 'undefined'){
			json = $.parseJSON(data.firstChild.textContent);
		}
			
					for(i=0;i<json.length;i++){
					
						var schoolTableData = new Array();
						schoolTableData[0] = json[i].semisCode;
						schoolTableData[1] = json[i].schName;
						schoolTableData[2] = json[i].schType;
						schoolTableData[3] = json[i].schGender;
						schoolTableData[4] = json[i].ghostSchool;
						schoolTableData[5] = json[i].smcFunctional;
						schoolTableData[6] = json[i].bCondition;
						schoolTableData[7] = json[i].plotSize;
						schoolTableData[8] = json[i].stuTotReg;
						schoolTableData[9] = json[i].tTeacher;
						schoolTableData[10] = json[i].comments;
						schoolTableData[11] = json[i].sch100m;	
						schoolTableData[12] = json[i].sch500m;
						schoolTableData[13] = json[i].sch1000m;	
						schoolTableData[14] = json[i].sch1500m;	
						//not displayed
						schoolTableData[15] = json[i].the_geom;
						schoolTableData[16] = json[i].imagesUrl;
						schoolTableData[17] = json[i].sch100mId;
						schoolTableData[18] = json[i].sch500mId;	
						schoolTableData[19] = json[i].sch1000mId;	
						schoolTableData[20] = json[i].sch1500mId;
						
						schoolTableData[21] = json[i].district;
						schoolTableData[22] = json[i].tehsil;
						schoolTableData[23] = json[i].unionCouncil;
						schoolTableData[24] = json[i].village;
						
						catchmentSummary['schools'] = parseInt(i);
						catchmentSummary['students'] += parseInt(json[i].stuTotReg);
						catchmentSummary['teachers'] += parseInt(json[i].tTeacher);
						catchmentSummary['plotSizeAve'] += parseInt(json[i].plotSize);
						//for search
						semisCodeSearch += json[i].semisCode+'|';
						
						addSchoolFeature(schoolTableData);
						
					}
			
	} else {
		$.ajax({type: 'POST', url: 'data/php/sbep.getSemisRow.php?', data:{semisString:semisString}, async: false, dataType: 'json', success: function (json) {
			
					for(i=0;i<json.length;i++){			
					
						var schoolTableData = new Array();
						schoolTableData[0] = json[i].semisCode;
						schoolTableData[1] = json[i].schName;
						schoolTableData[2] = json[i].schType;
						schoolTableData[3] = json[i].schGender;
						schoolTableData[4] = json[i].ghostSchool;
						schoolTableData[5] = json[i].smcFunctional;
						schoolTableData[6] = json[i].bCondition;
						schoolTableData[7] = json[i].plotSize;
						schoolTableData[8] = json[i].stuTotReg;
						schoolTableData[9] = json[i].tTeacher;
						schoolTableData[10] = json[i].comments;
						schoolTableData[11] = json[i].sch100m;	
						schoolTableData[12] = json[i].sch500m;
						schoolTableData[13] = json[i].sch1000m;	
						schoolTableData[14] = json[i].sch1500m;	
						//not displayed
						schoolTableData[15] = json[i].the_geom;
						schoolTableData[16] = json[i].imagesUrl;
						schoolTableData[17] = json[i].sch100mId;
						schoolTableData[18] = json[i].sch500mId;	
						schoolTableData[19] = json[i].sch1000mId;	
						schoolTableData[20] = json[i].sch1500mId;
						
						schoolTableData[21] = json[i].district;
						schoolTableData[22] = json[i].tehsil;
						schoolTableData[23] = json[i].unionCouncil;
						schoolTableData[24] = json[i].village;			
											
						catchmentSummary['schools'] = parseInt(i);
						catchmentSummary['students'] += parseInt(json[i].stuTotReg);
						catchmentSummary['teachers'] += parseInt(json[i].tTeacher);
						catchmentSummary['plotSizeAve'] += parseInt(json[i].plotSize);
						//for search
						semisCodeSearch += json[i].semisCode+'|';
						
						addSchoolFeature(schoolTableData);
						
					}
			
			}
		});
			
	}
	
	semisCodeSearch = semisCodeSearch.slice(0,-1);
	
	catchmentSummary['schools']++;
	
	// messiBoxBegin.hide();
	var messiTableBox = new Messi('<div align="center"><table align="center"><tr><td align="left"><img src="images/drop-add.gif"/></td><td> '+semisCode+' including '+catchmentDisplay+' catchment added to map</td></tr></table></div>', {autoclose: 5000, modal: false, closeButton:true, width: '375px'});
	
	addSchoolVector(addSchoolFeature());
	displayRadius(catchment);
	updateCatchmentSummary(catchmentDisplay);
	
	// tableObj.searchIndicatorSchoolTableData(semisCodeSearch, 2);
}

function displayRadius(catchment){
	
	if(catchment == 111){
		
	}else if(catchment == 555){
		catchment=675;map.zoomTo(15);
	}else if(catchment == 1111){
		catchment=1275;
		map.zoomTo(15);
	}else if(catchment == 1555){
		catchment=1675;
		map.zoomTo(14);
	}
	
	
	var feature = addSchoolFeature(aData);
	var featureRadius = feature.clone();
	
	featureRadius.geometry = OpenLayers.Geometry.Polygon.createRegularPolygon(
	    featureRadius.geometry,
	    catchment,
	    90
	);
	
	layerRadius.addFeatures(featureRadius);
	map.addLayer(layerRadius);

	map.zoomToExtent(layerRadius.getDataExtent());
}

function updateCatchmentSummary(catchmentDisplay){
	
	var hudHtml = '<div id="searchbar-sidebox-summary" class="searchbar-sidebox-summary" align="left">';
			hudHtml += '<h1><span class="green1">'+aData[0]+'</span></h1>';
			hudHtml += '<h2>'+aData[1]+'</h2>';
			hudHtml += '<p><span class="darkgray">'+aData[3]+' '+aData[2]+' School, '+aData[21]+', '+aData[22]+', '+aData[23]+', '+aData[24]+'</span></p>';
			hudHtml += '<table><tr><td><h2>'+catchmentDisplay+'m </h2></td><td><span class="darkgray">Catchment Summary</span></td></tr>';
			hudHtml += '<table>';
				hudHtml += '<tr><td>';
					hudHtml += '<p><span class="darkgray">Schools</span></p>';
				hudHtml += '</td><td>';				
					hudHtml += '<h2>'+numberWithCommas(catchmentSummary['schools'])+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';				
					hudHtml += '<p><span class="darkgray">Teachers</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(catchmentSummary['teachers'])+'</h2>';
				hudHtml += '</td></tr>';				
				hudHtml += '<tr><td>';
					hudHtml += '<p><span class="darkgray">Students</span></p>';	
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(catchmentSummary['students'])+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';				
					hudHtml += '<p><span class="darkgray">Teacher/Students</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>1 to '+numberWithCommas(Math.round(catchmentSummary['students']/catchmentSummary['teachers']))+'</h2>';
				hudHtml += '</td></tr>';				
				hudHtml += '<tr><td>';				
					hudHtml += '<p><span class="darkgray">Ave Plot Size (sq ft)</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(Math.round(catchmentSummary['plotSizeAve'] / catchmentSummary['schools']))+'</h2>';
				hudHtml += '</td></tr>';
			hudHtml += '<table>';
	hudHtml += '</div>';
	
	$("#searchbar").html(hudHtml);	
	
}

function layerClickSelectMain(e){
	if(e.layer.name == 'Schools'){
		updateSchoolOnClick(e);
	}else{
		updateIndOnClick(e);
	}
}
function updateIndOnClick(e){
	zoomMap(e.data);
	getIndicatorObj(e.attributes.key);
	if (e.attributes){
		if(e.attributes.district){
			$('#districtList li a').eq(e.attributes.i).click();
		}else if(e.attributes.taluka){
			$('#talukaList li a').eq(e.attributes.i).click();			
		}
	}	
}
function updateSchoolOnClick(e){
	
	if(popup){
		flexCount++;
		var imgUrl = e.data.imagesUrl;
		
		if(imgUrl[0]){
			var simpleSlideHtml = '<div class="flexslider'+flexCount+'">';
				simpleSlideHtml += '<ul class="slides">';
					simpleSlideHtml += '<li>';
					  simpleSlideHtml += '<img class="captify" src="'+imgUrl[0]+'" alt="<b style=\'margin: 0px; color: #65944A\'>'+e.data.semisCode+':</b> '+e.data.schName+'</br>'+e.data.comments+'" />';
					simpleSlideHtml += '</li>';
					if(imgUrl[1]){
						simpleSlideHtml += '<li>';
						  simpleSlideHtml += '<img class="captify" src="'+imgUrl[1]+'" alt="<b style=\'margin: 0px; color: #65944A\'>'+e.data.semisCode+':</b> '+e.data.schName+'</br>'+e.data.comments+'" />';
						simpleSlideHtml += '</li>';
						
					}
					if(imgUrl[2]){
						simpleSlideHtml += '<li>';
						  simpleSlideHtml += '<img class="captify" src="'+imgUrl[2]+'" alt="<b style=\'margin: 0px; color: #65944A\'>'+e.data.semisCode+':</b> '+e.data.schName+'</br>'+e.data.comments+'" />';
						simpleSlideHtml += '</li>';
						
					}
					if(imgUrl[3]){
						simpleSlideHtml += '<li>';
						  simpleSlideHtml += '<img class="captify" src="'+imgUrl[3]+'" alt="<b style=\'margin: 0px; color: #65944A\'>'+e.data.semisCode+':</b> '+e.data.schName+'</br>'+e.data.comments+'" />';
						simpleSlideHtml += '</li>';
						
					}
				simpleSlideHtml += '</ul>';
			simpleSlideHtml += '</div>';

			var schSelectBox = new Messi(simpleSlideHtml, {modal: true, center: true, width: '640px', height: '500px'});
				
		}else{
		
			var simpleSlideHtml = '<div class="flexslider'+flexCount+'">';
				simpleSlideHtml += '<ul class="slides">';
					simpleSlideHtml += '<li>';
					  simpleSlideHtml += '<img class="captify" src="http://210.56.8.110:8585/map/binaries/no-image.png" alt="<b style=\'margin: 0px; color: #65944A\'>'+e.data.semisCode+':</b> '+e.data.schName+'</br>'+e.data.comments+'" />';
					simpleSlideHtml += '</li>';
				simpleSlideHtml += '</ul>';
			simpleSlideHtml += '</div>';

			var schSelectBox = new Messi(simpleSlideHtml, {modal: true, center: true, width: '440px', height: '320px'});		

		}	
	
	
		$('img.captify').captify({			
			// all of these options are... optional
			// ---
			// speed of the mouseover effect
			speedOver: 'fast',
			// speed of the mouseout effect
			speedOut: 'normal',
			// how long to delay the hiding of the caption after mouseout (ms)
			hideDelay: 500,
			// 'fade', 'slide', 'always-on'
			animation: 'always-on', 
			// text/html to be placed at the beginning of every caption
			prefix: '', 
			// opacity of the caption on mouse over
			opacity: '0.7',    
			// the name of the CSS class to apply to the caption box
			className: 'caption-bottom',
			// position of the caption (top or bottom)
			position: 'bottom',
			// caption span % of the image
			spanWidth: '100%'
		});		
		
		$('.flexslider'+flexCount).flexslider({
			animation: "slide"
		});	
	}
}

function layerHoverSelectMain(e){
	if(e.feature.layer.name == 'Schools'){
		updateSchoolOnHover(e);	
	}else{
		updateHudOnHover(e);
	}
}
function updateHudOnHover(e){
		
	var hudHtml = '<div id="percentVal" style="z-index:999;position:absolute;padding:195px 0px 0px 100px;"><h2 style="font-size:4.9em;"><span class="green1">'+Math.round((e.feature.data.girls / e.feature.data.totalStudents)*100)+'%</span></h2></div>';
			hudHtml += '<div id="percentLblFm" align="center" style="z-index:999;position:absolute;padding:268px 0px 0px 110px;"><h3 style="font-size:1.15em;color:#666">female</h3></div>';
			hudHtml += '<div id="percentLblEn" align="center" style="z-index:999;position:absolute;padding:282px 0px 0px 130px;"><h3 style="font-size:1.15em;color:#666">enrollment</h3></div>';
			hudHtml += '<div id="searchbar-sidebox-summary" class="searchbar-sidebox-summary" align="left">';
			hudHtml += '<h1>'+e.feature.data.title+'</h1>';
			hudHtml += '<h1>'+numberWithCommas(e.feature.data.schools)+'</h1>';
			hudHtml += '<p><span class="darkgray">Total Schools</span></p>';
			hudHtml += '<h2>'+numberWithCommas(e.feature.data.boys)+'</h2>';
			hudHtml += '<p><span class="darkgray">Boys</span></p>';
			hudHtml += '<h2>'+numberWithCommas(e.feature.data.girls)+'</h2>';
			hudHtml += '<p><span class="darkgray">Girls</span></p>';
			hudHtml += '<h2>'+numberWithCommas(e.feature.data.totalStudents)+'</h2>';
			hudHtml += '<p><span class="darkgray">Total Students</span></p>';
	hudHtml += '</div>';
	
	$("#searchbar").html(hudHtml);
	
}
function updateSchoolOnHover(e){
		
	var hudHtml = '<div id="searchbar-sidebox" class="searchbar-sidebox" align="left">';
			hudHtml += '<h1><span class="green1">'+e.feature.data.semisCode+'</span></h1>';
			hudHtml += '<h2>'+numberWithCommas(e.feature.data.schName)+'</h2>';
			hudHtml += '<p><span class="darkgray">'+e.feature.data.schGender+' '+e.feature.data.schType+' School, '+e.feature.data.district+', '+e.feature.data.tehsil+'</span></p>';
			hudHtml += '<table>';
				hudHtml += '<tr><td>';
					hudHtml += '<p><span class="darkgray">Ghost School</span></p>';
				hudHtml += '</td><td>';				
					hudHtml += '<h2>'+e.feature.data.ghostSchool+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';
					hudHtml += '<p><span class="darkgray">SMC Functional</span></p>';	
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+e.feature.data.smcFunctional+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';				
					hudHtml += '<p><span class="darkgray">Condition</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+e.feature.data.bCondition+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';				
					hudHtml += '<p><span class="darkgray">Plot Size (sq ft)</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(e.feature.data.plotSize)+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';
					hudHtml += '<p><span class="darkgray">Total Students</span></p>';
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(e.feature.data.stuTotReg)+'</h2>';
				hudHtml += '</td></tr>';
				hudHtml += '<tr><td>';					
					hudHtml += '<p><span class="darkgray">Total Teachers</span></p>';				
				hudHtml += '</td><td>';
					hudHtml += '<h2>'+numberWithCommas(e.feature.data.tTeacher)+'</h2>';
				hudHtml += '</td></tr>';
			hudHtml += '<table>';
	hudHtml += '</div>';
	
	$("#searchbar").html(hudHtml);
	
}

function zoomMap(data){
	//map center & zoom
	
	if (data.lon < 361){
		map.setCenter(new OpenLayers.LonLat(data.lon, data.lat).transform(options4326.projection, options900913.projection));
	}else{
		map.setCenter(new OpenLayers.LonLat(data.lon, data.lat));
	}
	map.zoomTo(data.zoom);

}
