var NodeList = Y.NodeList,
    NodeListPrototype = NodeList.prototype,
    _selectorFilter = NodeListPrototype.filter;

/**
 * Filters the NodeList instance to only the matching nodes
 * @method Y.NodeList.filter
 * @param {string|function} filter A CSS selector string to apply to the list,
 * or a boolean function to apply to each element in the list. The function
 * will be passed three arguments, a Y.Node instance of the current node, the
 * current index in the list, and the NodeList instance.
 * @return {NodeList} NodeList containing the updated collection
 */
NodeListPrototype.filter = function(filter) {
    var newList;
    if (typeof(filter) === "string") {
        return _selectorFilter.apply(this, arguments);
    }
    if (typeof(filter) === 'function') {
        newList = new NodeList([]);
        this.each(function(node, index, list) {
            if (filter(node, index, list)) {
                newList.push(node);
            }
        });
        return newList;
    }

    Y.log("Unrecognized filter type, returning list");
    return this;
};
/**
 * This inverse of filter. Applies :not to a selector, or builds a NodeList
 * consisting of all the nodes for which the argument is false
 * @param {string|function} filter A CSS selector string to apply to the list,
 * or a boolean function to apply to each element in the list. The function
 * will be passed three arguments, a Y.Node instance of the current node, the
 * current index in the list, and the NodeList instance.
 * @return {NodeList} NodeList containing the updated collection
 */
NodeListPrototype.reject = function(filter) {
    if (typeof(filter) === "string") {
        return this.filter(function(item) {
                    return !item.test(filter);
                });
    }
    if (typeof(filter) === "function") {
        return this.filter(function(item, i, a) {
                    return !filter.call(null, item, i, a);
                });
    }

    Y.log("Unrecognized filter type, returning list");
    return this;
};
