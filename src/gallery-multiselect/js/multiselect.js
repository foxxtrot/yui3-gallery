/**
 * A mechanism to replace multiselect boxes with a more user-friendly list of checkboxes
 *
 * @module gallery-multiselect
 */


/**
 * A Widget which replaces a select box with a list of checkboxes
 * This version works exclusively in a Progressive Enhancement situation in
 * which it replaces existing markup, and provides no helper methods to add
 * or remove options. It also does not yet provide usability improvements like
 * ARIA and keyboard support, both of which are the primary reason that I suggest
 * doing this in JavaScript instead of simply marking it up like this in the
 * first place.
 *
 * @class Multiselect
 * @constructor
 * @extends Widget
 */
var _F = function () {
        this._data = {};
        _F.superclass.constructor.apply(this, arguments);
    },
    NAME = "Multiselect",
    NAME_LC = "multiselect",
    getClassName = Y.ClassNameManager.getClassName,
    CLASSNAMES = {
        header: getClassName(NAME_LC, "field_name"),
        body: getClassName(NAME_LC, "data"),
        record: getClassName(NAME_LC, "entry")
    },
    ISSTRING = Y.Lang.isString,
    ISARRAY = Y.Lang.isArray,
    ISVALUE = Y.Lang.isValue,
    SUB = Y.Lang.sub;

/**
 * Class Name
 *
 * @property NAME
 * @type String
 * @static
 * @final
 * @value "Multiselect"
 */

_F.NAME = NAME;

_F.HTML_PARSER = {
    headerNode: 'label',
    bodyNode: 'ul',
    label: function (contentBox) {
        var node = contentBox.one('label');
        return node ? node.get('innerHTML') : "";
    },
    data: function (contentBox) {
        var options = contentBox.all('select option'), data = [];

        options.each(function (opt) {
            var value = opt.get('value'), text = opt.get('innerHTML');
            data.push({ value: value, text: text });
        });
        return data;
    },
    inputName: function (contentBox) {
        var select = contentBox.one('select');
        return select.get('name');
    }
};

_F.ATTRS = {
    /**
     * This attribute is the text of the label element associated with the list.
     *
     * @attribute label
     * @type String
     */
    label: {
        value: "",
        validator: ISSTRING
    },
    /**
     * An array of key-value pairs of the values and text associated with each
     * entry in the select list.
     *
     * @attribute data
     * @type Array
     */
    data: {
        value: {},
        validator: ISARRAY
    },
    /**
     * The HTML Form Name of the select box to be replaced.
     *
     * @attribute inputName
     * #type Strign
     */
    inputName: {
        validator: ISSTRING
    },
    headerNode: {
        writeOnce: true
    },
    bodyNode: {
        writeOnce: true
    },
    footerNode: {
        writeOnce: true
    }
};

Y.extend(_F, Y.Widget, {
    /**
     * @property TEMPLATES
     * @description The Substitute Templates for creating the header, body, and entries
     * @type Object
     *
     */
    TEMPLATES: {
        header: "<label class='" + CLASSNAMES.header + "'></label>",
        body: "<ul class='" + CLASSNAMES.body + "'></ul>",
        entry: "<li class='" + CLASSNAMES.record + "'><input type='checkbox' name='{inputName}' value='{value}' />{text}</li>"
    },
    /**
     * Renders UI
     *
     * @method renderUI
     * @private
     */
    renderUI: function () {
        var contentBox = this.get('contentBox'), bodyNode = this.get('bodyNode'), headerNode = this.get('headerNode'), label = this.get('label'),
            content = "", data = this.get('data'), inputName = this.get('inputName');
        if (!ISVALUE(headerNode)) {
            headerNode = Y.Node.create(this.TEMPLATES.header);
            contentBox.append(headerNode);
            this.set('headerNode', headerNode);
        } else {
            headerNode.addClass(CLASSNAMES.header);
        }
        headerNode.setContent(label);
        if (!ISVALUE(bodyNode)) {
            bodyNode = Y.Node.create(this.TEMPLATES.body);
            contentBox.append(bodyNode);
            this.set('bodyNode', bodyNode);
        } else {
            bodyNode.addClass(CLASSNAMES.body);
        }
        Y.Array.each(data, function (value) {
            value.inputName = inputName;
            if (value.text[0] === "T") {
                Y.log(value.value);
            }
            content += SUB(this.TEMPLATES.entry, value);
        }, this);
        bodyNode.setContent(content);
    },
    /**
     * Default Handler for click events on the list
     *
     * @method _clickHandler
     * @param event The EventFacade for the click event
     * @private
     */
    _clickHandler: function (event) {
        var input = event.currentTarget.one('input'), value;
        if (!event.target.test('input')) {
            value = input.get('checked');
            input.set('checked', !value);
        }
    },
    /**
     * Binds UI
     *
     * @method bindUI
     * @private
     */
    bindUI: function () {
        var bodyNode = this.get('bodyNode');
        bodyNode.delegate('click', this._clickHandler, 'li', this);
    }
});

Y.Multiselect = _F;
