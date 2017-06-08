import React, { Component } from 'react'
import { Card, CardSection, Button } from './common'
import EmployeeForm from './EmployeeForm'
import { connect } from 'react-redux'
import actions from '../actions/employeeActions'
import Communications from 'react-native-communications'
import _ from 'lodash'

class EmployeeEdit extends Component{
	componentWillMount(){
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({value, prop})
		})
	}

	onButtonPress(){
		const {name, phone, shift} = this.props
		this.props.employeeSave({name, shift, phone, uid: this.props.employee.uid})
		console.log(name, phone, shift)
	}

	onTextPress(){
		const {phone, shift } = this.props
		Communications.text(phone, `Your upcoming shift is on ${shift}`)
	}

	render(){
		return(
			<Card>
				<EmployeeForm />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedule
					</Button>
				</CardSection>
			</Card>
		)
	}
}

	const stateToProps = (state) => {
		const {name, phone, shift} = state.employeeForm
		return {name, phone, shift}
	}

	const dispatchToProps = (dispatch) => {
		return{
			employeeUpdate: ({prop, value}) => dispatch(actions.employeeUpdate({prop, value})),
			employeeSave: ({name, shift, phone, uid}) => dispatch(actions.employeeSave({name, shift, phone, uid}))
		}
	}


export default connect(stateToProps, dispatchToProps)(EmployeeEdit)
