var map;
var featureGroup;
var initLatLng = [37.36455, -4.57645];
var initZoom = 7;

function Global(){
}

Global.prototype.onReady = function(){
    map = L.map('map').setView(initLatLng, initZoom);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    featureGroup = L.featureGroup();
    featureGroup.addTo(map);
    $.ajax({
        url: '/neighborhods_geom', 
        success: function(response) {
            var myStyle = {
                'color': "#2C3D7F",
                'fillColor': "#587BFF",
                'weight': 2,
                "opacity": 1
            };

            L.geoJson(response.result,{style: myStyle}).addTo(map);
        }
    });
}
