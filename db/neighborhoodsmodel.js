var db = require('./db.js');
var BaseModel = db.BaseModel;

function NeighborhoodsModel() {
}

NeighborhoodsModel.prototype.getGeoms = function(callback){
	BaseModel.query(callback,'select nombrebloq, nom_barr, town, ST_AsGeoJSON(ST_Transform(geom,4326)) as geom from data.neighborhoods');
};

NeighborhoodsModel.prototype.getGardenGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_jardin a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getBuildingsGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_edificaciones a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getWalkerStreetGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_callespeaton a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getMixedStreetGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_callesmixta a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getNeighborSupGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_barriada a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getPlaytimeGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.sup_areasrecreo a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getRoadsLongGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.long_vias a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getWalkerLongGeoms = function(callback){
	BaseModel.query(callback,'select n.nombrebloq, n.nom_barr, n.town, ST_AsGeoJSON(ST_Transform(a.geom,4326)) as geom from nivel_3_agrupado.long_peaton a LEFT JOIN data.neighborhoods n on n.nombrebloq = upper(a.key_bloq)');
};

NeighborhoodsModel.prototype.getNeighborhoodsList = function(callback){
	BaseModel.query(callback,'select town,city,nom_barr, n.nombrebloq, ST_X(ST_Centroid(ST_Transform(barr.geom,4326))) as lng, ST_Y(ST_Centroid(ST_Transform(barr.geom,4326))) as lat, sub.nombrebloq as level2, level3_table.nombrebloq as level3' +
								' from data.neighborhoods n' +
								' left join nivel_1.barriadas barr on barr.nombrebloq = n.nombrebloq' +
								' left join nivel_2.sub_barriada sub on sub.nombrebloq = n.nombrebloq' +
								' left join' + 
								' (select distinct(upper(key_bloq)) as nombrebloq from (select key_bloq from nivel_3_agrupado.long_peaton' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.long_vias' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_areasrecreo' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_barriada' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_callesmixta' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_callespeaton' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_edificaciones' +
								' UNION' +
								' select key_bloq from nivel_3_agrupado.sup_jardin) as aux) as level3_table on level3_table.nombrebloq = n.nombrebloq' +
								' ORDER BY town');
};


module.exports = NeighborhoodsModel;

