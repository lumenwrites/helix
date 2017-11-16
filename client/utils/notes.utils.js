import moment from 'moment'


export function loadNotes(savedNotes, days) {
    /* Generate empty calendar for the current week */
    const timeline = days.map((day, i)=>{
	/* Loop through saved notes,
	   if I find a saved value for today,
	   I load it into the calendar */
	savedNotes.map((n)=>{
	    if (n.date === day.date) {
		day.note = n.note
	    } 
	})
	return day
    })
    return timeline
}


export function insertCheckmark(){
    const textarea = document.getElementsByClassName('textarea')[0]
    /* Find cursor position line's nu */
    const lineNumber = textarea.value.substr(0,textarea.selectionStart)
			       .split("\n").length
    const textBefore = textarea.value.split("\n").slice(0, lineNumber)
    var textAfter = textarea.value.split("\n").slice(lineNumber)
    var thisLine = textBefore[textBefore.length - 1]
    if (thisLine.indexOf("- [ ]") > -1){
	/* If there's a checkmark already - check it. */
	thisLine = thisLine.replace("- [ ]", "- [X]")
    } else if (thisLine.indexOf("- [X]") > -1){
	/* Or uncheck it */
	thisLine = thisLine.replace("- [X]", "- [ ]")
    }else {
	/* Add checkmark to the beginning of this line */
	thisLine = "- [ ] " + thisLine
    }
    textBefore[textBefore.length - 1] = thisLine

    var updatedText = textBefore.concat(textAfter).join("\n")
    textarea.value = updatedText

}

export function insertTime(){
    const textarea = document.getElementsByClassName('textarea')[0]
    /* Find cursor position line's nu */
    const lineNumber = textarea.value.substr(0,textarea.selectionStart)
			       .split("\n").length
    const textBefore = textarea.value.split("\n").slice(0, lineNumber)
    var textAfter = textarea.value.split("\n").slice(lineNumber)
    var thisLine = textBefore[textBefore.length - 1] + " " + moment().format('h:mm')
    textBefore[textBefore.length - 1] = thisLine
    var updatedText = textBefore.concat(textAfter).join("\n")
    textarea.value = updatedText
}
