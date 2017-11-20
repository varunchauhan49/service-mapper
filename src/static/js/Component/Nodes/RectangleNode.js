import Constant from '../../../../constant.js';
import React, { Component } from 'react';
var constant = new Constant();

class RectangleNode extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      radius:5,
      fill:this.props.color,
      highlight:false
    };
  }

  componentWillReceiveProps (nextProps) {
  }

  handleMouseOver = () => {
    this.setState({radius:10,
        fill:'red',
        highlight:true});
    this.props.nodeSelect(this.props.id);
  }

  handleOut = () => {
    this.setState({radius:5,
        fill:this.props.color,
        highlight:false});
    this.props.nodeSelect("");
  }

  render () {
    return (
        <g onMouseOver={this.handleMouseOver} onMouseOut={this.handleOut} onClick={this.props.onClick}>
        <rect width="1.5" height="1.5"
        rx = "0.2" ry="0.2"
        transform={`scale(${constant.Scale})`}
        fill="none" stroke={this.props.color} 
        style={{strokeOpacity:"1",strokeWidth:"0.14"}} />

        <rect width="1.5" height="1.5"
        rx = "0.2" ry="0.2"
        className={(this.state.highlight)?"highlight-border":(this.props.highlight)?"highlight-border":false}
        transform={`scale(${constant.Scale})`}
        fill="white"
        stroke="none" />

        <rect width="1.5" height="1.5"
        rx = "0.2" ry="0.2"
        className="background"
        transform={`scale(${constant.Scale})`}
        fill="white"
        stroke="none" />

        <circle
          r={this.state.radius}
          cx={16}
          cy={16}
          style={{
            "fill": 'black',
            "stroke":"#fff",
            "strokeWidth":"1.5px"
          }}/>
        {(this.props.icinga>0)?
          <text
            fontFamily="FontAwesome"
            fill="red"
            dx="2.5em"
            dy="0.5em">
            &#xf06a;
          </text>:false
        }
        <text
          className="njg-tooltip"
          x={this.props.x}
          y={this.props.y}
          dx="1.5em"
          dy="3.5em">
            {this.props.label}
        </text>
        </g>
    )
  }
}

export default RectangleNode;