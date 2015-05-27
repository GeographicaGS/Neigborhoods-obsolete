var db = require('./db.js');
var BaseModel = db.BaseModel;

function IndicatorModel() {
}

IndicatorModel.prototype.getIndicator = function(id,callback){
	BaseModel.query(callback,'select i.name as indicator_name, f.name as family_name, f.id as family_id, i.table_name, i.umbral from catalog.indicator i inner join catalog.family f on f.id = i.id_family where i.id = $1', [id]);
};

IndicatorModel.prototype.getCities = function(callback){
	BaseModel.query(callback,'select distinct(city) as name from data.neighborhoods order by city');
};

IndicatorModel.prototype.getIndicatorData = function(table,callback){
	BaseModel.query(callback,'select data.nombrebloq, n.nom_barr,n.city, data.valor, ST_X(ST_Centroid(ST_Transform(n.geom,4326))) as lng, ST_Y(ST_Centroid(ST_Transform(n.geom,4326))) as lat from data.' + table + ' data inner join data.neighborhoods n on data.nombrebloq = n.nombrebloq order by n.city');
};


module.exports = IndicatorModel;

