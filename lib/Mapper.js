'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _Links = require('./static/js/Component/Links/Links.js');

var _Links2 = _interopRequireDefault(_Links);

var _Nodes = require('./static/js/Component/Nodes/Nodes.js');

var _Nodes2 = _interopRequireDefault(_Nodes);

var _ZoomableCanvas = require('./static/js/Component/Zoom/ZoomableCanvas.js');

var _ZoomableCanvas2 = _interopRequireDefault(_ZoomableCanvas);

var _halogen = require('halogen');

var Loader = _interopRequireWildcard(_halogen);

require('./static/css/graph.css');

require('./static/css/zoom.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EdgeMarkerDefinition = function EdgeMarkerDefinition(_ref) {
  var selectedNodeId = _ref.selectedNodeId;

  return _react2.default.createElement(
    'defs',
    null,
    _react2.default.createElement(
      'marker',
      {
        className: 'edge-marker',
        id: 'end-arrow',
        viewBox: '0 -5 10 10',
        refX: '5',
        refY: '0',
        markerWidth: 8,
        markerHeight: 8,
        orient: 'auto' },
      _react2.default.createElement('path', { style: { fill: "grey" }, d: 'M0,-5L10,0L0,5' })
    )
  );
};

var Mapper = function (_Component) {
  _inherits(Mapper, _Component);

  function Mapper(props, context) {
    _classCallCheck(this, Mapper);

    var _this = _possibleConstructorReturn(this, (Mapper.__proto__ || Object.getPrototypeOf(Mapper)).call(this, props, context));

    _this.componentDidMount = function () {
      _this.setState({ loading: true });
      if (_this.state.graphData) {
        _this.forceLayout(_this.state.graphData);
      }
    };

    _this.forceLayout = function (data) {
      var self = _this;
      var linkedByIndex = [];
      var adj = [];
      var nodesID = [];

      data.nodes.map(function (d, index) {
        adj[d.data.id] = [];
        nodesID[index] = d.data.id;
      });
      data.links.forEach(function (d) {
        var source = nodesID[d.source];
        var target = nodesID[d.target];
        linkedByIndex[source + "," + target] = true;
        adj[source].push(target);
        adj[target].push(source);
      });
      var width = self.state.svgWidth,
          height = self.state.svgHeight;
      var simulation = d3.forceSimulation(data.nodes).force("link", d3.forceLink(data.links).distance(100)).force("collide", d3.forceCollide(function (d) {
        return 50;
      }).iterations(1)).force("charge", d3.forceManyBody()).force("center", d3.forceCenter(width / 2, height / 2)).force("y", d3.forceY()).force("x", d3.forceX()).stop();

      for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
        simulation.tick();
      }

      self.setState({ graphData: data,
        selectedNodes: data,
        nodeSelected: "",
        nodeHighlight: "",
        mapping: linkedByIndex,
        adjMatrix: adj,
        loading: false
      });
      if (self.props.searchKey !== "") {
        self.state.graphData.nodes.forEach(function (item) {
          if (item.data.id === self.props.searchKey) {
            // self.handleNodeClick(item);
          }
        });
      }
    };

    _this.handleClick = function (event) {
      console.log(event);
    };

    _this.handleNodeHover = function (index) {
      _this.setState({ nodeHighlight: index });
    };

    _this.getCircularNodes = function (node) {
      var self = _this;
      var circularNodes = [];

      var transformX = _this.state.transform ? _this.state.transform.x : 0;
      var transformY = _this.state.transform ? _this.state.transform.y : 0;
      var transformK = _this.state.transform ? _this.state.transform.k : 1;

      var centerX = (parseInt(self.state.svgWidth) - 456 * transformK) / 2;
      var centerY = (parseInt(self.state.svgHeight) + 50 * transformK) / 2;

      centerX = (-transformX + centerX) / transformK;
      centerY = (-transformY + centerY) / transformK;

      var nodeId = node.data.id;
      var idlist = _this.state.adjMatrix[nodeId];
      var innerCount;
      var centerCount;
      var lastCount;

      var circularRadiusLast = 300 / _this.scale;
      var circularRadiusCenter = 200 / _this.scale;
      var circularRadiusInner = 100 / _this.scale;

      var circularOffsetAngle = Math.PI / 4;

      var circularInnerAngle;
      var circularCenterAngle;
      var circularLastAngle;

      idlist.map(function (item, i) {
        circularNodes[item] = { "loc": i + 1 };
      });

      var countNodes = Object.keys(circularNodes).length;

      if (countNodes < 15) {
        circularInnerAngle = 2 * Math.PI / countNodes;
        innerCount = countNodes;
      } else if (countNodes < 40) {
        innerCount = Math.round(countNodes * 0.3);
        centerCount = Math.round(countNodes * 0.7);
        circularInnerAngle = 2 * Math.PI / innerCount;
        circularCenterAngle = 2 * Math.PI / centerCount;
      } else {
        innerCount = Math.round(countNodes * .2);
        centerCount = Math.round(countNodes * .35);
        lastCount = Math.round(countNodes * .45);
        circularInnerAngle = 2 * Math.PI / innerCount;
        circularCenterAngle = 2 * Math.PI / centerCount;
        circularLastAngle = 2 * Math.PI / lastCount;
      }

      var count = 0;
      var data = _.cloneDeep(_this.state.selectedNodes);
      var loc1 = 0,
          loc2 = 0,
          loc3 = 0;
      data.nodes.map(function (item, i) {
        var loc = void 0,
            angle = void 0,
            node = void 0;
        if (circularNodes[item.data.id]) {
          if (count < innerCount) {
            loc = circularNodes[item.data.id].loc + 1;
            angle = circularOffsetAngle + loc1 * circularInnerAngle;
            node = _.cloneDeep(item);
            node.x = centerX + circularRadiusInner * Math.sin(angle);
            node.y = centerY + circularRadiusInner * Math.cos(angle);
            circularNodes[item.data.id] = node;
            count++;
            loc1 = loc1 + 1;
          } else if (count < innerCount + centerCount) {
            loc = circularNodes[item.data.id].loc;
            angle = circularOffsetAngle + loc2 * circularCenterAngle;
            node = _.cloneDeep(item);
            node.x = centerX + circularRadiusCenter * Math.sin(angle);
            node.y = centerY + circularRadiusCenter * Math.cos(angle);
            circularNodes[item.data.id] = node;
            count++;
            loc2 = loc2 + 1;
          } else {
            loc = circularNodes[item.data.id].loc;
            angle = circularOffsetAngle + loc3 * circularLastAngle;
            node = _.cloneDeep(item);
            node.x = centerX + circularRadiusLast * Math.sin(angle);
            node.y = centerY + circularRadiusLast * Math.cos(angle);
            circularNodes[item.data.id] = node;
            count++;
            loc3 = loc3 + 1;
          }
        }
      });
      return circularNodes;
    };

    _this.handleNodeClick = function (node) {
      _this.props.nodeClicked(node);
      var self = _this;
      var circularNodes = [];
      circularNodes = _this.getCircularNodes(node);

      var transformX = _this.state.transform ? _this.state.transform.x : 0;
      var transformY = _this.state.transform ? _this.state.transform.y : 0;
      var transformK = _this.state.transform ? _this.state.transform.k : 1;

      var centerX = (parseInt(self.state.svgWidth) - 456 * transformK) / 2;
      var centerY = (parseInt(self.state.svgHeight) + 50 * transformK) / 2;

      centerX = (-transformX + centerX) / transformK;
      centerY = (-transformY + centerY) / transformK;

      if (_this.state.nodeSelected === node.data.id) {
        _this.props.handleNodeDetailsClose();
        _this.setState({ graphData: _this.state.selectedNodes,
          scale: 1,
          nodeSelected: "" });
        return;
      }
      var data = _.cloneDeep(_this.state.selectedNodes);
      // var nodes = this.state.graphData.nodes;
      data.nodes.map(function (item, i) {
        if (node.data.id === item.data.id) {
          item.x = centerX;
          item.y = centerY;
        } else if (circularNodes[item.data.id]) {
          item.x = circularNodes[item.data.id].x;
          item.y = circularNodes[item.data.id].y;
        } else {}
      });
      var scale = _this.state.transform.x ? 1 / _this.state.transform.k : 1;
      _this.setState({ graphData: data,
        nodeSelected: node.data.id,
        scale: scale,
        animate: true });
    };

    _this.handleTransform = function (Newtransform) {
      _this.scale = Newtransform.k;
      _this.setState({ transform: Newtransform });
    };

    var svgWidth = d3.select("#svgDiv").style("position", "relative").style('width').split("px")[0];
    var svgHeight = d3.select("#svgDiv").style("position", "relative")._parents[0].clientHeight;
    _this.scale = 1;
    // this.onNodeClicked = this.handleNodeClick.bind(this);

    _this.state = {
      svgWidth: svgWidth,
      svgHeight: svgHeight,
      nodes: null,
      links: null,
      graphData: _this.props.mapData,
      mapping: [],
      nodeHighlight: "",
      nodeSelected: "",
      adjMatrix: [],
      selectedNodes: '',
      animate: false,
      exitHighlight: false,
      transform: "",
      loading: false,
      metric: "",
      scale: 1,
      sla: ""
    };
    return _this;
  }

  _createClass(Mapper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.update !== this.props.update && nextProps.mapData) {
        this.setState({ loading: true });
        this.forceLayout(nextProps.mapData);
      }
      if (nextProps.exitHighlight !== this.props.exitHighlight) {
        this.setState({ nodeSelected: "",
          graphData: this.state.selectedNodes,
          exitHighlight: !this.state.exitHighlight });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _style, _loaderStyle;

      var color = '#4DAF7C';
      var style = (_style = {
        display: '-webkit-flex'
      }, _defineProperty(_style, 'display', 'flex'), _defineProperty(_style, 'WebkitFlex', '0 1 auto'), _defineProperty(_style, 'flex', '0 1 auto'), _defineProperty(_style, 'WebkitFlexDirection', 'column'), _defineProperty(_style, 'flexDirection', 'column'), _defineProperty(_style, 'WebkitFlexGrow', 1), _defineProperty(_style, 'flexGrow', 1), _defineProperty(_style, 'WebkitFlexShrink', 0), _defineProperty(_style, 'flexShrink', 0), _defineProperty(_style, 'WebkitFlexBasis', '25%'), _defineProperty(_style, 'flexBasis', '25%'), _defineProperty(_style, 'maxWidth', '100%'), _defineProperty(_style, 'height', '100vh'), _defineProperty(_style, 'WebkitAlignItems', 'center'), _defineProperty(_style, 'alignItems', 'center'), _defineProperty(_style, 'WebkitJustifyContent', 'center'), _defineProperty(_style, 'justifyContent', 'center'), _style);
      var loaderStyle = (_loaderStyle = {
        boxSizing: 'border-box',
        display: '-webkit-flex'
      }, _defineProperty(_loaderStyle, 'display', 'flex'), _defineProperty(_loaderStyle, 'WebkitFlex', '0 1 auto'), _defineProperty(_loaderStyle, 'flex', '0 1 auto'), _defineProperty(_loaderStyle, 'WebkitFlexDirection', 'row'), _defineProperty(_loaderStyle, 'flexDirection', 'row'), _defineProperty(_loaderStyle, 'WebkitFlexWrap', 'wrap'), _defineProperty(_loaderStyle, 'flexWrap', 'wrap'), _loaderStyle);
      return _react2.default.createElement(
        'div',
        { className: 'dependencyGraph' },
        this.state.loading ? _react2.default.createElement(
          'div',
          { style: loaderStyle },
          _react2.default.createElement(
            'div',
            { style: style },
            _react2.default.createElement(Loader.ScaleLoader, { color: color })
          )
        ) : false,
        this.state.graphData && !this.state.loading ? _react2.default.createElement(
          _ZoomableCanvas2.default,
          {
            transformFunction: this.handleTransform,
            width: this.state.svgWidth,
            height: this.state.svgHeight,
            update: this.state.loading,
            nodes: this.state.graphData.nodes },
          _react2.default.createElement(EdgeMarkerDefinition, null),
          _react2.default.createElement(_Links2.default, { nodeHighlighted: this.state.nodeHighlight,
            nodeSelected: this.state.nodeSelected,
            graphLinks: this.state.graphData.links }),
          _react2.default.createElement(_Nodes2.default, {
            scale: this.state.scale,
            onNodeClicked: this.handleNodeClick.bind(this),
            nodeSelected: this.state.nodeSelected,
            exitHighlight: this.state.exitHighlight,
            hoverLinks: this.handleNodeHover,
            mapping: this.state.mapping,
            adjMapping: this.state.adjMatrix,
            graphNodes: this.state.graphData.nodes,
            animate: this.state.animate })
        ) : false
      );
    }
  }]);

  return Mapper;
}(_react.Component);

exports.default = Mapper;