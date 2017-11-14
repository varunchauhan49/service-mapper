import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from "d3";
import Links from '../Links/Links.jsx';
import Nodes from '../Nodes/Nodes.jsx';
import ZoomableCanvas from '../Zoom/ZoomableCanvas.jsx';
import * as Loader from 'halogen';

var worker = new Worker('./../worker');

const EdgeMarkerDefinition = ({ selectedNodeId }) => {
  return (
    <defs>
      <marker
        className="edge-marker"
        id="end-arrow"
        viewBox="0 -5 10 10"
        refX="5"
        refY="0"
        markerWidth={8}
        markerHeight={8}
        orient="auto">
        <path style={{fill:"grey"}} d="M0,-5L10,0L0,5" />
      </marker>
    </defs>
  );
};

class Mapper extends Component {
  constructor(props, context) {
    super(props, context);
    var svgWidth = d3.select("#svgDiv").style("position", "relative").style('width').split("px")[0];
    var svgHeight = d3.select("#svgDiv").style("position", "relative")._parents[0].clientHeight;
    this.scale = 1;
    // this.onNodeClicked = this.handleNodeClick.bind(this);
    
    this.state = {
      svgWidth: svgWidth,
      svgHeight: svgHeight,
      nodes: null,
      links: null,
      graphData: this.props.mapData,
      mapping:[],
      nodeHighlight: "",
      nodeSelected: "",
      adjMatrix:[],
      selectedNodes:'',
      animate:false,
      exitHighlight:false,
      transform:"",
      loading:false,
      metric:"",
      scale:1,
      sla:""
    };
  }

  componentDidMount = () =>{
    this.setState({loading:true});
    if(this.state.graphData){
      this.forceLayout(this.state.graphData);
    }
  }

  forceLayout = (data) =>{
    var self = this;
    var linkedByIndex = [];
    var adj = [];
    var nodesID = [];

    data.nodes.map(function(d,index){
        adj[d.data.id] = [];
        nodesID[index] = d.data.id;
    });
    data.links.forEach(function(d) {
        let source = nodesID[d.source];
        let target = nodesID[d.target];
        linkedByIndex[source + "," + target] = true;
        adj[source].push(target);
        adj[target].push(source);
    });
    worker.postMessage({
      nodes: data.nodes,
      links: data.links,
      width: self.state.svgWidth,
      height: self.state.svgHeight
    });
    worker.onmessage = function(event) {
      if(event.data.type === "end"){
        self.setState({graphData:event.data,
          selectedNodes:event.data,
          nodeSelected:"",
          nodeHighlight:"",
          mapping:linkedByIndex,
          adjMatrix:adj,
          loading:false
        });
      }
      if(self.props.searchKey !== ""){
        self.state.graphData.nodes.forEach(function(item){
          if(item.data.id === self.props.searchKey){
            // self.handleNodeClick(item);
          }
        });
      }
    };
  } 

  componentWillReceiveProps (nextProps) {
    if (nextProps.update !== this.props.update && nextProps.mapData) {
      this.setState({loading:true});
      this.forceLayout(nextProps.mapData);
    }
    if (nextProps.exitHighlight !== this.props.exitHighlight) {
      this.setState({nodeSelected:"",
        graphData:this.state.selectedNodes,
        exitHighlight:!this.state.exitHighlight});
    }
  }

  handleClick = (event) =>{
    console.log(event);
  }

  handleNodeHover = (index) =>{
    this.setState({nodeHighlight:index})
  }

  getCircularNodes = (node) => {
    var self = this;
    var circularNodes = []
    
    var transformX = (this.state.transform)?this.state.transform.x:0;
    var transformY = (this.state.transform)?this.state.transform.y:0;
    var transformK = (this.state.transform)?this.state.transform.k:1;

    var centerX = (parseInt(self.state.svgWidth) - 456 * transformK)/2;
    var centerY = (parseInt(self.state.svgHeight) + 50 * transformK)/2;

    centerX = (- transformX + centerX)/transformK;
    centerY = (- transformY + centerY)/transformK;

    var nodeId = node.data.id;
    var idlist = this.state.adjMatrix[nodeId];
    var innerCount;
    var centerCount;
    var lastCount;

    var circularRadiusLast = 300 / this.scale;
    var circularRadiusCenter = 200 / this.scale;
    var circularRadiusInner = 100 / this.scale;
    
    var circularOffsetAngle = Math.PI / 4;

    var circularInnerAngle;
    var circularCenterAngle;
    var circularLastAngle;

    idlist.map(function(item,i){
      circularNodes[item]= {"loc":i + 1};
    });
    
    var countNodes = Object.keys(circularNodes).length;

    if(countNodes<15){
      circularInnerAngle = (2 * Math.PI) / countNodes;
      innerCount = countNodes;
    }
    else if(countNodes<40){
      innerCount = Math.round(countNodes * 0.3);
      centerCount = Math.round(countNodes * 0.7);
      circularInnerAngle = (2 * Math.PI) / innerCount;
      circularCenterAngle = (2 * Math.PI) / centerCount;
    }
    else{
      innerCount = Math.round(countNodes * .2);
      centerCount = Math.round(countNodes * .35);
      lastCount = Math.round(countNodes * .45);
      circularInnerAngle = (2 * Math.PI) / (innerCount);
      circularCenterAngle = (2 * Math.PI) / (centerCount);
      circularLastAngle = (2 * Math.PI) / (lastCount);
    }

    var count = 0;
    var data = _.cloneDeep(this.state.selectedNodes);
    let loc1=0, loc2=0,loc3=0;
    data.nodes.map(function(item,i){
      let loc, angle, node;
      if(circularNodes[item.data.id]){
        if(count < innerCount){
          loc = circularNodes[item.data.id].loc + 1;
          angle = circularOffsetAngle + (loc1 * circularInnerAngle);
          node = _.cloneDeep(item);
          node.x = centerX + (circularRadiusInner * Math.sin(angle));
          node.y = centerY + (circularRadiusInner * Math.cos(angle));
          circularNodes[item.data.id] = node;
          count ++;
          loc1 = loc1 + 1;
        }
        else if(count < (innerCount+ centerCount)){
          loc = circularNodes[item.data.id].loc;
          angle = circularOffsetAngle + (loc2 * circularCenterAngle);
          node = _.cloneDeep(item);
          node.x = centerX + (circularRadiusCenter * Math.sin(angle));
          node.y = centerY + (circularRadiusCenter * Math.cos(angle));
          circularNodes[item.data.id] = node;
          count ++;
          loc2 = loc2 + 1;
        }
        else{
          loc = circularNodes[item.data.id].loc;
          angle = circularOffsetAngle + (loc3 * circularLastAngle);
          node = _.cloneDeep(item);
          node.x = centerX + (circularRadiusLast * Math.sin(angle));
          node.y = centerY + (circularRadiusLast * Math.cos(angle));
          circularNodes[item.data.id] = node;
          count ++;
          loc3 = loc3 + 1;
        }
      }
    });
    return(circularNodes);
  }

