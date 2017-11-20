import React, { Component } from 'react';
import { scaleLog } from 'd3-scale';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SLIDER_STEP = 0.001;
const CLICK_STEP = 0.05;

class ZoomControl extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.getSliderValue = this.getSliderValue.bind(this);
    this.toZoomScale = this.toZoomScale.bind(this);

    this.state = {
        
    };
  }
  getSliderScale = ({ minScale, maxScale }) => (
    scaleLog()
        // Zoom limits may vary between different views.
        .domain([minScale, maxScale])
        // Taking the unit range for the slider ensures consistency
        // of the zoom button steps across different zoom domains.
        .range([0, 1])
        // This makes sure the input values are always clamped into the valid domain/range.
        .clamp(true)
  );

  handleChange(sliderValue) {
    this.props.zoomAction(this.toZoomScale(sliderValue));
  }

  handleZoomOut() {
    this.props.zoomAction(this.toZoomScale(this.getSliderValue() - CLICK_STEP));
  }

  handleZoomIn() {
    this.props.zoomAction(this.toZoomScale(this.getSliderValue() + CLICK_STEP));
  }

  getSliderValue() {
    const toSliderValue = this.getSliderScale(this.props);
    return toSliderValue(this.props.scale);
  }

  toZoomScale(sliderValue) {
    const toSliderValue = this.getSliderScale(this.props);
    return toSliderValue.invert(sliderValue);
  }

  render() {
    const value = this.getSliderValue();
    return (
      <div className="zoom-control">
        <a className="zoom-in" onClick={this.handleZoomIn}><span className="fa fa-plus" /></a>
        <Slider value={value} max={1} step={SLIDER_STEP} vertical onChange={this.handleChange} />
        <a className="zoom-out" onClick={this.handleZoomOut}><span className="fa fa-minus" /></a>
      </div>
    );
  }
}

export default ZoomControl;