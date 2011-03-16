Y.Chart.Legend = Y.Base.create("Legend", Y.Plugin.Base, [], {
        initializer: function (config) {
            this.afterHostEvent('render', this.renderLegend);
        },
        renderLegend: function() {
            var container = this.get('container'),
                list = container.setContent("<h3>Legend</h3><ul class='yui3-charts-legend-content'></ul>").one('ul'),
                values = this.get('host').get('seriesCollection');
            if (typeof(container) === 'undefined') {
                container = Y.Node.create('<div />');
                this.get('host').insert(container, "after");
                this.set('container', container);
            } 
            container.addClass("yui3-charts-legend");
            Y.Array.each(values, function(ser) {
                var data = { label: ser.get('yKey'), color: ser.get('styles').marker.fill.color };
                list.append(Y.Lang.sub("<li style='border-left: 1em solid {color};'>{label}</li>", data));
            });
        },
        destructor: function() {
            this.get('container').destroy();   
        }
    }, {
    NS: 'Legend',
    ATTRS: {
        'container': {
            setter: function(value) {
                if (Y.Lang.isString(value)) {
                    return Y.one(value);
                }
            return new Y.Node(value);
        }
    }
    }
    });
