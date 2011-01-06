/**
 * An expanded collection of methods for Y.Node
 *
 * @module gallery-node-extras
 * @class Node
 */
var NodePrototype = Y.Node.prototype;

/**
 * Wraps the content of this Node with new HTML
 * @method wrapInner
 * @for Node
 * @for NodeList
 * @param {string | Y.Node | DOMNode} The HTML Fragment to wrap around the contents of the current node.
 * @chainable
 */
NodePrototype.wrapInner = function(html) {
    var wrapper = Y.Node.create(html);

    this.all('> *').each(function(node) {
                wrapper.append(node);
            });
    this.append(wrapper);
}

Y.NodeList.importMethod(NodePrototype, 'wrapInner');
