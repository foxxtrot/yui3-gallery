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
    var wrapper = Y.Node.create(html),
        container = wrapper.one('*:empty') || wrapper,
        list = this.all('> *');
    if (list.size() > 0) {
        list.each(function(node) {
                    container.append(node);
                });
    } else {
        container.setContent(this.getContent());
        this.setContent('');
    }
    this.append(wrapper);
};

Y.NodeList.importMethod(NodePrototype, 'wrapInner');

/**
 * Returns a Document Fragment as a Y.Node
 * @method frag
 * @for Node
 * @static
 */
Y.Node.frag = function() {
    return new Y.Node(document.createDocumentFragment());
};
