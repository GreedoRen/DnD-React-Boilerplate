import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import './item.css';

class Item extends Component{
  constructor(){
    super();
    this.state = {
      onHover: false
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOver && this.props.isOver) {
      // You can use this as enter handler
      this.setState({
        onHover: true
      })
    }

    if (prevProps.isOver && !this.props.isOver) {
      // You can use this as leave handler
      this.setState({
        onHover: false
      })
    }
  }

  render(){
    const { html, title, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
    
    return(
      
      connectDropTarget(
        <div className={`item ${ this.state.onHover ? 'onHover' : '' }`}>
			    {connectDragSource(<span className="holder"></span>)}
          {connectDragPreview(<div>
            <div className="itemtitle">{title}</div>
            <div className="itemhtml">{html}</div>
          </div>)}
        </div>
		  )
    )
  }
}

export default DropTarget(
  'ITEM', 
  {
    drop(props, monitor, component){
        const item = monitor.getItem()
        console.log(monitor.getDropResult());
        const newIndex = props.index;
        const oldIndex = item.index;
        props.moveCard(oldIndex, newIndex)
        return item;
    },
    
  },
  (connect, monitor)=>{
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }
  )(
    DragSource(
      'ITEM',
      {
        beginDrag(props, monitor, collect){
          const item = {
            ...props
          }
          return item;
        }
      },
      (connect, monitor) => {
        return {
          connectDragSource: connect.dragSource(),
          connectDragPreview: connect.dragPreview(),
          isDragging: monitor.isDragging(),
        };
      }
    )(Item)
  )