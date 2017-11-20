'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NODES_SPRING_ANIMATION_CONFIG = { stiffness: 80, damping: 20, precision: 0.1 };
var highlight_css = {
  "stroke": "#6e6e9c",
  "strokeWidth": "1.5",
  "fill": "none"
};
var highlight_none = {
  "stroke": "#999",
  "strokeOpacity": "0.6",
  "strokeWidth": "1px",
  "fill": "none"
};

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props, context) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props, context));

    _this.drawLink = function (_ref) {
      var sx = _ref.sx,
          sy = _ref.sy,
          tx = _ref.tx,
          ty = _ref.ty,
          opacity = _ref.opacity;

      // if(this.props.datum.source.id==="sellerpayments"){
      //   console.log("called link",opacity,sx,sy,tx,ty);
      // }
      return _react2.default.createElement(
        'g',
        { className: 'link', onMouseOver: _this.handleMouseOver, opacity: opacity, onMouseOut: _this.handleOut },
        _this.props.datum.source.x ? _react2.default.createElement('path', {
          d: _this.drawCurve(sx, sy, tx, ty, 20),
          markerMid: _this.props.source || _this.props.target ? "url(#end-arrow)" : false,
          onClick: _this.props.onClick,
          style: _this.props.source ? highlight_css : _this.props.target ? highlight_css : highlight_none
        }) : false
      );
    };

    _this.handleMouseOver = function () {
      _this.setState({ highlight: true });
    };

    _this.handleOut = function () {
      _this.setState({ highlight: false });
    };

    _this.state = {
      highlight: false
    };
    return _this;
  }

  _createClass(Link, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.opacity !== this.props.opacity) return true;
      if (nextProps.selected !== this.props.selected) return true;
      if (nextProps.source !== this.props.source) return true;
      if (nextProps.target !== this.props.target) return true;
      if (nextProps.datum.source.x !== this.props.datum.source.x) return true;
      if (nextProps.datum.source.y !== this.props.datum.source.y) return true;
      if (nextProps.datum.target.x !== this.props.datum.target.x) return true;
      if (nextProps.datum.target.y !== this.props.datum.target.y) return true;
      return false;
    }
  }, {
    key: 'controPoints',
    value: function controPoints(p, Ax, Ay, Bx, By, M) {

      var Jx = Ax + (Bx - Ax) * p;
      var Jy = Ay + (By - Ay) * p;

      // We need a and b to find theta, and we need to know the sign of 
      // each to make sure that the orientation is correct.
      var a = Bx - Ax;
      var asign = a < 0 ? -1 : 1;
      var b = By - Ay;
      var theta = Math.atan(b / a);

      // Find the point that's perpendicular to J on side
      var costheta = asign * Math.cos(theta);
      var sintheta = asign * Math.sin(theta);

      // Find c and d
      var c = M * sintheta;
      var d = M * costheta;

      // Use c and d to find Kx and Ky
      var Kx = Jx - c;
      var Ky = Jy + d;
      return { "x": Kx, "y": Ky };
    }
  }, {
    key: 'drawCurve',
    value: function drawCurve(Ax, Ay, Bx, By, M) {
      // side is either 1 or -1 depending on which side you want the curve to be on.
      // Find midpoint J

      var point1 = this.controPoints(0.25, Ax, Ay, Bx, By, M);
      var point2 = this.controPoints(0.5, Ax, Ay, Bx, By, M);
      var point3 = this.controPoints(0.75, Ax, Ay, Bx, By, M);

      return "M" + Ax + "," + Ay + "S" + point1.x + "," + point1.y + " " + point2.x + "," + point2.y + "S" + point3.x + "," + point3.y + " " + Bx + "," + By;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'g',
        null,
        this.props.datum.source.x && !(this.props.datum.source.x === this.props.datum.target.x && this.props.datum.source.y === this.props.datum.target.y) ? _react2.default.createElement(
          _reactMotion.Motion,
          {
            style: {
              sx: (0, _reactMotion.spring)(this.props.datum.source.x, NODES_SPRING_ANIMATION_CONFIG),
              sy: (0, _reactMotion.spring)(this.props.datum.source.y, NODES_SPRING_ANIMATION_CONFIG),
              tx: (0, _reactMotion.spring)(this.props.datum.target.x, NODES_SPRING_ANIMATION_CONFIG),
              ty: (0, _reactMotion.spring)(this.props.datum.target.y, NODES_SPRING_ANIMATION_CONFIG),
              opacity: (0, _reactMotion.spring)(this.props.opacity, NODES_SPRING_ANIMATION_CONFIG)
            } },
          function (interpolated) {
            return _this2.drawLink(interpolated);
          }
        ) : false
      );
    }
  }]);

  return Link;
}(_react2.default.Component);

exports.default = Link;