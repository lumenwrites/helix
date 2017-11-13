import React from 'react'
import { Route } from 'react-router-dom'

/* My components */
import Home from './components/Home'

export default () => {
    return (
	<div>
	    <Route exact path="/" component={Home} />
	    <Route exact path="/hi" component={()=> <div>Heythere!</div>} />
	</div>
    )
}
