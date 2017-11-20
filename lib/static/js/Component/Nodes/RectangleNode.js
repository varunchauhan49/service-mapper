'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constant = require('../../../../constant.js');

var _constant2 = _interopRequireDefault(_constant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constant = new _constant2.default();

var RectangleNode = function (_Component) {
  _inherits(RectangleNode, _Component);

  function RectangleNode(props, context) {
    _classCallCheck(this, RectangleNode);

    var _this = _possibleConstructorReturn(this, (RectangleNode.__proto__ || Object.getPrototypeOf(RectangleNode)).call(this, props, context));

    _this.handleMouseOver = function () {
      _this.setState({ radius: 10,
        fill: 'red',
        highlight: true });
      _this.props.nodeSelect(_this.props.id);
    };

    _this.handleOut = function () {
      _this.setState({ radius: 5,
        fill: _this.props.color,
        highlight: false });
      _this.props.nodeSelect("");
    };

    _this.state = {
      radius: 5,
      fill: _this.props.color,
      highlight: false
    };
    return _this;
  }

  _createClass(RectangleNode, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        { onMouseOver: this.handleMouseOver, onMouseOut: this.handleOut, onClick: this.props.onClick },
        _react2.default.createElement('rect', { width: '1.5', height: '1.5',
          rx: '0.2', ry: '0.2',
          transform: 'scale(' + constant.Scale + ')',
          fill: 'none', stroke: this.props.color,
          style: { strokeOpacity: "1", strokeWidth: "0.14" } }),
        _react2.default.createElement('rect', { width: '1.5', height: '1.5',
          rx: '0.2', ry: '0.2',
          className: this.state.highlight ? "highlight-border" : this.props.highlight ? "highlight-border" : false,
          transform: 'scale(' + constant.Scale + ')',
          fill: 'white',
          stroke: 'none' }),
        _react2.default.createElement('rect', { width: '1.5', height: '1.5',
          rx: '0.2', ry: '0.2',
          className: 'background',
          transform: 'scale(' + constant.Scale + ')',
          fill: 'white',
          stroke: 'none' }),
        _react2.default.createElement('circle', {
          r: this.state.radius,
          cx: 16,
          cy: 16,
          style: {
            "fill": 'black',
            "stroke": "#fff",
            "strokeWidth": "1.5px"
          } }),
        this.props.icinga > 0 ? _react2.default.createElement(
          'text',
          {
            fontFamily: 'FontAwesome',
            fill: 'red',
            dx: '2.5em',
            dy: '0.5em' },
          '\uF06A'
        ) : false,
        _react2.default.createElement(
          'text',
          {
            className: 'njg-tooltip',
            x: this.props.x,
            y: this.props.y,
            dx: '1.5em',
            dy: '3.5em' },
          this.props.label
        )
      );
    }
  }]);

  return RectangleNode;
}(_react.Component);

exports.default = RectangleNode;