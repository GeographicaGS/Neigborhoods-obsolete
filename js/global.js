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
        url: 'neighborhods_geom', 
        success: function(response) {
            // var neighborStyle = {
            //     'color': "#2C3D7F",
            //     'fillColor': "#587BFF",
            //     'weight': 2,
            //     "opacity": 1
            // };

            var neighborStyle = {
                'color': "#d29b31",
                'fillColor': "#d29b31",
                'weight': 2,
                "opacity": 1,
                "fillOpacity": 0.5
            };

            var gardenStyle = {
                'color': "#3b843c",
                'fillColor': "#59a659",
                'weight': 1,
                "opacity": 0.8,
                "fillOpacity": 0.8
            };

            var longWalkerStyle = {
                'color': "#4f463c",
                'fillColor': "#4f463c",
                'weight': 4,
                "opacity": 1,
                "fillOpacity": 1
            };

            var roadsStyle = {
                'color': "#0066cc",
                'fillColor': "#0066cc",
                'weight': 4,
                "opacity": 1,
                "fillOpacity": 1
            };

            var walkerStreetStyle = {
                'color': "#0099ff",
                'fillColor': "#0099ff",
                'weight': 1,
                "opacity": 0,
                "fillOpacity": 0.6
            };

            var mixedStreetStyle = {
                'color': "#665e56",
                'fillColor': "#665e56",
                'weight': 1,
                "opacity": 0,
                "fillOpacity": 0.8
            };

            var playtimeStyle = {
                'color': "#ff6633",
                'fillColor': "#ff6633",
                'weight': 1,
                "opacity": 0,
                "fillOpacity": 0.8
            };

            var neighborSupStyle = {
                'color': "#d29b31",
                'fillColor': "#d29b31",
                'weight': 2,
                "opacity": 1,
                "fillOpacity": 0.5
            };

            var buildingsStyle = {
                'color': "#d29b31",
                'fillColor': "#ffcc00",
                'weight': 1,
                "opacity": 1,
                "fillOpacity": 0.5
            };

            L.geoJson(response.neighbors,{style: neighborStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.neighborSup,{style: neighborSupStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.buildings,{style: buildingsStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.playtime,{style: playtimeStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.gardens,{style: gardenStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.mixedStreet,{style: mixedStreetStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.walkerStreet,{style: walkerStreetStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.longWalker,{style: longWalkerStyle, onEachFeature: onEachFeature}).addTo(map);
            L.geoJson(response.roads,{style: roadsStyle, onEachFeature: onEachFeature}).addTo(map);
        }
    });

    $('.banner nav a').click(function(e) {
        e.preventDefault();
        featureGroup.clearLayers();
        $('.banner nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var url = $(this).attr("href");

        $.ajax({
            url: url, 
            success: function(response) {
                $("#content").children().remove()
                $("#content").html(response);
                if(url == "data"){
                    mainData.onReady();

                }else if(url == 'indicators'){
                    familyObject.onReady();
                    indicatorObject.onReady();
                }
            }
        });

    });

    $('#map') .on('click', '.leaflet-popup.indicator_data_poup .content a', function(e) {
        e.preventDefault();
        $('.banner nav li').removeClass('active');
        $('.banner nav li[href="data"]').removeClass('active');
        $('.banner nav li a[href="data"]').closest("li").addClass('active');
        mainData.showIndicator($(this).attr('href'));
    });

    $("#legend img").click(function() {
        $(this).toggleClass('close');
        $("#legend .content").toggleClass('close');
    });
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.town && feature.properties.nom_barr && feature.properties.nombrebloq) {
        layer.bindPopup('<div class="header"><span>Barriada<br></span>' + feature.properties.nom_barr + ', ' + feature.properties.town + '</div>' +
                           '<div class="content"><a href=' + feature.properties.nombrebloq + '>Ver datos<br></a>', {className: 'indicator_data_poup'});
    }
}
