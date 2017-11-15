import React, { Component } from 'react'


class ColorPicker extends Component {
    constructor(props){
	super(props)
	this.state = {
	    openPicker: false,
	    selectedColor: this.props.defaultColor
	}
    }

    render() {
	const colors = ["#d77c40","#7890cb", "#EB5A46",
			"#61BD4F","#C377E0", "#67778e",
			"#C477E0", "#67772e","#27772e"]

	/* Render color options */
	const colorCircles = colors.map((c)=> {
	    return (
		<div key={c}
		     className="color-swatch"
		     style={{background:c}}
		     onClick={()=> {
		             this.setState({ openPicker: false, selectedColor: c })
			     /* I'm passing a function setColor to this component,
				which will be able to use the color I've picked.*/
			     this.props.setColor(c)
		     }}>
		</div>
	    )
	})
	
	return (
	    <div className="color-picker">
		{ this.state.openPicker ?
		  <div className="my-modal color-grid">
		      <div className="my-modal-body">		      
			  { colorCircles }
			  <div className="clearfix"/>		      
		      </div>
		  </div>:
		  <div className="open-picker"
		       style={{background:this.state.selectedColor}}
		       onClick={()=> this.setState({ openPicker: true })}>
		      <i className="fa fa-paint-brush"/>
		  </div>
		}
		{/* <input type="text"
		    ref="selectedColor"
		    value={this.state.color} />*/}
	    </div>
	)
    }
}

export default ColorPicker



    
