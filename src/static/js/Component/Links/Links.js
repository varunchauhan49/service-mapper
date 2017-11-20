import React, { Component } from 'react';
import Link from './Link.js';

class Links extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      links: ""
    };
  }

  componentDidMount () {
    this.setState({links:this.props.graphLinks})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.graphLinks !== this.props.graphLinks) {  
      this.setState({links:nextProps.graphLinks});
    }
  }
  
  handleClick = (link) => {
      console.log(link);
  }
  
  isLink(link,nodeName){
    return (link.source.data.id === nodeName || link.target.data.id === nodeName);
  }
  
  drawLinks = () => {
    var self = this;
    var links = this.state.links.map(function (link, index) {
      if(self.props.nodeHighlighted === link.source.data.id){
        return(
          <Link
            opacity={(self.props.nodeSelected === "")?1:self.isLink(link,self.props.nodeSelected)?1:0.15}
            selected={(self.props.nodeSelected === "")?false:self.isLink(link,self.props.nodeSelected)?true:false}
            datum={link}
            key={index}
            source={true}
            target={false}
            onClick={self.handleClick.bind(this,link)} />
        )
      }
      else if(self.props.nodeHighlighted === link.target.data.id){
        return (
          <Link opacity={(self.props.nodeSelected === "")?1:self.isLink(link,self.props.nodeSelected)?1:0.15}
            selected={(self.props.nodeSelected === "")?false:self.isLink(link,self.props.nodeSelected)?true:false}
            datum={link}
            key={index}
            source={false}
            target={true}
            onClick={self.handleClick.bind(this,link)} />
        )
      }
      else{
        return (
          <Link 
            opacity={(self.props.nodeSelected === "")?1:self.isLink(link,self.props.nodeSelected)?1:0.15}
            selected={(self.props.nodeSelected === "")?false:self.isLink(link,self.props.nodeSelected)?true:false}
            datum={link}
            key={index}
            source={false}
            target={false}
            onClick={self.handleClick.bind(this,link)} />
        )
      }
    })
    return (<g className="links"> 
      {links}
    </g>)
  }
  
  render() {
    return (
      <g>
        {(this.state.links)?this.drawLinks():false}
      </g>
    );
  }
}

export default Links;