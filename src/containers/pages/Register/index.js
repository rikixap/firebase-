import React, {Component} from 'react';
import './Register.scss';
import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';
import { registerUserAPI } from '../../../config/redux/action';
// import { connect } from 'react-redux';
import { connect } from 'react-redux';

class Register extends Component {
	state = {
		email: '',
		password: '',
		// isLoading: false
	}
	handleChangeText = (e) => 
{			this.setState({
				[e.target.id]: e.target.value,
			})
	}

	handleRegisterSubmit = async () => {
		const {email, password} = this.state;
		const res = await  this.props.registerAPI({email, password}).catch(err  => err);
		if (res) {
			this.setState({
				email: '',
				password: ''
			})

		}  



		}
		// this.setState({
		// 	isLoading: true
		// })
		// setTimeout(() => {
		// 	this.setState({
		// 		isLoading: false 
		// 	}) 
		// }, 5000)
// 			firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
// 				console.log('success:',res);
// 			}).catch(function(error) {
// 				 // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
	




	render() {
		return( 
			<div className="auth-container">
				<div className="auth-card">
					<p className="auth-title">Register Page</p>
				<input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email}/>
				<input className="input"  id="password" placeholder="password" type="password" onChange={this.handleChangeText} value={this.state.password} />
				<Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />	
					
				</div>
			</div>
			)
	}
}

const reduxState = (state) => ({
	isLoading: state.isLoading
})
const reduxDispatch = (dispatch) => ({
	registerAPI: (data) => dispatch(registerUserAPI(data))
})


export default connect(reduxState,reduxDispatch) (Register);