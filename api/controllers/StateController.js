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
        StateService.findState(req.params.id).spread(function(err, resp){
            console.log("ERror is " + err);
            console.log("REsponse is " + resp);
            if(err)
                return res.badRequest(err);
            res.ok(resp);
        }).catch(function(err){
            return res.badRequest("An error occured while trying to fetch this state");
        });
        
    },

    //using raw sql query to find all states
    findAllStates: function(req, res){
        console.log("am here")
        var countStatesQuery = "SELECT COUNT(*) as count FROM states";
        var getAllStates = "SELECT name, code FROM states";
        var findStateAsync = promise.promisify(State.query);
        findStateAsync(countStatesQuery).then(function(result){
            if(result[0].count === 0){
                return ["No states found"];
            }
            return [null, findStateAsync(getAllStates)];
        }).spread(function(err, result){
            if(err){
                return res.ok(err);
            }
            return res.ok(result);
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

