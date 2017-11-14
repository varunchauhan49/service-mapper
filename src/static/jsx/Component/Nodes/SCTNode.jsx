import Constant from '../../../../constant.js';
import React, { Component } from 'react';
var constant = new Constant();

// Star Circle Triangle Node Type is supported by this component.
class SCTNode extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      radius:5,
      fill:this.props.color,
      highlight:false
    };
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
          <path d={(this.props.type === 'star')?constant.Star:constant.Triangle} 
            transform={`scale(${constant.TriangleScale})`}
            fill="none" stroke={this.props.color} 
            style={{strokeOpacity:"1",strokeWidth:"4"}} />
          <path d={(this.props.type === 'star')?constant.Star:constant.Triangle}
            className={(this.state.highlight)?"highlight-node-scm":(this.props.highlight)?"highlight-border-scm":false}
            transform={`scale(${constant.TriangleScale})`}
            fill="white"
            stroke="none" />
          <path d={(this.props.type === 'star')?constant.Star:constant.Triangle}
            className="background"
            transform={`scale(${constant.TriangleScale})`}
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
            dy={(this.props.dept === 'star')?'3.5em':'2.3em'}>
              {this.props.label}
          </text>
          }
        </g>
    )
  }
}

export default SCTNode;