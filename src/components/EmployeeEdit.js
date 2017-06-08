import React, { Component } from 'react'
import { Card, CardSection, Button, Confirm } from './common'
import EmployeeForm from './EmployeeForm'
import { connect } from 'react-redux'
import actions from '../actions/employeeActions'
import Communications from 'react-native-communications'
import _ from 'lodash'

class EmployeeEdit extends Component{
	state={
		showModal:false
	}

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

	onAccept(){
		const { uid } = this.props.employee
		this.props.employeeDelete({uid})
	}

	onDecline(){
		this.setState({
			showModal: false
		})
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
				<CardSection>
					<Button onPress={() => this.setState({showModal: !this.state.showModal})}>
						Fire Employee
					</Button>
				</CardSection>
				<Confirm
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
					visible={this.state.showModal}>
					Are you sure you want to delete this?
				</Confirm>
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
			employeeSave: ({name, shift, phone, uid}) => dispatch(actions.employeeSave({name, shift, phone, uid})),
			employeeDelete: ({uid}) => dispatch(actions.employeeDelete({uid})),
		}
	}


export default connect(stateToProps, dispatchToProps)(EmployeeEdit)
