import types from './types'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'



export default{
	employeeUpdate: ({prop, value}) => {
		return{
			type: types.EMPLOYEE_UPDATE,
			payload: { prop, value }
		}
	},
	employeeCreate: ({name, phone, shift}) =>{
		const { currentUser } = firebase.auth()

		return(dispatch) =>{
			firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({name, phone, shift})
			.then(() => {
				dispatch({type:types.EMPLOYEE_CREATE})
				Actions.employeeList({type:'reset'})
			})
		}
	},
	employeesFetch: () => {
		const { currentUser } = firebase.auth()
		return (dispatch) => {
			firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({type: types.EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()})
			})
		}
	}
}
