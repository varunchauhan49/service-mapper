import React from 'react';
import { Motion, spring } from 'react-motion';

const NODES_SPRING_ANIMATION_CONFIG = { stiffness: 80, damping: 20, precision: 0.1 };
const highlight_css = {
  "stroke":"#6e6e9c", 
  "strokeWidth": "1.5",
  "fill":"none"
}
const highlight_none = {
  "stroke":"#999", 
  "strokeOpacity":"0.6",
  "strokeWidth": "1px",
  "fill":"none"
}


class Link extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      highlight: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.opacity !== this.props.opacity)
        return true;
    if(nextProps.selected !== this.props.selected)
        return true;
    if(nextProps.source !== this.props.source)
        return true;
    if(nextProps.target !== this.props.target)
        return true;
    if(nextProps.datum.source.x !== this.props.datum.source.x)
        return true;
    if(nextProps.datum.source.y !== this.props.datum.source.y)
        return true;
    if(nextProps.datum.target.x !== this.props.datum.target.x)
        return true;
    if(nextProps.datum.target.y !== this.props.datum.target.y)
        return true;
    return false
  }

  controPoints(p,Ax,Ay,Bx,By,M) {

    var Jx = Ax + (Bx - Ax) * p
    var Jy = Ay + (By - Ay) * p

    // We need a and b to find theta, and we need to know the sign of 
    // each to make sure that the orientation is correct.
    var a = Bx - Ax
    var asign = (a < 0 ? -1 : 1)
    var b = By - Ay
    var theta = Math.atan(b / a)

    // Find the point that's perpendicular to J on side
    var costheta = asign * Math.cos(theta)
    var sintheta = asign * Math.sin(theta)

    // Find c and d
    var c = M * sintheta
    var d = M * costheta

    // Use c and d to find Kx and Ky
    var Kx = Jx - c
    var Ky = Jy + d
    return {"x":Kx,"y":Ky}

  }

  drawCurve(Ax, Ay, Bx, By, M) {
    // side is either 1 or -1 depending on which side you want the curve to be on.
    // Find midpoint J

    var point1 = this.controPoints(0.25, Ax, Ay, Bx, By, M);
    var point2 = this.controPoints(0.5, Ax, Ay, Bx, By, M);
    var point3 = this.controPoints(0.75, Ax, Ay, Bx, By, M);

    return "M" + Ax + "," + Ay +
        "S" + point1.x + "," + point1.y +
        " " + point2.x + "," + point2.y +
        "S" + point3.x + "," + point3.y +
        " " + Bx + "," + By
  }

  drawLink= ({ sx, sy, tx, ty, opacity }) => {
    // if(this.props.datum.source.id==="sellerpayments"){
    //   console.log("called link",opacity,sx,sy,tx,ty);
    // }
      return(
        <g className="link" onMouseOver={this.handleMouseOver} opacity={opacity} onMouseOut={this.handleOut}>
        {(this.props.datum.source.x)?
        <path
        d={this.drawCurve(
          sx,
          sy,
          tx,
          ty, 20)}
        markerMid={(this.props.source || this.props.target)?"url(#end-arrow)":false}
        onClick={this.props.onClick}
        style={(this.props.source)?
        highlight_css:(this.props.target)?highlight_css:highlight_none}
        />:false}
       </g>
      )
  }

  handleMouseOver = () =>{
    this.setState({highlight:true});
  }
  
  handleOut = () =>{
    this.setState({highlight:false});
  }

  render () {
    return (
      <g>
      {(this.props.datum.source.x && 
      !(this.props.datum.source.x === this.props.datum.target.x 
        && 
        this.props.datum.source.y === this.props.datum.target.y)
        )?
        <Motion
        style={{
          sx: spring(this.props.datum.source.x, NODES_SPRING_ANIMATION_CONFIG),
          sy: spring(this.props.datum.source.y, NODES_SPRING_ANIMATION_CONFIG),
          tx: spring(this.props.datum.target.x, NODES_SPRING_ANIMATION_CONFIG),
          ty: spring(this.props.datum.target.y, NODES_SPRING_ANIMATION_CONFIG),
          opacity: spring(this.props.opacity, NODES_SPRING_ANIMATION_CONFIG),
        }}>
          {interpolated =>this.drawLink(interpolated)}
      </Motion>:false
      }
      </g>
    )
  }
}

export default Link;