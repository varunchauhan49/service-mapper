import Constant from '../../../../constant.js';
import React, { Component } from 'react';
var constant = new Constant();

class CircleNode extends Component {
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
          <circle r="20"
           transform={`scale(${constant.CircleScale})`}
           fill="none" stroke={this.props.color} 
           style={{strokeOpacity:"1",strokeWidth:"3"}} />
          <circle r="20"
           className={(this.state.highlight)?"highlight-node-circle":(this.props.highlight)?"highlight-border-circle":false}
           transform={`scale(${constant.CircleScale})`}
           fill="white" stroke="none"/>
          <circle r="20"
           className="background"
           transform={`scale(${constant.CircleScale})`}
           fill="white"
           stroke="none" />
          <circle
            r={this.state.radius}
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

export default CircleNode;