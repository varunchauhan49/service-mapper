import React, { Component } from 'react';
import Mapper from './Mapper.js';
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
      <div>
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
