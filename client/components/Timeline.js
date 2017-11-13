import React, { Component } from 'react'

/* Components */
import Checkmark from './Checkmark'

/* Utils */
import { loadCheckmarks, syncScroll } from '../utils/habits.utils'

/* Timeline component  */
const Timeline = (props) => {
    const { habit } = props
    if (!habit) { return null }

    /* Load habit's saved checkmarks, generate this week's calendar */
    const days = loadCheckmarks(habit.checkmarks)
    const checkmarks = days.map((day)=> {
	const checkmark = {
	    date: day.date,
	    value: day.value,
	    habit: habit.title
	}
	return (
	    <Checkmark key={checkmark.date} checkmark={checkmark} />
	)
    })

    return (
	<div className="timeline" onScroll={syncScroll}>
	    <div className="checkmarks">	    
		{ checkmarks }
	    </div>
	    <div className="clearfix" />
	</div>
    )
}

export default Timeline
