/**
 * State.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName : "states",
  attributes: {
    name : {
      type : "string",
      required : true
    },
    code : {
      type : "string",
      required : true
    }, 

    country: {
      model : "country",
      required : true
    }
}
};

