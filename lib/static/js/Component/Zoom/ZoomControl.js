'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Scale = require('d3-scale');

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

require('rc-slider/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SLIDER_STEP = 0.001;
var CLICK_STEP = 0.05;

var ZoomControl = function (_Component) {
  _inherits(ZoomControl, _Component);

  function ZoomControl(props, context) {
    _classCallCheck(this, ZoomControl);

    var _this = _possibleConstructorReturn(this, (ZoomControl.__proto__ || Object.getPrototypeOf(ZoomControl)).call(this, props, context));

    _this.getSliderScale = function (_ref) {
      var minScale = _ref.minScale,
          maxScale = _ref.maxScale;
      return (0, _d3Scale.scaleLog)()
      // Zoom limits may vary between different views.
      .domain([minScale, maxScale])
      // Taking the unit range for the slider ensures consistency
      // of the zoom button steps across different zoom domains.
      .range([0, 1])
      // This makes sure the input values are always clamped into the valid domain/range.
      .clamp(true);
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleZoomOut = _this.handleZoomOut.bind(_this);
    _this.handleZoomIn = _this.handleZoomIn.bind(_this);
    _this.getSliderValue = _this.getSliderValue.bind(_this);
    _this.toZoomScale = _this.toZoomScale.bind(_this);

    _this.state = {};
    return _this;
  }

  _createClass(ZoomControl, [{
    key: 'handleChange',
    value: function handleChange(sliderValue) {
      this.props.zoomAction(this.toZoomScale(sliderValue));
    }
  }, {
    key: 'handleZoomOut',
    value: function handleZoomOut() {
      this.props.zoomAction(this.toZoomScale(this.getSliderValue() - CLICK_STEP));
    }
  }, {
    key: 'handleZoomIn',
    value: function handleZoomIn() {
      this.props.zoomAction(this.toZoomScale(this.getSliderValue() + CLICK_STEP));
    }
  }, {
    key: 'getSliderValue',
    value: function getSliderValue() {
      var toSliderValue = this.getSliderScale(this.props);
      return toSliderValue(this.props.scale);
    }
  }, {
    key: 'toZoomScale',
    value: function toZoomScale(sliderValue) {
      var toSliderValue = this.getSliderScale(this.props);
      return toSliderValue.invert(sliderValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.getSliderValue();
      return _react2.default.createElement(
        'div',
        { className: 'zoom-control' },
        _react2.default.createElement(
          'a',
          { className: 'zoom-in', onClick: this.handleZoomIn },
          _react2.default.createElement('span', { className: 'fa fa-plus' })
        ),
        _react2.default.createElement(_rcSlider2.default, { value: value, max: 1, step: SLIDER_STEP, vertical: true, onChange: this.handleChange }),
        _react2.default.createElement(
          'a',
          { className: 'zoom-out', onClick: this.handleZoomOut },
          _react2.default.createElement('span', { className: 'fa fa-minus' })
        )
      );
    }
  }]);

  return ZoomControl;
}(_react.Component);

exports.default = ZoomControl;