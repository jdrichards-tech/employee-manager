import React, { Component } from 'react'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import actions from '../actions/authActions'

class LoginForm extends Component{
	onEmailChange(text){
		this.props.emailChanged(text)
	}

	onPasswordChange(text){
		this.props.passwordChanged(text)
	}

	onButtonPress(){
		const{email, password} = this.props
		this.props.loginUser({email, password})
	}

	renderButton(){
		if(this.props.loading){
			return <Spinner size="large" />
		}
		return(
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		)
	}

	render(){
		return(
			<Card>
				<CardSection>
					<Input
						label='Email'
						placeholder='email@gmail.com'
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						label='Password'
						placeholder='password'
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>
				<Text style={styles.errorTextStyle}>
				{this.props.error}
				</Text>
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		)
	}
}

const styles = {
	errorTextStyle:{
		fontSize: 20,
		alignSelf: 'center',
		color:'red'
	}

}

const stateToProps = ({auth}) => {
	const { email, password, error, loading } = auth

	return{
		email,
		password,
		error,
		loading
	}
}

const dispatchToProps = (dispatch) => {
	return{
		emailChanged: (text) => dispatch(actions.emailChanged(text)),
		passwordChanged: (text) => dispatch(actions.passwordChanged(text)),
		loginUser: ({email, password}) => dispatch(actions.loginUser({email, password}))
	}
}

export default connect (stateToProps, dispatchToProps)(LoginForm)
