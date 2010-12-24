var NodeListPrototype = Y.NodeList.prototype,
    _selectorFilter = NodeListPrototype.filter;

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
