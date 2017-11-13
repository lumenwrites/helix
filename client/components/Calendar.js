import moment from 'moment'

import React, { Component } from 'react'

/* Utils */
import { generateCurrentWeek } from '../utils/habits.utils'

const Calendar = (props) => {
    var days = generateCurrentWeek()
    const calendar = days.map((day, i)=>{
	return (
	    <div className="day" key={day.date}>
		<div className="name">{ day.name }</div>
  		<div className="date">{ day.date.slice(-2) }</div>
		{ day.date == moment().format("YYYY-MM-DD") ? <div className="today"></div> : null }
	    </div>
	)
    })

    return (
	<div className="calendar">
	    <a className="prev-week">
		<i className="fa fa-chevron-left"></i>
	    </a>
	    { calendar }
	    <a className="next-week">
		<i className="fa fa-chevron-right"></i>
	    </a>	    
	    <div className="clearfix"/>
	</div>
    )
}

export default Calendar
