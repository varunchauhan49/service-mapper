'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Node = require('./Node.js');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nodes = function (_Component) {
  _inherits(Nodes, _Component);

  function Nodes(props, context) {
    _classCallCheck(this, Nodes);

    var _this = _possibleConstructorReturn(this, (Nodes.__proto__ || Object.getPrototypeOf(Nodes)).call(this, props, context));

    _this.handleClick = function (node) {
      if (_this.state.selected === node.data.id) {
        _this.setState({ selected: "" });
      } else {
        _this.setState({ selected: node.data.id });
      }
      _this.props.onNodeClicked(node);
    };

    _this.handleHover = function (label) {
      _this.setState({ highlight: label });
      _this.props.hoverLinks(label);
    };

    _this.drawNodes = function (highlight) {
      var self = _this;
      var nodes = _this.state.nodes.map(function (node, index) {
        var shape = node.style.shape_type || 'hexagon';
        var nodeColor = node.style.color || 'rgb(116, 196, 118)';
        var cicrcleFill = node.style.circle_fill || 'black';
        var circleRadius = node.style.circle_radius || 5;
        var circleStrokeWidth = node.style.circle_stroke_width || '1.5px';
        var strokeWidth = node.style.stroke_width || 1;
        return _react2.default.createElement(_Node2.default, {
          key: index,
          x: node.x,
          y: node.y,
          type: shape,
          label: node.data.id,
          circleFill: cicrcleFill,
          circleRadius: circleRadius,
          circleStrokeWidth: circleStrokeWidth,
          strokeWidth: strokeWidth,
          node: node,
          color: nodeColor,
          highlight: self.isConnected(highlight, node.data.id) ? true : false,
          id: node.data.id,
          nodeSelect: self.handleHover,
          onClick: self.handleClick.bind(this, node),
          scale: self.state.selected === "" ? 1 : self.isConnected(self.state.selected, node.data.id) ? self.props.scale : 1,
          animate: self.props.animate ? self.isConnected(self.state.selected, node.data.id) ? true : false : false,
          opacity: self.state.selected === "" ? 1 : self.isConnected(self.state.selected, node.data.id) ? 1 : 0.15
        });
      });
      return nodes;
    };

    _this.state = {
      nodes: "",
      highlight: "",
      selected: "",
      adjMapping: ""
    };
    return _this;
  }

  _createClass(Nodes, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ nodes: this.props.graphNodes });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.graphNodes !== this.props.graphNodes) {
        this.setState({ nodes: nextProps.graphNodes });
      }
      if (nextProps.exitHighlight !== this.props.exitHighlight) {
        this.setState({ selected: "" });
      }
      if (nextProps.nodeSelected !== this.props.nodeSelected) {
        this.setState({ selected: nextProps.nodeSelected });
      }
      if (nextProps.adjMapping !== this.props.adjMapping) {
        this.setState({ adjMapping: nextProps.adjMapping });
      }
    }
  }, {
    key: 'isConnected',
    value: function isConnected(a, b) {
      return this.props.mapping[a + "," + b] || this.props.mapping[b + "," + a] || a === b;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        { className: 'Nodes' },
        this.state.nodes === "" ? false : this.drawNodes(this.state.highlight)
      );
    }
  }]);

  return Nodes;
}(_react.Component);

exports.default = Nodes;