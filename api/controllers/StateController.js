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
        State.findOne({id : 1}).then((state) => {
            console.log("In the state promise trying to find a state");
            if(!state)
            {
                console.log("State does not exist");
                return res.notFound({"message" : "State not found"});
            }
            console.log("We found a state");
            return res.ok({"data" : state});
        }).catch((error) => {
            console.log("An error occured while trying to process your request...");
            return res.notFound(error); 
        })

    },

    saveState : function(req, res){
        console.log("Am here, hustling to save a state");
        let allowedParams = ['name', 'code'];
        let data = _.pick(req.body, allowedParams);
        State.create(data).then((state) => {
            if(!state){
                return res.badRequest("Bad request here");
            }
            return res.ok(state);
        }).catch((error) => {
            return res.serverError(error);
        });
        
    }

};

