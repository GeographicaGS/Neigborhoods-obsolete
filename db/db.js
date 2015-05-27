function init(callback){
    module.exports.BaseModel = new (require('./basemodel.js'));
    module.exports.FamilyModel = new (require('./familymodel.js'));
    module.exports.NeighborhoodsModel = new (require('./neighborhoodsmodel.js'));
    module.exports.IndicatorModel = new (require('./indicatormodel.js'));
    callback();
}

module.exports.init = init