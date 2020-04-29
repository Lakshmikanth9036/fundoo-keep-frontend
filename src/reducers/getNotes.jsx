import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notes: [],
    pinned: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OTHER_NOTES:
            return {
                ...state,
                notes: action.other
            }
        case actionTypes.PINNED_NOTES:
            return {
                ...state,
                pinned: action.pinned
            }
        case actionTypes.REMINDER_NOTES:
            return {
                ...state,
                notes: action.reminder
            }
        case actionTypes.LABELED_NOTES:
            return {
                ...state,
                notes: action.labeled
            }
        case actionTypes.TRASH_NOTES:
            return {
                ...state,
                notes: action.trash
            }
        case actionTypes.ARCHIVE_NOTES:
            return {
                ...state,
                notes: action.archive
            }
        default: return state;
    }
}

export default reducer;