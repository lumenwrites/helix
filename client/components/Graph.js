import moment from 'moment'

import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* Vendor compoennts */
/* import Calendar from 'react-github-contribution-calendar';*/
import CalendarHeatmap from 'react-calendar-heatmap'

class Graph extends Component {
    render() {
	var { habit } = this.props
	var values = habit.checkmarks.map((c)=>{
	    return {
		date:c.date,
		count: c.value
	    }
	})
	return (
	    <div>
		<CalendarHeatmap
		    endDate={moment().subtract(1,'days')}
		    startDate={moment().subtract(1,'years')}
		    showOutOfRangeDays={false}
		    values={values}
		    titleForValue={(value)=> {
			    {/* console.log("Value " + value) */}
			    if (value) {
				return value.date
			    }
		    }}
		    tooltipDataAtts={{'data-toggle': 'tooltip'}}
		    classForValue={(value) => {
			    if (value == null || value.count == null ) {
				return 'color-empty'

			    }
			    return `color-scale-${value.count}`
		    }}		
		/>		    
	    </div>
	);
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	profile: state.profile
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, profilesActions)(Graph);
