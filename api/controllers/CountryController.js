/**
 * CountryController
 *
 * @description :: Server-side logic for managing Countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var promise = require('promise');
var _ = require('lodash');
module.exports = {
	saveCountry : function(req, res){
        var allowedParams = ['name', 'code'];
        var data = _.pick(req.body, allowedParams);
        Country.findOne({name : data.name}).then(function(country){
            if(country){
                return [{"message": "Country already exists"}];
            }
            return [null];
        }).spread(function(err){
            if(err){
                return [err];
            }
            return([null, Country.create(data)]);
        }).spread(function(err, data){
            if(err){
                return res.badRequest({"message": "This country already exists"});
            }
            return res.ok(data);
        }).catch(function(err){
            return res.serverError({"message": "An error occured while trying to save your request"});
        })
    },

    findCountry : function(req, res){
        Country.findOne({id : req.params.id}).then(function(data){
            console.log(data);
            if(data)
                return res.ok(data);
            return res.notFound({"message" : "Country not found"});
        })
    }
};

