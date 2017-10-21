/*
 Highcharts JS v6.0.1 (2017-10-05)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l) {
    "object" === typeof module && module.exports ? module.exports = l: l(Highcharts)
})(function(l) { (function(b) {
        var g = b.Axis,
        w = b.Chart,
        p = b.color,
        q, h = b.each,
        t = b.extend,
        v = b.isNumber,
        n = b.Legend,
        c = b.LegendSymbolMixin,
        f = b.noop,
        r = b.merge,
        l = b.pick,
        u = b.wrap;
        q = b.ColorAxis = function() {
            this.init.apply(this, arguments)
        };
        t(q.prototype, g.prototype);
        t(q.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(g.prototype.keepProps),
            init: function(a, d) {
                var e = "vertical" !== a.options.legend.layout,
                k;
                this.coll = "colorAxis";
                k = r(this.defaultColorAxisOptions, {
                    side: e ? 2 : 1,
                    reversed: !e
                },
                d, {
                    opposite: !e,
                    showEmpty: !1,
                    title: null
                });
                g.prototype.init.call(this, a, k);
                d.dataClasses && this.initDataClasses(d);
                this.initStops();
                this.horiz = e;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function(a) {
                var d = this.chart,
                e, k = 0,
                m = d.options.chart.colorCount,
                b = this.options,
                c = a.dataClasses.length;
                this.dataClasses = e = [];
                this.legendItems = [];
                h(a.dataClasses,
                function(a, f) {
                    a = r(a);
                    e.push(a);
                    a.color || ("category" === b.dataClassColor ? (f = d.options.colors, m = f.length, a.color = f[k], a.colorIndex = k, k++, k === m && (k = 0)) : a.color = p(b.minColor).tweenTo(p(b.maxColor), 2 > c ? .5 : f / (c - 1)))
                })
            },
            setTickPositions: function() {
                if (!this.dataClasses) return g.prototype.setTickPositions.call(this)
            },
            initStops: function() {
                this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                h(this.stops,
                function(a) {
                    a.color = p(a[1])
                })
            },
            setOptions: function(a) {
                g.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                d = this.chart,
                e = d.options.legend || {},
                k, m;
                a ? (this.left = e = a.attr("x"), this.top = k = a.attr("y"), this.width = m = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - m, this.bottom = d.chartHeight - k - a, this.len = this.horiz ? m: a, this.pos = this.horiz ? e: k) : this.len = (this.horiz ? e.symbolWidth: e.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function(a) {
                this.isLog && (a = this.val2lin(a));
                return 1 - (this.max - a) / (this.max - this.min || 1)
            },
            toColor: function(a, d) {
                var e = this.stops,
                k, m, b = this.dataClasses,
                f, c;
                if (b) for (c = b.length; c--;) {
                    if (f = b[c], k = f.from, e = f.to, (void 0 === k || a >= k) && (void 0 === e || a <= e)) {
                        m = f.color;
                        d && (d.dataClass = c, d.colorIndex = f.colorIndex);
                        break
                    }
                } else {
                    a = this.normalizedValue(a);
                    for (c = e.length; c--&&!(a > e[c][0]););
                    k = e[c] || e[c + 1];
                    e = e[c + 1] || k;
                    a = 1 - (e[0] - a) / (e[0] - k[0] || 1);
                    m = k.color.tweenTo(e.color, a)
                }
                return m
            },
            getOffset: function() {
                var a = this.legendGroup,
                d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, g.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function() {
                var a, d = this.reversed;
                a = d ? 1 : 0;
                d = d ? 0 : 1;
                a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: this.stops
                }
            },
            drawLegendSymbol: function(a, d) {
                var e = a.padding,
                c = a.options,
                m = this.horiz,
                b = l(c.symbolWidth, m ? this.defaultLegendLength: 12),
                f = l(c.symbolHeight, m ? 12 : this.defaultLegendLength),
                h = l(c.labelPadding, m ? 16 : 30),
                c = l(c.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, b, f).attr({
                    zIndex: 1
                }).add(d.legendGroup);
                this.legendItemWidth = b + e + (m ? c: h);
                this.legendItemHeight = f + e + (m ? h: 0)
            },
            setState: f,
            visible: !0,
            setVisible: f,
            getSeriesExtremes: function() {
                var a = this.series,
                d = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; d--;) void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax = Math.max(this.dataMax, a[d].valueMax))
            },
            drawCrosshair: function(a, d) {
                var e = d && d.plotX,
                c = d && d.plotY,
                b, f = this.pos,
                h = this.len;
                d && (b = this.toPixels(d[d.series.colorKey]), b < f ? b = f - 2 : b > f + h && (b = f + h + 2), d.plotX = b, d.plotY = this.len - b, g.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = c, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({
                    fill: this.crosshair.color
                })))
            },
            getPlotLinePath: function(a, d, e, b, c) {
                return v(c) ? this.horiz ? ["M", c - 4, this.top - 6, "L", c + 4, this.top - 6, c, this.top, "Z"] : ["M", this.left, c, "L", this.left - 6, c + 6, this.left - 6, c - 6, "Z"] : g.prototype.getPlotLinePath.call(this, a, d, e, b)
            },
            update: function(a, d) {
                var c = this.chart,
                b = c.legend;
                h(this.series,
                function(a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && b.allItems && (h(b.allItems,
                function(a) {
                    a.isDataClass && a.legendGroup && a.legendGroup.destroy()
                }), c.isDirtyLegend = !0);
                c.options[this.coll] = r(this.userOptions, a);
                g.prototype.update.call(this, a, d);
                this.legendItem && (this.setLegendColor(), b.colorizeItem(this, !0))
            },
            remove: function() {
                this.legendItem && this.chart.legend.destroyItem(this);
                g.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function() {
                var a = this,
                d = this.chart,
                e = this.legendItems,
                k = d.options.legend,
                m = k.valueDecimals,
                g = k.valueSuffix || "",
                n;
                e.length || h(this.dataClasses,
                function(k, l) {
                    var r = !0,
                    p = k.from,
                    q = k.to;
                    n = "";
                    void 0 === p ? n = "\x3c ": void 0 === q && (n = "\x3e ");
                    void 0 !== p && (n += b.numberFormat(p, m) + g);
                    void 0 !== p && void 0 !== q && (n += " - ");
                    void 0 !== q && (n += b.numberFormat(q, m) + g);
                    e.push(t({
                        chart: d,
                        name: n,
                        options: {},
                        drawLegendSymbol: c.drawRectangle,
                        visible: !0,
                        setState: f,
                        isDataClass: !0,
                        setVisible: function() {
                            r = this.visible = !r;
                            h(a.series,
                            function(a) {
                                h(a.points,
                                function(a) {
                                    a.dataClass === l && a.setVisible(r)
                                })
                            });
                            d.legend.colorizeItem(this, r)
                        }
                    },
                    k))
                });
                return e
            },
            name: ""
        });
        h(["fill", "stroke"],
        function(a) {
            b.Fx.prototype[a + "Setter"] = function() {
                this.elem.attr(a, p(this.start).tweenTo(p(this.end), this.pos), null, !0)
            }
        });
        u(w.prototype, "getAxes",
        function(a) {
            var d = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            d && new q(this, d)
        });
        u(n.prototype, "getAllItems",
        function(a) {
            var d = [],
            c = this.chart.colorAxis[0];
            c && c.options && (c.options.showInLegend && (c.options.dataClasses ? d = d.concat(c.getDataClassLegendSymbols()) : d.push(c)), h(c.series,
            function(a) {
                a.options.showInLegend = !1
            }));
            return d.concat(a.call(this))
        });
        u(n.prototype, "colorizeItem",
        function(a, c, b) {
            a.call(this, c, b);
            b && c.legendColor && c.legendSymbol.attr({
                fill: c.legendColor
            })
        });
        u(n.prototype, "update",
        function(a) {
            a.apply(this, [].slice.call(arguments, 1));
            this.chart.colorAxis[0] && this.chart.colorAxis[0].update({},
            arguments[2])
        })
    })(l); (function(b) {
        var g = b.defined,
        l = b.each,
        p = b.noop,
        q = b.seriesTypes;
        b.colorPointMixin = {
            isValid: function() {
                return null !== this.value
            },
            setVisible: function(b) {
                var h = this,
                g = b ? "show": "hide";
                l(["graphic", "dataLabel"],
                function(b) {
                    if (h[b]) h[b][g]()
                })
            },
            setState: function(h) {
                b.Point.prototype.setState.call(this, h);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === h ? 1 : 0
                })
            }
        };
        b.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: p,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: q.column.prototype.pointAttribs,
            translateColors: function() {
                var b = this,
                g = this.options.nullColor,
                p = this.colorAxis,
                n = this.colorKey;
                
                l(this.data,
                function(c) {
                    var f = c[n];
                    if (f = c.options.color || (c.isNull ? g: p && void 0 !== f ? p.toColor(f, c) : c.color || b.color)) c.color = f
                })
            },
            colorAttribs: function(b) {
                var h = {};
                g(b.color) && (h[this.colorProp || "fill"] = b.color);
                return h
            }
        }
    })(l); (function(b) {
        var g = b.colorPointMixin,
        l = b.each,
        p = b.merge,
        q = b.noop,
        h = b.pick,
        t = b.Series,
        v = b.seriesType,
        n = b.seriesTypes;
        v("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        },
        p(b.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var c;
                n.scatter.prototype.init.apply(this, arguments);
                c = this.options;
                c.pointRange = h(c.pointRange, c.colsize || 1);
                this.yAxis.axisPointRange = c.rowsize || 1
            },
            translate: function() {
                var c = this.options,
                b = this.xAxis,
                g = this.yAxis,
                p = c.pointPadding || 0,
                n = function(a, b, c) {
                    return Math.min(Math.max(b, a), c)
                };
                this.generatePoints();
                l(this.points,
                function(a) {
                    var d = (c.colsize || 1) / 2,
                    e = (c.rowsize || 1) / 2,
                    f = n(Math.round(b.len - b.translate(a.x - d, 0, 1, 0, 1)), -b.len, 2 * b.len),
                    d = n(Math.round(b.len - b.translate(a.x + d, 0, 1, 0, 1)), -b.len, 2 * b.len),
                    m = n(Math.round(g.translate(a.y - e, 0, 1, 0, 1)), -g.len, 2 * g.len),
                    e = n(Math.round(g.translate(a.y + e, 0, 1, 0, 1)), -g.len, 2 * g.len),
                    l = h(a.pointPadding, p);
                    a.plotX = a.clientX = (f + d) / 2;
                    a.plotY = (m + e) / 2;
                    a.shapeType = "rect";
                    a.shapeArgs = {
                        x: Math.min(f, d) + l,
                        y: Math.min(m, e) + l,
                        width: Math.abs(d - f) - 2 * l,
                        height: Math.abs(e - m) - 2 * l
                    }
                });
                this.translateColors()
            },
            drawPoints: function() {
                n.column.prototype.drawPoints.call(this);
                l(this.points,
                function(b) {
                    b.graphic.attr(this.colorAttribs(b))
                },
                this)
            },
            animate: q,
            getBox: q,
            drawLegendSymbol: b.LegendSymbolMixin.drawRectangle,
            alignDataLabel: n.column.prototype.alignDataLabel,
            getExtremes: function() {
                t.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                t.prototype.getExtremes.call(this)
            }
        }), b.extend({
            haloPath: function(b) {
                if (!b) return [];
                var c = this.shapeArgs;
                return ["M", c.x - b, c.y - b, "L", c.x - b, c.y + c.height + b, c.x + c.width + b, c.y + c.height + b, c.x + c.width + b, c.y - b, "Z"]
            }
        },
        g))
    })(l)
});