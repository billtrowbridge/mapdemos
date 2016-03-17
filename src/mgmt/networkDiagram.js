// exports for browser and node.js

// NOTE: Still being worked on.  Incomplete.

// Using code from http://flowingdata.com/2012/08/02/how-to-make-an-interactive-network-visualization/
// USES: D3.js

(function (root) {

    // TODO: Ughh!!! These are globals.
    var node;
    var link;

    var Force = function () {
        var _charge = 0,
            _distance = 0,
            _tickCallback = function (e) {},

            _nodes = [],
            _links = [],

            _countTicks = 0,
            _interval = 0;
            
        var _tick = function () {
            _countTicks++;
            if (_tickCallback)
                _tickCallback({event: 'tick', time: Date.now(), ticks: _countTicks}); 
        };
        

        this.charge = function (chg) { _charge = chg; return this; };
        
        this.linkDistance = function (distance) { _distance = distance; return this; };
        
        this.on = function (event, callback) {
            if (event == 'tick') _tickCallback = callback;
            return this;
        };
        
        this.nodes = function (list, svg) {
            var height = svg[0][0].getBoundingClientRect().height;
            _nodes = list;
            for (var i=0, len=_nodes.length; i<len; i++) {
                var n = _nodes[i];
                if (!n.x) n.x = (n.layer*2+1)*_distance*2; // (i+1)*_distance*2;
                if (!n.y) n.y =
                    n.layer
                        ? ((n.layerItem + 0.5) * (height / n.layerCount))
                        : _charge;
                if (!n.radius) {
                    n.color = 'black';
                    if (n.cpupct) {
                        // Vary from green to red as cpu percent goes from 0 to 100
                        n.color = 'rgb('+Math.floor( 255*n.cpupct/100)+','+Math.floor( 255*(100-n.cpupct)/100)+',0)';
                        n.radius = n.cpupct;
                    } else {
                        n.color = 'red';
                        n.radius = 10;
                    }
                }
            }
            return this;
        };
        
        this.links = function (list) {
            _links = list;
            return this;
        };
        
        this.run = function () {
            if (_interval) {
                clearInterval(_interval);
                _interval = 0;
            }
            _interval = setInterval(_tick, 1000)
            _tick();
            return this;
        }
    };

    // Typically called from $(document).ready()
    function startNetwork() {
        var force = new Force();
        setLayout(force);
        var myNetwork = new Network();

        // NOTE: Reads a single object with "nodes" and "links" properties.
        // "nodes" is an array of node objects with properties: name, role, id, and cpupct (CPU Percent),
        // where name and role are not yet used (2016-03-14) so they are optional,
        // id is a unique identifier for a node, and cpupct represents the CPU percent usage.
        // "links" is an array of link objects with properties: source and target,
        // each of which is the value of an id for a node object.
        
        d3.json("./data/network.json", function (json) {
           myNetwork.setup("#vis", 900, 500, force, json);
        });
        
        return myNetwork;
    }

    function setLayout(force) {
        force.charge(-200)
            .linkDistance(50)
            .on('tick', forceTick);
    }

    function setupData(data) {
        // TODO: INSERT ALL CODE

        // ... ... ...
    }

    // class
    function Network() {
        var _svg,
            _layout,
            _data;
        
        this.setup = function (selector, width, height, layout, data) {
            _svg = d3.select(selector)
                .attr("width", width)
                .attr("height", height);
            _layout = layout
            _data = data;
            
            this.update();
        };

        this.update = function () {
            updateNetwork(_svg, _layout, _data);
        };

        this.toggleLayout = function (newLayout) {
            // TODO
        };
    }

    function filterNodes(nodes) {
        return nodes;
    }

    function arrayFindFirst(arr, propname, propvalue) {
        var list = arrayFindAll(arr, propname, propvalue);
        var result = null;
        if (list) result = list[0];
        return result;
    }

    function arrayFindAll(arr, propname, propvalue) {
        var list = arr.filter(function( obj ) {
           return obj[propname] == propvalue;
        });
        return list;
    }

    function filterLinks(links, nodes) {
        // Replace the source and target node-ids with the actual source and target node objects.
        for (var i=0, len=links.length; i<len; i++) {
            var source = arrayFindFirst(nodes, 'id', links[i].source);
            if (source) links[i].source = source;
            
            var target = arrayFindFirst(nodes, 'id', links[i].target);
            if (target) links[i].target = target;
        }
        return links;
    }

    function labelNodesAsLayers(nodes, links) {
        // Label each nodea with layer.
        for (var i=0, len=nodes.length; i<len; i++) {
            if (!nodes[i].layer) labelNodeAsLayer(nodes[i], 1, nodes, links);
        }

        // Count nodes in each layer, and label nodes in each layer with increasing layerItem
        var counts = [0];
        for (var layer=1; true; layer++) {
            var item = 0;
            for (var i=0, len=nodes.length; i<len; i++) {
                if (nodes[i].layer == layer) {
                    nodes[i].layerItem = item;
                    item++;
                    done = false;
                }
            }
            if (!item) break;
            counts[layer] = item;
        }
        // Add the layerCount to each node.
        for (var i=0, len=nodes.length; i<len; i++) {
            nodes[i].layerCount = counts[nodes[i].layer];
        }
    }

    function labelNodeAsLayer(node, layer, nodes, links) {
        // NOTE: Cycles will cause this to infinite loop.
        if (node.layer && node.layer >= layer) {
            // When it already is a layer same level or deeper, do nothing.
        } else {
            node.layer = layer;
            // Increment children
            for (var i=0, len=links.length; i<len; i++) {
                if (links[i].source == node) {
                    labelNodeAsLayer(links[i].target, layer+1, nodes, links);
                }
            }
        }
        
    };

    function updateNetwork(svg, force, data) {
        curNodes = filterNodes(data.nodes);
        curLinks = filterLinks(data.links, curNodes);
        labelNodesAsLayers(curNodes, curLinks);

        //if (layout == 'force') {
        force.links(curLinks);
        updateLinks(svg, curLinks);
        //} else {
        //    force.links([]);
        //    if (link) {
        //        link.data([]).exit().remove();
        //        link = null;
        //    }
        //}
        
        //if (layout == 'radial') {
        //    artists = sortedArtists(curNodes, curLinks);
        //    updateCenters(artists);
        //}
        force.nodes(curNodes, svg);
        updateNodes(svg, curNodes);    

        force.run();
    }

    function nodeColors(item) {
        return '#888'; // grey
    }

    function strokeFor(d) {
        return '#000';  // black
    }

    function showDetails() {
        // TODO
    }

    function hideDetails() {
        // TODO
    }

    function updateNodes(nodesG, curNodes) {
        node = nodesG.selectAll('circle.node')
            .data(curNodes, function (d) { return d.id; });

        node.enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", function (d) { return d.radius; })
            //.style("fill", function (d) { return nodeColors(d.artist); })
            .style("fill", function (d) { return d.color; })
            .style("stroke", function (d) { return 'black'; })      // return strokeFor(d); })
            .style("stroke-width", 1.0)

        node.on("mouseover", showDetails)
            .on("mouseout", hideDetails)

        node.exit().remove()
    }

    function updateLinks(linksG, curLinks) {
        link = linksG.selectAll("line.link")
            .data(curLinks, function (d) { return d.source.id + '_' + d.target.id; });

        link.enter().append("line")
            .attr("class", "link")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.8)
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        link.exit().remove();
    }

    function forceTick(e) {
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
    }

    // TODO: To support AMD, see http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
    // TODO: not ideal export
    // export to browser or node.js 
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // for one
        module.exports = startNetwork;
        // for multiple
        //module.exports.method1 = method1;
    } else {
        root.startNetwork = startNetwork;
    }
    
})(this);