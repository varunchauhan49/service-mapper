'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link.js');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Links = function (_Component) {
  _inherits(Links, _Component);

  function Links(props, context) {
    _classCallCheck(this, Links);

    var _this = _possibleConstructorReturn(this, (Links.__proto__ || Object.getPrototypeOf(Links)).call(this, props, context));

    _this.handleClick = function (link) {
      console.log(link);
    };

    _this.drawLinks = function () {
      var self = _this;
      var links = _this.state.links.map(function (link, index) {
        if (self.props.nodeHighlighted === link.source.data.id) {
          return _react2.default.createElement(_Link2.default, {
            opacity: self.props.nodeSelected === "" ? 1 : self.isLink(link, self.props.nodeSelected) ? 1 : 0.15,
            selected: self.props.nodeSelected === "" ? false : self.isLink(link, self.props.nodeSelected) ? true : false,
            datum: link,
            key: index,
            source: true,
            target: false,
            onClick: self.handleClick.bind(this, link) });
        } else if (self.props.nodeHighlighted === link.target.data.id) {
          return _react2.default.createElement(_Link2.default, { opacity: self.props.nodeSelected === "" ? 1 : self.isLink(link, self.props.nodeSelected) ? 1 : 0.15,
            selected: self.props.nodeSelected === "" ? false : self.isLink(link, self.props.nodeSelected) ? true : false,
            datum: link,
            key: index,
            source: false,
            target: true,
            onClick: self.handleClick.bind(this, link) });
        } else {
          return _react2.default.createElement(_Link2.default, {
            opacity: self.props.nodeSelected === "" ? 1 : self.isLink(link, self.props.nodeSelected) ? 1 : 0.15,
            selected: self.props.nodeSelected === "" ? false : self.isLink(link, self.props.nodeSelected) ? true : false,
            datum: link,
            key: index,
            source: false,
            target: false,
            onClick: self.handleClick.bind(this, link) });
        }
      });
      return _react2.default.createElement(
        'g',
        { className: 'links' },
        links
      );
    };

    _this.state = {
      links: ""
    };
    return _this;
  }

  _createClass(Links, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ links: this.props.graphLinks });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.graphLinks !== this.props.graphLinks) {
        this.setState({ links: nextProps.graphLinks });
      }
    }
  }, {
    key: 'isLink',
    value: function isLink(link, nodeName) {
      return link.source.data.id === nodeName || link.target.data.id === nodeName;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        null,
        this.state.links ? this.drawLinks() : false
      );
    }
  }]);

  return Links;
}(_react.Component);

exports.default = Links;