import * as actionTypes from '../actions/actionTypes';
import NoteService from '../service/NoteService';
import LabelService from '../service/LabelService';

export const getOtherNotesSuccess = (other) => {
    return {
        type: actionTypes.OTHER_NOTES,
        other: other
    }
}

export const getPinnedNotesSuccess = (pinned) => {
    return {
        type: actionTypes.PINNED_NOTES,
        pinned: pinned
    }
}

export const getReminderNotesSuccess = (reminder) => {
    return {
        type: actionTypes.REMINDER_NOTES,
        reminder: reminder
    }
}
export const getLabeledNotesSuccess = (labeled) => {
    return {
        type: actionTypes.LABELED_NOTES,
        labeled: labeled
    }
}
export const getTrashNotesSuccess = (trash) => {
    return {
        type: actionTypes.TRASH_NOTES,
        trash: trash
    }
}

export const getArchiveNotesSuccess = (archive) => {
    return {
        type: actionTypes.PINNED_NOTES,
        archive: archive
    }
}

export const getOtherNotes = () => {
    return dispatch => {
        NoteService.getAllNoteService()
            .then(response => {
                dispatch(getOtherNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}

export const getPinnedNotes = () => {
    return dispatch => {
        NoteService.getAllPinnedNoteService()
            .then(response => {
                dispatch(getPinnedNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}

export const getReminderNotes = () => {
    return dispatch => {
        NoteService.getRemainderNotesService()
            .then(response => {
                dispatch(getReminderNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}

export const getLabeledNotes = (state) => {
    return dispatch => {
        LabelService.getNotesOfLableService(state)
            .then(response => {
                dispatch(getLabeledNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}

export const getTrashNotes = () => {
    return dispatch => {
        NoteService.getTrashNoteService()
            .then(response => {
                dispatch(getTrashNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}

export const getArchiveNotes = () => {
    return dispatch => {
        NoteService.getArchivedNoteService()
            .then(response => {
                dispatch(getArchiveNotesSuccess(response.data.obj))
            })
            .catch(
                error => {
                    console.log(error)
                })
    }
}