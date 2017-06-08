import React, { Component } from 'react'
import { View, Text, Picker} from 'react-native'
import { CardSection, Input } from './common'
import { connect } from 'react-redux'
import actions from '../actions/employeeActions'


class EmployeeForm extends Component{
	render(){
		return(
			<View>
			<CardSection>
				<Input
					label="Name"
					placeholder="Marn"
					value={this.props.name}
					onChangeText = {(text)=>{this.props.employeeUpdate({prop:'name', value:text})}}
				/>
			</CardSection>

			<CardSection>
				<Input
					label="Phone"
					placeholder="333-333-3333"
					value={this.props.phone}
					onChangeText = {(text)=>{this.props.employeeUpdate({prop:'phone', value:text})}}
				/>
			</CardSection>
			<CardSection style={{borderWidth:0}}>
				<Text style={styles.pickerTextStyle}>Select Shift</Text>
			</CardSection>

			<CardSection style={{borderWidth:0}}>
				<Picker style={{flex:1}}
					selectedValue={this.props.shift}
					onValueChange={(day)=> {this.props.employeeUpdate({prop:'shift', value: day})}}
				>
					<Picker.Item label="Monday" value="Monday" />
					<Picker.Item label="Tuesday" value="Tuesday" />
					<Picker.Item label="Wednesday" value="Wednesday" />
					<Picker.Item label="Thursday" value="Thursday" />
					<Picker.Item label="Friday" value="Friday" />
					<Picker.Item label="Saturday" value="Monday" />
					<Picker.Item label="Sunday" value="Sunday" />
				</Picker>
			</CardSection>
			</View>
		)
	}
}

const styles = {
	pickerTextStyle: {
		
		fontSize: 18,
		paddingLeft: 20
	}
}

const stateToProps = (state)=>{
	const {name, phone, shift } = state.employeeForm
	return {name, phone, shift}
}

const dispatchToProps = (dispatch) => {
	return{
		employeeUpdate: ({prop, value}) => dispatch(actions.employeeUpdate({prop, value})),
		employeeCreate: ({name, phone, shift}) => dispatch(actions.employeeCreate({name, phone, shift}))
	}
}

export default connect(stateToProps, dispatchToProps)(EmployeeForm)
