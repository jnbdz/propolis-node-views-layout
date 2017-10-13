let layout = require('../index');

let path    = require('path');
let chai    = require('chai');
var expect  = chai.expect;

describe('layout', function () {

    var view;
    beforeEach(function () {
        view = {
            var: 'Bob'
        };
    });

    it('Render layout with Mustache', function () {
        expect(layout(path.join(__dirname, 'views/layout/test'), view)).to.equal('The var should be Bob: Bob')
    })

});