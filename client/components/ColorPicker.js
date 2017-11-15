import React, { Component } from 'react'


class ColorPicker extends Component {
    constructor(props){
	super(props)
	this.state = {
	    editing: false,
	    color: 'red'
	}
    }

    render() {
	const colors = ["#d77c40","#7890cb", "#EB5A46","#61BD4F","#C377E0", "#67778e",
			"#C477E0", "#67772e"]
	const colorCircles = colors.map((c)=> {
	    return (
		<div key={c}
		     className="color-swatch"
		     style={{background:c}}
		     onClick={()=> this.setState({ editing: false, color: c })}>
		</div>
	    )
	})
	
	return (
	    <div className="color-picker">
		{ this.state.editing ?
		  <div className="color-grid">
		      { colorCircles }
		  </div> :
		  <div className="open-picker"
		       style={{background:this.state.color}}
		       onClick={()=> this.setState({ editing: true })}>
		      <i className="fa fa-paint-brush"/>
		  </div>
		}
	    </div>
	);
    }
}

export default ColorPicker



    
