import React, { Component } from 'react';
import HexagonNode from './HexagonNode.js';
import RectangleNode from './RectangleNode.js';
import SCTNode from './SCTNode.js';
import CircleNode from './CircleNode.js';
import { Motion, spring } from 'react-motion';

const NODES_SPRING_ANIMATION_CONFIG = { stiffness: 80, damping: 20, precision: 0.1 };

class Node extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clicked:false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.highlight !== this.props.highlight)
        return true;
    if(nextProps.x !== this.props.x)
        return true;
    if(nextProps.scale !== this.props.scale)
        return true;
    if(nextProps.y !== this.props.y)
        return true;
    if(nextProps.animate !== this.props.animate)
        return true;
    if(nextProps.opacity !== this.props.opacity)
        return true;
    if(nextProps.type !== this.props.type)
        return true;
    if(nextProps.color !== this.props.color)
        return true;
    if(nextProps.circleFill !== this.props.circleFill)
        return true;
    if(nextProps.circleRadius !== this.props.circleRadius)
        return true;
    if(nextProps.circleStrokeWidth !== this.props.circleStrokeWidth)
        return true;
    if(nextProps.strokeWidth !== this.props.strokeWidth)
        return true;
    return false
  }

  handleClick = (node) =>{
    this.props.onClick(node);
  }

  handleHover = (index) =>{
    this.props.nodeSelect(index);
  }

  drawNode = ({ x, y, k, opacity }) => {
    var newScale = this.props.scale * 1.1;
    var nodeScale = (this.props.fav)?newScale: this.props.scale;
    var self = this;
    if(this.props.type === "triangle" || this.props.type === "star"){
      return (
      <g className="Node" opacity={opacity} transform={(x)?`translate(${x},${y}) scale(${nodeScale})`:""}>
        <SCTNode
          label={this.props.label}
          id={this.props.id}
          type={this.props.type}
          highlight={this.props.highlight}
          nodeSelect={self.handleHover}
          onClick={self.handleClick.bind(self,self.props.node)}
          node={this.props.node}
          color={this.props.color}
          circleFill={this.props.circleFill}
          circleRadius={this.props.circleRadius}
          circleStrokeWidth={this.props.circleStrokeWidth}
          strokeWidth={this.props.strokeWidth}
          dept={self.props.node.department} />
      </g>
      )
    }
    if(this.props.type === 'circle'){
      return (
        <g className="Node" opacity={opacity} transform={(x)?`translate(${x},${y}) scale(${nodeScale})`:""}>
          <CircleNode
            label={this.props.label}
            id={this.props.id}
            highlight={this.props.highlight}
            nodeSelect={self.handleHover}
            onClick={self.handleClick.bind(self,self.props.node)}
            node={this.props.node}
            color={this.props.color}
            circleFill={this.props.circleFill}
            circleRadius={this.props.circleRadius}
            circleStrokeWidth={this.props.circleStrokeWidth}
            strokeWidth={this.props.strokeWidth}/>
        </g>
      )
    }
    else if(this.props.type === "hexagon"){
      return (
      <g className="Node" opacity={opacity} transform={(x)?`translate(${x},${y}) scale(${nodeScale})`:""}>
        <HexagonNode
          label={this.props.label}
          id={this.props.id}
          highlight={this.props.highlight}
          nodeSelect={self.handleHover}
          onClick={self.handleClick.bind(self,self.props.node)}
          node={this.props.node}
          color={this.props.color}
          circleFill={this.props.circleFill}
          circleRadius={this.props.circleRadius}
          circleStrokeWidth={this.props.circleStrokeWidth}
          strokeWidth={this.props.strokeWidth}/>
      </g>
      ) 
    }
    else{
      return (
      <g className="Node" opacity={opacity} transform={(x)?`translate(${x - 20},${y - 20}) scale(${nodeScale})`:""}>
        <RectangleNode
          label={this.props.label}
          id={this.props.id}
          highlight={this.props.highlight}
          nodeSelect={self.handleHover}
          onClick={self.handleClick.bind(self,self.props.node)}
          node={this.props.node}
          color={this.props.color}
          circleFill={this.props.circleFill}
          circleRadius={this.props.circleRadius}
          circleStrokeWidth={this.props.circleStrokeWidth}
          strokeWidth={this.props.strokeWidth}/>
      </g>
      )
    }
  }

  render() {
    // Code to avoid Animation
    // if (!this.props.animate === true) {
    //   // Show static node for optimized rendering
    //   return this.drawNode({ x: this.props.x, y: this.props.y, k: 20, opacity: this.props.opacity });
    // }
    return (
        <Motion
          style={{
            x: spring(this.props.x, NODES_SPRING_ANIMATION_CONFIG),
            y: spring(this.props.y, NODES_SPRING_ANIMATION_CONFIG),
            k: spring(20, NODES_SPRING_ANIMATION_CONFIG),
            opacity: spring(this.props.opacity, NODES_SPRING_ANIMATION_CONFIG),
          }}>
            {interpolated =>this.drawNode(interpolated)}
        </Motion>
    );
  }
}

export default Node;