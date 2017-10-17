let layout = require('../index');

let path    = require('path');
let chai    = require('chai');
let expect  = chai.expect;

describe('layout', function () {

    let testViewLayoutPath = path.join(__dirname, 'views/layout');
    let view;
    beforeEach(function () {
        view = {
            var: 'Bob'
        };
    });

    it('Render layout with Mustache', function () {
        expect(layout(path.join(testViewLayoutPath, 'test'), view))
            .to
            .equal('The var should be Bob: Bob')
    });

    it('Render with "escape" option being FALSE', function() {
        expect(layout(path.join(testViewLayoutPath, 'testHTML'), view, { escape: false }))
            .to
            .equal(`<!doctype html>
<html>
<head>
    <title>Test HTML</title>
</head>
<body>
    <h1>Bob</h1>
</body>
</html>`);
    });

    /*it('Render with "escape" option being TRUE', function () {
        expect(layout(path.join(testViewLayoutPath, 'testHTML'), view, { escape: true }))
            .to
            .equal(`&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Test HTML&lt;&#x2F;title&gt;
&lt;&#x2F;head&gt;
&lt;body&gt;
    &lt;h1&gt;Bob&lt;&#x2F;h1&gt;
&lt;&#x2F;body&gt;
&lt;&#x2F;html&gt;`)
    });*/

});