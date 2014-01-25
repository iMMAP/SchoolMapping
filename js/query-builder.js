
//refresh form and table
function refreshQueryForm(){
	
	//clear table filters
	$('#example').dataTable().fnFilter('', 15);
	$('#example').dataTable().fnFilter('', 14);
	$('#example').dataTable().fnFilter('', 6);
	$('#example').dataTable().fnFilter('', 5);
	$('#example').dataTable().fnFilter('', 4);
	$('#example').dataTable().fnFilter('', 3);
	$('#example').dataTable().fnFilter('', 2);
	$('#example').dataTable().fnFilter('', 1);
	$('#example').dataTable().fnFilter('', 0);
	$('#example').dataTable().fnFilter('');	
	
	clearSemis();
	clearSchool();
	clearDistrict();
	clearTaluka();	
	clearSchType();
	clearSchGenderFilter();
	clearGhostSchFilter();
	clearSmcFilter();
	clearSchCondition();
}
/**semis and school name*/
//on keyup
$(function () {
	
	/*$('#semis').keyup(function(){
		
		$('#example').dataTable().fnFilter($('#semis').val());
		
	});*/
});
$(function () {
	/*$('#school').keyup(function(){
		$('#example').dataTable().fnFilter($('#school').val(), 1, true);
	});*/
});
//btn onclick 
$(function() {  
	$("#semisBtn").click(function() {  
		$('#example').dataTable().fnFilter($('#semis').val(), 0, true);
		return false;
	});  
}); 
$(function() {  
	$("#schoolBtn").click(function() {  
		$('#example').dataTable().fnFilter($('#school').val(), 1, true);
		return false;
	});  
});
//clear form
function clearSchool(){
	$('#semisForm').get(0).reset();
}
function clearSemis(){
	$('#schoolForm').get(0).reset();
}
/**end*/

/**district*/
//district on change
jQuery(document).ready(function() {
	$('#districtDropDown').chosen().change(function() {
		
	 //$('#example').dataTable().fnFilter( $("#districtDropDown").find('option:selected').text(), 1 , true);
	 indTable.fnFilter($("#districtDropDown").find('option:selected').text(), 21, true, false);
	 indTable.fnDraw();
		//why not
		$('#districtList li a').eq($("#districtDropDown").val()).click();
	
		$("#talukaDropDown").load('js/data/'+$("#districtDropDown").val()+'TalukaList.json', function(){
			$("#talukaDropDown").trigger("liszt:updated");
		});

		$("#talukaDropDown").attr("disabled", false); 
		
		
	});
});
function clearDistrict(){
	$("#districtDropDown").val(0).attr('selected',true);
}

/**taluka*/
//taluka on change
jQuery(document).ready(function() {
	$('#talukaDropDown').chosen().change(function() {
		//why not
		$('#talukaList li a').eq($("#talukaDropDown").val()).click();
		$talukaData = 'taluka||';
		$talukaData += $("#talukaDropDown").find('option:selected').text();
		$('#example').dataTable().fnFilter( $talukaData, 1 , true);
		
	});
});
function clearTaluka(){
	$("#talukaDropDown").val(0).attr('selected',true);
}
/**end*/

/**schGender*/
//schGender
var schGenderFilter = 'Gender||';
function filterSchoolGender(){
	//schGender
	
	$('#example').dataTable().fnFilter(schGenderFilter, 3, false);
}
$(function () {
	$('#boys').click(function(){
		if($('#boys').is(':checked')){
			schGenderFilter += "Boys|";
		}else{
			schGenderFilter = schGenderFilter.replace("Boys|",""); 
		}
		filterSchoolGender();
	});
});
$(function () {
	$('#girls').click(function(){
		if($('#girls').is(':checked')){
			schGenderFilter += "Girls|";
		}else{
			schGenderFilter = schGenderFilter.replace("Girls|",""); 
		}
		filterSchoolGender();
	});
});
$(function () {
	$('#mixed').click(function(){
		if($('#mixed').is(':checked')){
			schGenderFilter += "Mixed|";
		}else{
			schGenderFilter = schGenderFilter.replace("Mixed|",""); 
		}
		filterSchoolGender();
	});
});
function clearSchGenderFilter(){
	$('#boys').attr('checked', false);
	$('#girls').attr('checked', false);
	$('#mixed').attr('checked', false);
} 

