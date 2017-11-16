export function updateNote(note) {
    return {
	type: 'UPDATE_NOTE',
	payload: note
    }
}

export function activateNote(date) {
    return {
	type: 'ACTIVATE_NOTE',
	payload: date
    }
}

export function saveNotes(notes) {
    console.log("Save notes " + JSON.stringify(notes))
    return {
	type: 'SAVE_NOTES',
	payload: {}
    }
}
