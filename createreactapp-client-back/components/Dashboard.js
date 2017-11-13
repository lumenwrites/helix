import React, { Component } from 'react'

export default function Dashboard () {
    return (
	<div>
	    <p>[Dashboard]</p>
	    <button onClick={()=> console.log("Hi there!") }>Press me!</button>
	</div>
    )
}
