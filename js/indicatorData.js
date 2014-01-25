var indicatorData = new Object();

$.getJSON("js/dataTarget.txt", function(data) {
	// console.log(data);
	for(i=0;i<data.length;i++){
		for(var key in data[i]){
			// console.log(data[i][key]);
			indicatorData[key]=data[i][key];
		}
	}
});