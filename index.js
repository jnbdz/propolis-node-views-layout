let fs          = require('fs');
let Mustache    = require('mustache');

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
let typeStr = function(obj) {
    return isArray(obj) ? 'array' : typeof obj;
};

let readFileOptions = {
    encoding: "utf-8"
};

let render = function (path, view) {
    if (typeof path !== 'string') {
        throw new TypeError('Invalid path! Path should be a "string" ' +
                            'but "' + typeStr(path) + '" was given as the first ' +
                            'argument for mustache#render(path, view)');
    }

    path = path + '.mustache';

    let content = fs.readFileSync(path, readFileOptions);

    if (content === null) {
        throw new ReferenceError('Unable to get layout content!');
    } else if (typeof content !== 'string') {
        throw new TypeError('Invalid content! Not string.');
    }

    return Mustache.render(content, view);
};

module.exports = render;