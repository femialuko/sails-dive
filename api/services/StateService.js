/**
 * StateService
 *
 * @description :: Server-side logic for managing States
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
var promise = require('bluebird')
var _ = require('lodash');
module.exports = {
	findState: function(id, done){
        var response = State.findOne({id : id}).then((state) => {
            if(!state)
            {
                return ["Error"];
            }
            return [null, state];
        }).catch((error) => {
            return ["Bad error"]; 
        })
        return response;
        
    }
}

