'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HexagonNode = require('./HexagonNode.js');

var _HexagonNode2 = _interopRequireDefault(_HexagonNode);

var _RectangleNode = require('./RectangleNode.js');

var _RectangleNode2 = _interopRequireDefault(_RectangleNode);

var _SCTNode = require('./SCTNode.js');

var _SCTNode2 = _interopRequireDefault(_SCTNode);

var _CircleNode = require('./CircleNode.js');

var _CircleNode2 = _interopRequireDefault(_CircleNode);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NODES_SPRING_ANIMATION_CONFIG = { stiffness: 80, damping: 20, precision: 0.1 };

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node(props, context) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props, context));

    _this.handleClick = function (node) {
      _this.props.onClick(node);
    };

    _this.handleHover = function (index) {
      _this.props.nodeSelect(index);
    };

    _this.drawNode = function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          k = _ref.k,
          opacity = _ref.opacity;

      var newScale = _this.props.scale * 1.1;
      var nodeScale = _this.props.fav ? newScale : _this.props.scale;
      var self = _this;
      if (_this.props.type === "triangle" || _this.props.type === "star") {
        return _react2.default.createElement(
          'g',
          { className: 'Node', opacity: opacity, transform: x ? 'translate(' + x + ',' + y + ') scale(' + nodeScale + ')' : "" },
          _react2.default.createElement(_SCTNode2.default, {
            label: _this.props.label,
            id: _this.props.id,
            type: _this.props.type,
            highlight: _this.props.highlight,
            nodeSelect: self.handleHover,
            onClick: self.handleClick.bind(self, self.props.node),
            node: _this.props.node,
            color: _this.props.color,
            circleFill: _this.props.circleFill,
            circleRadius: _this.props.circleRadius,
            circleStrokeWidth: _this.props.circleStrokeWidth,
            strokeWidth: _this.props.strokeWidth,
            dept: self.props.node.department })
        );
      }
      if (_this.props.type === 'circle') {
        return _react2.default.createElement(
          'g',
          { className: 'Node', opacity: opacity, transform: x ? 'translate(' + x + ',' + y + ') scale(' + nodeScale + ')' : "" },
          _react2.default.createElement(_CircleNode2.default, {
            label: _this.props.label,
            id: _this.props.id,
            highlight: _this.props.highlight,
            nodeSelect: self.handleHover,
            onClick: self.handleClick.bind(self, self.props.node),
            node: _this.props.node,
            color: _this.props.color,
            circleFill: _this.props.circleFill,
            circleRadius: _this.props.circleRadius,
            circleStrokeWidth: _this.props.circleStrokeWidth,
            strokeWidth: _this.props.strokeWidth })
        );
      } else if (_this.props.type === "hexagon") {
        return _react2.default.createElement(
          'g',
          { className: 'Node', opacity: opacity, transform: x ? 'translate(' + x + ',' + y + ') scale(' + nodeScale + ')' : "" },
          _react2.default.createElement(_HexagonNode2.default, {
            label: _this.props.label,
            id: _this.props.id,
            highlight: _this.props.highlight,
            nodeSelect: self.handleHover,
            onClick: self.handleClick.bind(self, self.props.node),
            node: _this.props.node,
            color: _this.props.color,
            circleFill: _this.props.circleFill,
            circleRadius: _this.props.circleRadius,
            circleStrokeWidth: _this.props.circleStrokeWidth,
            strokeWidth: _this.props.strokeWidth })
        );
      } else {
        return _react2.default.createElement(
          'g',
          { className: 'Node', opacity: opacity, transform: x ? 'translate(' + (x - 20) + ',' + (y - 20) + ') scale(' + nodeScale + ')' : "" },
          _react2.default.createElement(_RectangleNode2.default, {
            label: _this.props.label,
            id: _this.props.id,
            highlight: _this.props.highlight,
            nodeSelect: self.handleHover,
            onClick: self.handleClick.bind(self, self.props.node),
            node: _this.props.node,
            color: _this.props.color,
            circleFill: _this.props.circleFill,
            circleRadius: _this.props.circleRadius,
            circleStrokeWidth: _this.props.circleStrokeWidth,
            strokeWidth: _this.props.strokeWidth })
        );
      }
    };

    _this.state = {
      clicked: false
    };
    return _this;
  }

  _createClass(Node, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.highlight !== this.props.highlight) return true;
      if (nextProps.x !== this.props.x) return true;
      if (nextProps.scale !== this.props.scale) return true;
      if (nextProps.y !== this.props.y) return true;
      if (nextProps.animate !== this.props.animate) return true;
      if (nextProps.opacity !== this.props.opacity) return true;
      if (nextProps.type !== this.props.type) return true;
      if (nextProps.color !== this.props.color) return true;
      if (nextProps.circleFill !== this.props.circleFill) return true;
      if (nextProps.circleRadius !== this.props.circleRadius) return true;
      if (nextProps.circleStrokeWidth !== this.props.circleStrokeWidth) return true;
      if (nextProps.strokeWidth !== this.props.strokeWidth) return true;
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Code to avoid Animation
      // if (!this.props.animate === true) {
      //   // Show static node for optimized rendering
      //   return this.drawNode({ x: this.props.x, y: this.props.y, k: 20, opacity: this.props.opacity });
      // }
      return _react2.default.createElement(
        _reactMotion.Motion,
        {
          style: {
            x: (0, _reactMotion.spring)(this.props.x, NODES_SPRING_ANIMATION_CONFIG),
            y: (0, _reactMotion.spring)(this.props.y, NODES_SPRING_ANIMATION_CONFIG),
            k: (0, _reactMotion.spring)(20, NODES_SPRING_ANIMATION_CONFIG),
            opacity: (0, _reactMotion.spring)(this.props.opacity, NODES_SPRING_ANIMATION_CONFIG)
          } },
        function (interpolated) {
          return _this2.drawNode(interpolated);
        }
      );
    }
  }]);

  return Node;
}(_react.Component);

exports.default = Node;