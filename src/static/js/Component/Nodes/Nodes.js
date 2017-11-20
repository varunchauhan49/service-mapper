import React, { Component } from 'react';
import Node from './Node.js';

class Nodes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nodes: "",
      highlight:"",
      selected:"",
      adjMapping:""
    };
  }
  
  handleClick = (node) =>{
    if(this.state.selected === node.data.id){
      this.setState({selected:""})
    }
    else{
      this.setState({selected:node.data.id})
    }
    this.props.onNodeClicked(node);
  }
  componentDidMount () {
    this.setState({nodes:this.props.graphNodes})
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.graphNodes !== this.props.graphNodes) {
      this.setState({nodes:nextProps.graphNodes})
    }
    if (nextProps.exitHighlight !== this.props.exitHighlight) {
      this.setState({selected:""})
    }
    if (nextProps.nodeSelected !== this.props.nodeSelected) {
      this.setState({selected:nextProps.nodeSelected})
    }
    if (nextProps.adjMapping !== this.props.adjMapping) {
      this.setState({adjMapping:nextProps.adjMapping})
    }
  }
  isConnected(a, b) {
    return this.props.mapping[a + "," + b] || this.props.mapping[b + "," + a] || a === b;
  }
  handleHover = (label) =>{
    this.setState({highlight:label});
    this.props.hoverLinks(label);
  }
  drawNodes = (highlight) =>{
    var self = this;
    var nodes = this.state.nodes.map(function (node, index) {
      var shape = node.style.shape_type || 'hexagon';
      var nodeColor = node.style.color || 'rgb(116, 196, 118)';
      var cicrcleFill = node.style.circle_fill || 'black';
      var circleRadius = node.style.circle_radius || 5;
      var circleStrokeWidth = node.style.circle_stroke_width || '1.5px';
      var strokeWidth = node.style.stroke_width || 1;
      return (
        <Node 
          key={index}
          x={node.x}
          y={node.y}
          type={shape}
          label={node.data.id}
          circleFill={cicrcleFill}
          circleRadius={circleRadius}
          circleStrokeWidth={circleStrokeWidth}
          strokeWidth={strokeWidth}
          node={node}
          color={nodeColor}
          highlight={(self.isConnected(highlight,node.data.id))?true:false}
          id={node.data.id}
          nodeSelect={self.handleHover}
          onClick={self.handleClick.bind(this,node)}
          scale={(self.state.selected === "")?1:self.isConnected(self.state.selected,node.data.id)?self.props.scale:1}
          animate={(self.props.animate)?self.isConnected(self.state.selected,node.data.id)?true:false:false}
          opacity={(self.state.selected === "")?1:self.isConnected(self.state.selected,node.data.id)?1:0.15}
          />
        )
    })
    return nodes;
  }
  render() {
    return (
      <g className="Nodes">
        {(this.state.nodes === "")?false:this.drawNodes(this.state.highlight)}
      </g>
    );
  }
}

export default Nodes