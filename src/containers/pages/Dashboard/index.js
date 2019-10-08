import React, {Component,Fragment} from 'react'; 
import './Dashboard.scss';  
import { connect } from 'react-redux';
import {addDataToAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';



class Dashboard extends Component {
	state = {
		title: '',
		content: '',
		date: '',
		textButton: 'Simpan',
		noteId: ''

	}
	componentDidMount(){
		const userData = JSON.parse(localStorage.getItem('userData')); 
		this.props.getNotes(userData.uid);
		console.log('dashboard',JSON.parse(userData))
		
	 }

	// getDataFirebase = () => {
	// 	const startCountRef firebase.database().ref('posts/' + postId + '/startCount');
	// }

	handleSaveNotes  = () => {
		const {title, content, textButton,noteId} = this.state;
		const {saveNotes,updateNotes} = this.props;
		const  userData = JSON.parse(localStorage.getItem('userData'))


		const data = {
			title: title,
			content: content,
			date: new Date().getTime(),
			userId: userData.uid

		}
		if(textButton === 'Simpan'){
			saveNotes(data)
		}else {
			data.noteId = noteId;
			updateNotes(data)
	}
	console.log(data)
}
	onInputChange = (e,type) => {
		this.setState({
			[type]: e.target.value
		})
	}
	
updateNotes = (note) => {
	console.log(note)
	this.setState({
		title: note.data.title,
		content: note.data.content,
		textButton: 'update ',
		noteId: note.Id
	})
}


cancelUpdate = () => {
	this.setState({
		title:'',
		content:'',
		textButton:'Simpan'
	})
}

	render() {
		const  {title, content, textButton} = this.state;
		const {notes} = this.props;
		const {updateNotes,cancelUpdate} = this;
		console.log('notes:',notes);
		return(
		<div className="container">
			<div className="input-form">
				<input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e,'title')}></input>
			<textarea placeholder="content" className="input-content" value={content}  onChange={(e) => this.onInputChange(e,'content')}>

			</textarea>
			<div className="action-wrapper">
			{
				textButton === 'update' ? (
				<button className="save-btn cancel" onClick={this.handleSaveNotes} onClick={cancelUpdate}>cancel</button>
				) : <div /> 
			}
				<button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
			</div>
			</div>
			<hr/>
			{
				notes.length > 0 ? (
					<Fragment>
						{
							notes.map( note => {
								return(
								<div className="card-content" key={note.id} onCLick={() => updateNotes(note)}>
									<p className="title">{note.data.title}</p>
									<p className="date">{note.data.date}</p>
									<p className="content">{note.data.content}</p>
								</div>
									)
								})
						}

					</Fragment>
				) : null
			}
			
		</div>


			)
	}
}
	const reduxState = (state) => ({
		userData: state.user,
		notes: state.notes 
	})

	const reduxDispatch = (dispatch) => ({
		saveNotes : (data) => dispatch(addDataToAPI(data)),
		getNotes: (data) => dispatch(getDataFromAPI(data)),
		updateNotes:(data) => dispatch(updateDataAPI(data)),

	})


export default connect(reduxState,reduxDispatch) (Dashboard);