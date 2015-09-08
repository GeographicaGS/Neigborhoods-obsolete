function Family(){

}

Family.prototype.onReady = function(){
	// google.load("visualization", "1", {packages:["corechart"]});
	var sections = $("section");
	sections.each(function(index, section) {
		$(section).find(".counter").text($(section).next("ul").find("li").length);
	});

	$("#index li").click(function(e){
		$.ajax({
	        url: '/indicator/' + $(this).attr("id_indicator"), 
	        success: function(response) {
	        	map.setView(initLatLng,initZoom);
	        	$("#index").hide()
	        	$("#data").html(response);
	        	$("#data").show();
	        	indicatorObject.drawSimbols();
	        	indicatorObject.drawChart();
	        }
		});
	});
}