/**schType*/
//school type
var schTypeFilter;
function filterSchoolType(schTp){
	
	
    	
    $('#example').dataTable().fnFilter(schTp, 2, true);
    
	
	
	
	
}
//string prep
jQuery(document).ready(function() {
	$('#schType').chosen().change(function() {
		$('#schType').trigger('liszt:updated')
		schTypeFilter = 'schType||';
		var val = $("#schType").find('option:selected').val();		
		$('#schType_chzn ul li span').each(function( index ) {
			schTypeFilter += $(this).text()+"|";
		});
		
		
		filterSchoolType(schTypeFilter);
		
	});
});
function clearSchType(){
	$("#schType").val('').trigger("liszt:updated");
}
/**end*/

/**ghostSch*/
//ghostSch
var schGhostFilter = '';
function filterGhostSchool(){
	$('#example').dataTable().fnFilter(schGhostFilter.slice(0,-1), 4, true);
}
$(function () {
	$('#ghostYes').click(function(){
		if($('#ghostYes').is(':checked')){
			schGhostFilter += "Yes|";
		}else{
			schGhostFilter = schGhostFilter.replace("Yes|",""); 
		}
		filterGhostSchool();
	});
});
$(function () {
	$('#ghostNo').click(function(){
		if($('#ghostNo').is(':checked')){
			schGhostFilter += "No|";
		}else{
			schGhostFilter = schGhostFilter.replace("No|",""); 
		}
		filterGhostSchool();
	});
});
function clearGhostSchFilter(){
	$('#ghostYes').attr('checked', false);
	$('#ghostNo').attr('checked', false);
} 

/**smc*/
//smc
var smcFilter = '';
function filterSmc(){
	$('#example').dataTable().fnFilter(smcFilter.slice(0,-1), 5, true);
}
$(function () {
	$('#smcYes').click(function(){
		if($('#smcYes').is(':checked')){
			smcFilter += "Yes|";
		}else{
			smcFilter = smcFilter.replace("Yes|",""); 
		}
		filterSmc();
	});
});
$(function () {
	$('#smcNo').click(function(){
		if($('#smcNo').is(':checked')){
			smcFilter += "No|";
		}else{
			smcFilter = smcFilter.replace("No|",""); 
		}
		filterSmc();
	});
});
function clearSmcFilter(){
	$('#smcYes').attr('checked', false);
	$('#smcNo').attr('checked', false);
} 

/**schCondition*/
//schCondition
var schConditionFilter;
function filterSchoolCondition(Condition){
	//console.log(schConditionFilter.slice(0,-1));
	$('#example').dataTable().fnFilter(Condition, 2, true);
	//$('#example').dataTable().fnFilter(schConditionFilter.slice(0,-1), 6, true);
}
//string prep
jQuery(document).ready(function() {
	$('#schCondition').chosen().change(function() {
		
		schConditionFilter = 'Condition||';
		$('#schCondition').trigger('liszt:updated')
		
		var val = $("#schCondition").find('option:selected').val();		
		$('#schCondition_chzn ul li span').each(function( index ) {
			schConditionFilter += $(this).text()+"|";
		});
		
		
		
		/*var val = $("#schCondition").val();
		if(val){
			for(i=0;i<val.length-1;i++){
				schConditionFilter += val[i+1]+"|";
			}
		}else{
			schConditionFilter = '';
		}*/
		filterSchoolCondition(schConditionFilter);
		
	});
});
function clearSchCondition(){
	$("#schCondition").val('').trigger("liszt:updated");
}
/**end*/

function saveQueryForm(){
	//
}