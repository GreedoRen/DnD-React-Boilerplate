import React, { Component } from 'react';
import Source from './Source';
import Target from './Target';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { render } from 'react-dom';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      components: []
    }
    this.onDrop = this.onDrop.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }
  
  onDrop(component){
    const { components } = this.state;
    console.log(component)
    const newComponentsList = _.concat([],components, component)
    this.setState({
      components: newComponentsList
    })
  }

  moveCard(oldIndex, newIndex){
    const components = _.concat([],this.state.components)
    _.remove(components, function(n,index) {
      if(index === oldIndex){
        return true
      }
      return false
    });
    const componentToMove = this.state.components[oldIndex];
    if(oldIndex < newIndex){
      // 2 to 4
      const modifiedNewIndex = newIndex;
      components.splice(modifiedNewIndex,0,componentToMove)
    }else if(oldIndex > newIndex){
      // 4 to 2
      components.splice(newIndex,0,componentToMove)
    }else if(oldIndex === newIndex){
      return;
    }
    this.setState({
      components: components
    })
  }

  render() {
    const { components } = this.state;
    console.log('state components ', components)
    return (
      <div className="App">
        <Source/>
        <Target onDrop={this.onDrop} components={components} moveCard={this.moveCard}/>
      </div>
    );
  }
}

const WrapperApp = DragDropContext(HTML5Backend)(App);
render(<WrapperApp/>, document.getElementById('root'));