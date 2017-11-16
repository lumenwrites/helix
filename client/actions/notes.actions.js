import axios from 'axios'

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

export function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'))
    console.log("Load notes from browser")

    return {
	type: 'LOAD_NOTES',
	payload: notes
    }
}

export function saveNotes(notes) {
    var data = notes
    data.lastUpdated = new Date()

    return async function(dispatch) {
	const res = await axios.post('/api/v1/notes', data)
	const notes = res.data
	console.log('[notes.actions] Saved notes to server' + JSON.stringify(notes))

	dispatch({
	    type: 'SAVE_NOTES',
	    payload: notes
	})
    }
}

export function saveNotesBrowser(notes) {
    notes.lastUpdated = new Date()
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log("Save notes " + JSON.stringify(notes))
    console.log("[notes.actions]  Saved notes to local storage")
    return {
	type: 'SAVE_NOTES',
	payload: {}
    }
}
