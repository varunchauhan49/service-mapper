import Constant from '../../../../constant.js';
import React, { Component } from 'react';
var constant = new Constant();

class HexagonNode extends Component {
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
        <g onMouseOver={this.handleMouseOver} onMouseOut={this.handleOut}  onClick={this.props.onClick}>
          <path d={constant.Cloud} 
            transform={`scale(${constant.Scale})`}
            fill="none" stroke={this.props.color} 
            style={{strokeOpacity:"1",strokeWidth:"0.18"}} />
          <path d={constant.Cloud}
            className={(this.state.highlight)?"highlight-node":(this.props.highlight)?"highlight-border":false}
            transform={`scale(${constant.Scale})`}
            fill="white"
            stroke="none" />
          <path d={constant.Cloud}
            className="background"
            transform={`scale(${constant.Scale})`}
            fill="white"
            stroke="none" />
          <circle
            r={this.state.radius}
            cx={this.props.x}
            cy={this.props.y}
            style={{
              "fill": "black",
              "stroke":"#fff",
              "strokeWidth":"1.5px"
            }}/>
          <text
            className="njg-tooltip"
            x={this.props.x}
            y={this.props.y}
            dy="2.5em">
              {this.props.label}
          </text>
          }
        </g>
    )
  }
}

export default HexagonNode;