import moment from 'moment'

import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Utils */
import { generateCurrentWeek, generateRecentDays, syncScroll } from '../utils/habits.utils'

function calculatePerfectDay(date, habits){
    /* Check if all habits are complete  */
    const allHabitsValues = habits.habitList.map((habit)=>{
	var value = -1
	habit.checkmarks.map((checkmark)=>{
	    if (checkmark.date == date) {
		value = checkmark.value
	    }
	})
	return value
    })
    /* Check if all habits completed */
    /* const perfectDay = allHabitsValues.every((value) => value >= 1)*/
    /* return the smallest checkbox value */
    return  Math.min(...allHabitsValues)    
}

class Calendar extends Component {
    render() {    
	/* var days = generateCurrentWeek()*/
	var days = generateRecentDays() 
	const calendar = days.map((day, i)=>{
	    const minValue = calculatePerfectDay(day.date, this.props.habits)
	    const dayMark = ["","basic","perfect"][minValue]
	    return (
		<div className={"day " + dayMark} key={day.date}>
		    <div className="name">{ day.name }</div>
  		    <div className="date">{ day.date.slice(-2) }</div>
		    { /* day.date == moment().format("YYYY-MM-DD") ? <div className="today"></div> : null */ }
		</div>
	    )
	})

	return (
	    <div className="calendar" onScroll={syncScroll}>
		<div className="dates">	    
		    <a className="prev-week">
			<i className="fa fa-chevron-left"></i>
		    </a>
		    { calendar }
		    <a className="next-week">
			<i className="fa fa-chevron-right"></i>
		    </a>	    
		    <div className="clearfix"/>
		</div>
	    </div>

	)
    }
}


/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	habits: state.habits
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, null)(Calendar);

