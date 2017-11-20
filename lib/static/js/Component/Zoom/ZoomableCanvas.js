'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ZoomControl = require('./ZoomControl.js');

var _ZoomControl2 = _interopRequireDefault(_ZoomControl);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

var _d3Zoom = require('d3-zoom');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZoomableCanvas = function (_Component) {
  _inherits(ZoomableCanvas, _Component);

  function ZoomableCanvas(props, context) {
    _classCallCheck(this, ZoomableCanvas);

    var _this = _possibleConstructorReturn(this, (ZoomableCanvas.__proto__ || Object.getPrototypeOf(ZoomableCanvas)).call(this, props, context));

    _this.transformToString = function (_ref) {
      var translateX = _ref.translateX,
          translateY = _ref.translateY,
          scaleX = _ref.scaleX;
      return 'translate(' + translateX + ',' + translateY + ') scale(' + scaleX + ')';
    };

    _this.zoomed = function () {
      _this.props.transformFunction(_d3Selection.event.transform);
      var transformString = "translate(" + _d3Selection.event.transform.x + "," + _d3Selection.event.transform.y + ") " + "scale(" + _d3Selection.event.transform.k + ")";
      _this.setState({ transform: transformString,
        scale: _d3Selection.event.transform.k,
        translate: _d3Selection.event.transform });
    };

    _this.handleZoomControlAction = function (scale) {
      // Update the canvas scale (not touching the translation).
      _this.svg.call(_this.zoom.scaleTo, scale);

      // Update the scale state and propagate to the global cache.
      _this.setState({ scale: scale });
    };

    _this.state = {
      transform: "",
      scale: 0.6,
      translate: ""
    };
    return _this;
  }

  _createClass(ZoomableCanvas, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.zoomRestored = false;
      this.zoom = (0, _d3Zoom.zoom)().on('zoom', this.zoomed).scaleExtent([0.25, 2]);
      this.svg = (0, _d3Selection.select)('svg#canvas');
      this.svg.call(this.zoom).on('dblclick.zoom', null);
      if (this.props.nodes.length > 80 && this.props.nodes.length < 151) {
        this.svg.call(this.zoom.scaleTo, 0.7);
      }
      if (this.props.nodes.length > 150) {
        this.svg.call(this.zoom.scaleTo, 0.5);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.update !== this.props.update) {
        this.svg.transition().duration(750).call(this.zoom.transform, d3.zoomIdentity);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          forwardTransform = _props.forwardTransform;

      return _react2.default.createElement(
        'g',
        { className: 'zoomable-canvas' },
        _react2.default.createElement(_ZoomControl2.default, {
          zoomAction: this.handleZoomControlAction,
          minScale: 0.25,
          maxScale: 2,
          scale: this.state.scale
        }),
        _react2.default.createElement(
          'svg',
          { id: 'canvas', width: this.props.width, height: this.props.height,
            viewBox: "0 0 " + this.props.width + " " + this.props.height },
          _react2.default.createElement(
            'g',
            { className: 'zoom-content', transform: this.state.transform },
            forwardTransform ? children(this.state) : children
          )
        )
      );
    }
  }]);

  return ZoomableCanvas;
}(_react.Component);

exports.default = ZoomableCanvas;