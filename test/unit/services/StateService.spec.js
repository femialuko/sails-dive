/* global StateService */

require('../../bootstrap');
var _ = require("lodash");

// Here we have our tests
describe('The StateService', function () {

before(function (done) {
    State.create({"name" : "Lagos", "code" : "LAG", "id" : 1, "country" : 1}).then(function(data){
        done()
    });
});

it('should return a state', function (done) {
   StateService
     .findState(1)
     .then(function (state) {
         state.should.be.an('array');
         state.should.have.length(2);
         state[1].should.be.an('object');
         state[1].should.have.property('name');
         state[1].should.have.property('code');
         state[1].should.have.property('id');
         state[1].should.have.property('country');
         state[1].name.should.equal('Lagos');
         state[1].code.should.equal('LAG');
         state[1].id.should.equal(1);
         state[1].country.should.equal(1);
       done();
     })
     .catch(done);

});

});