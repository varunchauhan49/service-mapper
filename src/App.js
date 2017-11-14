import React, { Component } from 'react';
import Mapper from './static/jsx/Component/DependencyMapper/Mapper.jsx';
import './static/css/graph.css';
import './static/css/zoom.css';
import './static/css/App.css';
import exampleJson from './static/json/example.json';


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  handleNodeClick(node){
    console.log('Node Selected',node)
  }

  handleDetailsClose(){
    console.log('Node Unselected');
  }
  render() {
    return (
      <div className="dependencyGraph">
        <Mapper data={exampleJson}
          handleNodeDetailsClose={this.handleDetailsClose}
          nodeClicked={this.handleNodeClick}
          exitHighlight={false}
          update={false}
          mapData={exampleJson} />
      </div>
    );
  }
}

export default App;
