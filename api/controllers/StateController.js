/**
 * StateController
 *
 * @description :: Server-side logic for managing States
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var promise = require('bluebird')
var _ = require('lodash');
module.exports = {
	findState: function(req, res){
        console.log("am here")
        State.findOne({id : req.params.id}).populate("country").then((state) => {
            if(!state)
            {
                return res.notFound({"message" : "State not found"});
            }
            return res.ok({"data" : state});
        }).catch((error) => {
            return res.notFound(error); 
        })

    },

    saveState : function(req, res){
        console.log("Am here, hustling to save a state");
        let allowedParams = ['name', 'code', 'country'];
        let data = _.pick(req.body, allowedParams);
        Country.findOne({id : req.body.country}).then(function(country){
            if(!country){
                return[{"message": "Country not found"}];
            }
            return [null, country]
        }).spread(function(err, country){
            if(err)
                return [err];
            return[null, State.create(data)];
        }).spread(function(err, state){
            if(err)
                return res.badRequest(err);
            return res.ok(state);
        })
    
    }

};

