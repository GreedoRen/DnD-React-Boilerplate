import React, { Component } from 'react';
import {DropTarget} from 'react-dnd';
import Item from './Item';
import data from './data.json';
import './target.css';

class Target extends Component{
    render(){
        const { connectDropTarget, components } = this.props;
        return(
            connectDropTarget(
            <div className="target">
                {
                    components.map((d, key)=>{
                        const html = data[d.component];
                        return <Item {...this.props} key={key} index={key} title={d.component} html={html}/>
                    })
                }
            </div>
            )
        )
    }
}

const spec = {
    drop(props, monitor, component){
        const item = monitor.getItem()
        console.log(monitor.getDropResult());
        props.onDrop(item)
        return item;
    }
}
const collect = (connect, monitor)=>{
  return {
      connectDropTarget: connect.dropTarget()
  };
}


export default DropTarget('form-elements', spec, collect)(Target);