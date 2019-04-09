import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import domtoimage from 'dom-to-image';
import data from './data.json';
import './source.css';

const components = Object.keys(data);
class Source extends React.Component {
  render() {
    return (
      <div className="source">
        <ul>
          {
            components.map(component => {
              return <ListItem key={component} component={component} />
            })
          }
        </ul>
      </div>
    )
  }
}

const spec = {
  beginDrag(props, monitor, component) {
    // { component: 'input' }
    const item = { ...props };
    console.log('beginDrag', item)
    return item;
  },

};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


const ListItem = DragSource("form-elements", spec, collect)(props => {
  const { connectDragSource, component, isDragging } = props;
  return connectDragSource(<li>{component}</li>)
});



export default Source