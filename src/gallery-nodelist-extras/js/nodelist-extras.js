var NodeListPrototype = Y.NodeList.prototype,
    _selectorFilter = NodeListPrototype.filter;

/**
 * Filters the NodeList instance to only the matching nodes
 * @method Y.NodeList.filter
 * @param {string|function} filter A CSS selector string to apply to the list, or a boolean function to apply to each element in the list. The function will be passed a single argument, a Y.Node instance of the current node.
 * @return {NodeList} NodeList containing the updated collection
 */
NodeListPrototype.filter = function(filter) {
    var newList;
    if (typeof(filter) === "string") {
        return _selectorFilter.apply(this, arguments);
    }
    if (typeof(filter) === 'function') {
        newList = new Y.NodeList([]);
        this.each(function(node) {
            if (filter(node)) {
                newList.push(node);
            }
        });
        return newList;
    }

    Y.log("Unrecognized filter argument, returning list");
    return this;
};
