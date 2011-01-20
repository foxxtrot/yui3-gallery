var _F = function () {
        this._data = {};
        _F.superclass.constructor.apply(this, arguments);
    },
    NAME = "CheckboxList",
    NAME_LC = "checkboxlist",
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

_F.NAME = NAME;
_F.NS = NAME;

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
    label: {
        value: "",
        validator: ISSTRING
    },
    data: {
        value: {},
        validator: ISARRAY
    },
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
    TEMPLATES: {
        header: "<label class='" + CLASSNAMES.header + "'></label>",
        body: "<ul class='" + CLASSNAMES.body + "'></ul>",
        entry: "<li class='" + CLASSNAMES.record + "'><input type='checkbox' name='{inputName}' value='{value}' />{text}</li>"
    },
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
    _clickHandler: function (event) {
        var input = event.currentTarget.one('input'), value;
        if (!event.target.test('input')) {
            value = input.get('checked');
            input.set('checked', !value);
        }
    },
    bindUI: function () {
        var bodyNode = this.get('bodyNode');
        bodyNode.delegate('click', this._clickHandler, 'li', this);
    }
});

Y.Multiselect = _F;
