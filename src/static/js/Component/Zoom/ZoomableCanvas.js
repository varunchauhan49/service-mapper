import ZoomControl from './ZoomControl.js'
import * as d3 from "d3";
import React, { Component } from 'react';
import { event as d3Event, select } from 'd3-selection';
import {zoom} from 'd3-zoom';

class ZoomableCanvas extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        transform:"",
        scale:0.6,
        translate:""
    };
  }
  componentDidMount () {
    this.zoomRestored = false;
    this.zoom = zoom().on('zoom', this.zoomed)
                    .scaleExtent([0.25, 2]);
    this.svg = select('svg#canvas');
    this.svg.call(this.zoom)
        .on('dblclick.zoom', null);
    if(this.props.nodes.length > 80 && this.props.nodes.length <151){
      this.svg.call(this.zoom.scaleTo, 0.7);
    }
    if(this.props.nodes.length > 150){
      this.svg.call(this.zoom.scaleTo, 0.5);
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.update !== this.props.update) {
      this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
    }
  }
  transformToString = ({ translateX, translateY, scaleX}) => (
     `translate(${translateX},${translateY}) scale(${scaleX})`
  );
  zoomed = () => {
    this.props.transformFunction(d3Event.transform);
    var transformString = "translate(" + d3Event.transform.x + "," +  d3Event.transform.y + ") " + 
        "scale(" + d3Event.transform.k + ")" ;
    this.setState({transform:transformString,
        scale:d3Event.transform.k,
        translate:d3Event.transform});
  }
  handleZoomControlAction = (scale) => {
      // Update the canvas scale (not touching the translation).
    this.svg.call(this.zoom.scaleTo, scale);

    // Update the scale state and propagate to the global cache.
    this.setState({scale:scale});

  }
  render() {
    const { children, forwardTransform } = this.props;
    return (
      <g className="zoomable-canvas">
        <ZoomControl
          zoomAction={this.handleZoomControlAction}
          minScale= {0.25}
          maxScale={2}
          scale={this.state.scale}
        />
        <svg id="canvas" width={this.props.width} height={this.props.height}
        viewBox={"0 0 " + this.props.width + " " + this.props.height}>
          <g className="zoom-content" transform={this.state.transform}>
              {forwardTransform ? children(this.state) : children}
          </g>
        </svg>
      </g>
    );
  }
}

export default ZoomableCanvas;