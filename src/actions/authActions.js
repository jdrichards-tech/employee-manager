// import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from './types'
import types from './types'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export default{
	emailChanged: (text)=>{
		return{
			type:types.EMAIL_CHANGED,
			payload:text
		}
	},

	passwordChanged: (text)=>{
		return{
			type: types.PASSWORD_CHANGED,
			payload: text
		}
	},

	loginUser:({email, password})=>{
		return (dispatch) => {
			dispatch({type: types.LOGIN_USER })

			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => loginUserSuccess(dispatch, user))
				.catch(() => loginUserFail(dispatch))
			})
		}
	}
}

	const loginUserFail = (dispatch)=>{
		dispatch({ type:types.LOGIN_USER_FAIL })
	}

	const loginUserSuccess = (dispatch, user) => {
		dispatch({
			type: types.LOGIN_USER_SUCCESS,
			payload: user
		})
		Actions.main()
	}
