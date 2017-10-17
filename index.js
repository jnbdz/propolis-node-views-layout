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

let defaultMustacheEscape = Mustache.escape;

let render = function (path, view, options) {
    if (typeof path !== 'string') {
        throw new TypeError('Invalid path! Path should be a "string" ' +
                            'but "' + typeStr(path) + '" was given as the first ' +
                            'argument for mustache#render(path, view)');
    }

    if (typeof view !== 'object') {
        throw new TypeError('Invalid view! View should be an "object" ' +
                            'but "' + typeStr(view) + '" was given as the first ' +
                            'argument for mustache#render(path, view, options)');
    }

    let isOptionsUndefined = (typeof options === 'undefined');

    if (typeof options !== 'object' && !isOptionsUndefined) {
        throw new TypeError('Invalid options! Options should be an "object" ' +
                            'but "' + typeStr(options) + '" was given as the first ' +
                            'argument for mustache#render(path, view, options)');
    }

    if (isOptionsUndefined) {
        options = {
            escape: true
        };
    }

    path = path + '.mustache';

    let content = fs.readFileSync(path, readFileOptions);

    if (content === null) {
        throw new Error('Unable to get layout content!');
    } else if (typeof content !== 'string') {
        throw new TypeError('Invalid content! Not string.');
    }

    if (options.escape === false) {
        Mustache.escape = function (value) {
            return value;
        };
    }

    let result = Mustache.render(content, view);

    Mustache.escape = defaultMustacheEscape;

    return result;
};

module.exports = render;