function MainData(){

}

MainData.prototype.onReady = function(){
	google.load("visualization", "1", {packages:["corechart"]});

	$(".mainData .filters .select span").unbind().on('click', function(event) {
		var elem = $(this).next("ul");
		elem.toggleClass('active');
	});

	$(".mainData .filters .select.city ul li").click(function(event) {
		$(".mainData input").val('');
		$(".mainData .filters .select.city span").text($(this).text());
		$(".mainData .filters .select.city ul").removeClass('active');

		var city = $(this).text();
		$(".mainData .filters .select.town span").text('Todos')
		if(city == 'Toda Andalucía'){
			$('.mainData .filters .select.town').addClass('disable');
		}else{
			$('.mainData .filters .select.town ul li').addClass('hide');
			$('.mainData .filters .select.town ul li[city=all]').removeClass('hide');
			$('.mainData .filters .select.town ul li[city=' + city +']').removeClass('hide');
			$('.mainData .filters .select.town').removeClass('disable');
		}

		if($(this).text() == "Toda Andalucía"){
			$(".indicators-table tr").show();
		}else{
			$(".indicators-table tr").hide();
			$(".indicators-table tr[city='" + $(this).text() + "'], .table_header").show();
		}
		
	});

	$(".mainData .filters .select.town ul li").click(function(event) {
		$(".mainData input").val('');
		$(".mainData .filters .select.town span").text($(this).text());
		$(".mainData .filters .select.town ul").removeClass('active');
		$(".indicators-table tr").hide();
		if($(this).text() == 'Todos'){
			var city = $(".mainData .filters .select.city span").text();
			$(".indicators-table tr[city='" + city + "'], .table_header").show();
		}else{
			$(".indicators-table tr[town='" + $(this).text() + "'], .table_header").show();
		}
	});

	$(".mainData input").keyup(function(e) {
		var rows = $(".indicators-table tr");
		var text = $(this).val();
		$(rows).each(function(index, value) {
			if($(value).attr("neigh")){
				if(text.length == 0 || $(value).attr("neigh").toLowerCase().indexOf(text.toLowerCase()) != -1){
					
					var city = $(".mainData .filters .select.city span").text();
					var town = $(".mainData .filters .select.town span").text();
					if(town == 'Todos' && city == 'Toda Andalucía'){
						$(value).show();	
					}else{

						if(town == 'Todos' && $(value).attr("city") == city){
							$(value).show();	
						}else if(town != 'Todos' && $(value).attr("city") == city && $(value).attr("town") == town){
							$(value).show();
						}
					}
				}else{
					$(value).hide();
				}
			}
		});
	});

	$(".mainData .indicators-table th").mouseover(function() { 
		var info = $(this).find(".table_info");
		if(info){
			info.removeClass('hide');
		}
	}).mouseout(function() { 
		var info = $(this).find(".table_info");
		if(info){
			info.addClass('hide');
		}
	});

	$(".indicators-table tr").unbind().on('click', function(event) {
		lat = $(this).attr("lat");
		lng = $(this).attr("lng");
		mainData.showIndicator($(this).attr("key"),lat,lng);
	});
}

MainData.prototype.showIndicator = function(key,lat,lng){
	$("#content").addClass('loading');
	$.ajax({
        url: '/indicator_level/' + key, 
        success: function(response) {
        	$("#content").removeClass('loading');
        	$("#content").children().remove();
        	$("#content").html(response);
        	dataLevelObject.onReady();

        	if(lat && lng){
				map.setView([lat,lng],17);
			}
        }
	});
}
