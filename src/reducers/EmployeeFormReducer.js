import types from '../actions/types'

const INITIAL_STATE = {
	name:'',
	phone:'',
	shift:''
}

export default (state=INITIAL_STATE, action) => {
	switch(action.type){
		case types.EMPLOYEE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value}
		case types.EMPLOYEE_CREATE:
			return INITIAL_STATE
		case types.EMPLOYEES_FETCH_SUCCESS:

		default:
			return state
	}
}