  handleNodeClick = (node) =>{
    this.props.nodeClicked(node);
    var self = this;
    var circularNodes = [];
    circularNodes = this.getCircularNodes(node);
    
    var transformX = (this.state.transform)?this.state.transform.x:0;
    var transformY = (this.state.transform)?this.state.transform.y:0;
    var transformK = (this.state.transform)?this.state.transform.k:1;

    var centerX = (parseInt(self.state.svgWidth) - 456 * transformK)/2;
    var centerY = (parseInt(self.state.svgHeight) + 50 * transformK)/2;

    centerX = (- transformX + centerX)/transformK;
    centerY = (- transformY + centerY)/transformK;
    
    if(this.state.nodeSelected === node.data.id){
      this.props.handleNodeDetailsClose();
      this.setState({graphData:this.state.selectedNodes,
        scale:1,
        nodeSelected:""});
      return;
    }
    var data = _.cloneDeep(this.state.selectedNodes);
    // var nodes = this.state.graphData.nodes;
    data.nodes.map(function(item,i){
      if(node.data.id === item.data.id){
        item.x = centerX;
        item.y = centerY;
      }
      else if(circularNodes[item.data.id]){
        item.x = circularNodes[item.data.id].x;
        item.y = circularNodes[item.data.id].y;
      }
      else{

      }
    });
    var scale = (this.state.transform.x)? 1 / this.state.transform.k:1;
    this.setState({graphData:data,
      nodeSelected:node.data.id,
      scale:scale,
      animate:true});
  }

  handleTransform = (Newtransform) =>{
    this.scale = Newtransform.k;
    this.setState({transform:Newtransform});
  }
  
  render() {
    var color = '#4DAF7C';
    var style = {
      display: '-webkit-flex',
      display: 'flex',
      WebkitFlex: '0 1 auto',
      flex: '0 1 auto',
      WebkitFlexDirection: 'column',
      flexDirection: 'column',
      WebkitFlexGrow: 1,
      flexGrow: 1,
      WebkitFlexShrink: 0,
      flexShrink: 0,
      WebkitFlexBasis: '25%',
      flexBasis: '25%',
      maxWidth: '100%',
      height: '100vh',
      WebkitAlignItems: 'center',
      alignItems: 'center',
      WebkitJustifyContent: 'center',
      justifyContent: 'center'
    };
    var loaderStyle={
      boxSizing: 'border-box',
      display: '-webkit-flex',
      display: 'flex',
      WebkitFlex: '0 1 auto',
      flex: '0 1 auto',
      WebkitFlexDirection: 'row',
      flexDirection: 'row',
      WebkitFlexWrap: 'wrap',
      flexWrap: 'wrap'
    };
    return (
      <div>
        {
          (this.state.loading)?
            <div style={loaderStyle}>
              <div style={style}><Loader.ScaleLoader color={color}/>
              </div>
            </div>:false
        }
        {
        (this.state.graphData &&!this.state.loading)?
          <ZoomableCanvas
            transformFunction={this.handleTransform}
            width={this.state.svgWidth}
            height={this.state.svgHeight}
            update={this.state.loading}
            nodes={this.state.graphData.nodes} >
            <EdgeMarkerDefinition />
            <Links nodeHighlighted={this.state.nodeHighlight}
            nodeSelected={this.state.nodeSelected}
            graphLinks={this.state.graphData.links} />
            <Nodes 
              scale={this.state.scale}
              onNodeClicked={this.handleNodeClick.bind(this)}
              nodeSelected={this.state.nodeSelected}
              exitHighlight={this.state.exitHighlight}
              hoverLinks={this.handleNodeHover}
              mapping={this.state.mapping}
              adjMapping={this.state.adjMatrix}
              graphNodes={this.state.graphData.nodes}
              animate={this.state.animate} />
          </ZoomableCanvas>
        :false
        }
      </div>
    );
  }
}

export default Mapper