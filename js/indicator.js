function Indicator(){

}

Indicator.prototype.onReady = function(){
	
	$("#data").unbind().on('click', '.indicators .tabs-wrapper .filters .select span', function(event) {
		var elem = $(this).next("ul");
		if(!elem.hasClass('active')){
			$("#data .indicators .tabs-wrapper .filters .select ul").removeClass('active');
			elem.toggleClass('active');
		}else{
			$("#data .indicators .tabs-wrapper .filters .select ul").removeClass('active');
		}
	});

	$("#data").on('click', '.back-to-page', function(event) {
		$("#data").hide();
		$("#index").show();
		map.setView(initLatLng,initZoom);
	});

	// $("#data").on('click', '.indicators .tabs-wrapper .filters .select ul li', function(e) {
	// 	$("#data .indicators .tabs-wrapper .filters .select span").text($(this).text());
	// 	$("#data .indicators .tabs-wrapper .filters .select ul").removeClass('active');
	// 	if($(this).text() == "Toda Andalucía"){
	// 		$(".indicators-table tr").show();
	// 	}else{
	// 		$(".indicators-table tr").hide();
	// 		$(".indicators-table tr[city='" + $(this).text() + "']").show();
	// 	}
	// 	// indicatorObject.drawSimbols();
	//  //    indicatorObject.drawChart();
	// });
	
	$("#data").on('click', '.indicators .tabs-wrapper .filters .select.city ul li', function(e) {
		$("#data .indicators .tabs-wrapper .filters .select.city span").text($(this).text());
		$("#data .indicators .tabs-wrapper .filters .select.city ul").removeClass('active');

		var city = $(this).text();
		if(city == 'Toda Andalucía'){
			$('#data .indicators .tabs-wrapper .filters .select.town').addClass('hide');
		}else{
			$('#data .indicators .tabs-wrapper .filters .select.town ul li').addClass('hide');
			$('#data .indicators .tabs-wrapper .filters .select.town ul li[city=all]').removeClass('hide');
			$('#data .indicators .tabs-wrapper .filters .select.town ul li[city=' + city +']').removeClass('hide');
			$("#data .indicators .tabs-wrapper .filters .select.town span").text('Todos')
			$('#data .indicators .tabs-wrapper .filters .select.town').removeClass('hide');
		}

		if($(this).text() == "Toda Andalucía"){
			$(".indicators-table tr").show();
			indicatorObject.drawSimbols();
		}else{
			$(".indicators-table tr").hide();
			$(".indicators-table tr[city='" + $(this).text() + "'], .table_header").show();
		}
		indicatorObject.drawSimbols();
		indicatorObject.drawChart();
		
		// if($(this).text() == "Toda Andalucía"){
		// 	$(".indicators-table tr").show();
		// }else{
		// 	$(".indicators-table tr").hide();
		// 	$(".indicators-table tr[city='" + $(this).text() + "']").show();
		// }
		// indicatorObject.drawSimbols();
	 //    indicatorObject.drawChart();
	});

	$("#data").on('click', '.indicators .tabs-wrapper .filters .select.town ul li', function(e) {
		$("#data .indicators .tabs-wrapper .filters .select.town span").text($(this).text());
		$("#data .indicators .tabs-wrapper .filters .select.town ul").removeClass('active');
		$(".indicators-table tr").hide();
		if($(this).text() == 'Todos'){
			var city = $("#data .indicators .tabs-wrapper .filters .select.city span").text();
			$(".indicators-table tr[city='" + city + "'], .table_header").show();
		}else{
			$(".indicators-table tr[town='" + $(this).text() + "'], .table_header").show();
		}
		indicatorObject.drawSimbols();
		indicatorObject.drawChart();
	});

	$("#data").on('click', '.table-wrap .indicators-table tr', function(e) {
		lat = $(this).attr("lat");
		lng = $(this).attr("lng");
		if(lat && lng){
			map.setView([lat,lng],15);
		}
	});
	$("#data").on('click', '.nav li', function(event) {
		var menu = $(this).attr('menu');
		$("#data .nav li").removeClass('active');
		$(this).addClass('active');

		$("#data .table-wrap").addClass('hide');
		$("#chart_div").addClass('hide');
		$("#note").addClass('hide');
		if(menu=='1'){
			$("#data .table-wrap").removeClass('hide');
		}else if(menu=='2'){
			$("#chart_div").removeClass('hide');
		}else{
			$("#note").removeClass('hide');
		}
	});

	$('#content .lista header').unbind().on('click',function(){
		$(this).closest('section').next('ul').toggleClass('active');
	});
}

Indicator.prototype.drawSimbols = function(){
    featureGroup.clearLayers();
    // var city = $("#data .indicators .tabs-wrapper .filters .select.city span").text();
	var tr = getActiveData();
	
    var umbral = parseInt($("umbral").text());
    for(var i=0; i<tr.length; i++){
        var lat = $(tr[i]).attr("lat");
        var lng = $(tr[i]).attr("lng");
        var value = parseInt($(tr[i]).find(".col-3").text());
        var city = $(tr[i]).attr('city')
        var town = $(tr[i]).attr('town')
        if(value > 0){
            var circle = new L.CircleMarker([lat,lng], {
               radius: (30 * value)/umbral,
               fillColor: "#587BFF",
               color: "#c5cde5",
               opacity: 1,
               fillOpacity: 1,
               weight: 1,
               clickable: true,
               value : value,
            });
            
        	circle.bindPopup(town + " : " + value.toString());

            featureGroup.addLayer(circle);
        }
    }
}

Indicator.prototype.drawChart = function(options){
	$('#chart_div').removeClass('hide');
	var options = {
	      pieHole: 0.7,
	      chartArea: {'width': '85%', 'height': '85%', 'top':'30px'},
	      // legend: { position: 'bottom', alignment: 'end' },
	      // legend: 'none',
	      // backgroundColor: '#f2f2f2',
	      fontSize: 12,
	};

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Neighborhood');
  data.addColumn('number', 'Value');
  // var city = $("#data .indicators .tabs-wrapper .filters .select.city span").text();
  var tr = getActiveData();
  for(var i=0; i<tr.length; i++){
  	var value = parseInt($(tr[i]).find(".col-3").text());
  	var neighborhood = $(tr[i]).find(".tg-031e").text();
  	data.addRow([neighborhood, value]);
  }
  
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  var menu = $("#data .nav li.active").attr("menu");
  if(menu != '2'){
  	$('#chart_div').addClass('hide');
  }
}

function getActiveData(){
	var city = $("#data .indicators .tabs-wrapper .filters .select.city span").text();
	var town = $("#data .indicators .tabs-wrapper .filters .select.town span").text();
	if(city=="Toda Andalucía"){
		var tr = $("#data").find(".indicators-table tr[city]");
	}else{
		if(town == 'Todos'){
			var tr = $("#data").find(".indicators-table tr[city='" + city + "']");
		}else{
			var tr = $("#data").find(".indicators-table tr[town='" + town + "']");
		}
	}
	return tr;
}
