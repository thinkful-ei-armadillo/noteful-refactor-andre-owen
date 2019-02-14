import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import NotefulContext from "./NotefulContext";

// import STORE from './store';
import Folderlist from "./components/Folderlist";
import Folder from "./components/Folder";
import Notelist from "./components/Notelist";
import NoteInfo from "./components/NoteInfo";
import AddFolder from "./components/AddFolder";
import AddNote from "./components/AddNote";
import "./App.css";

//deleteInfo.js component unused

class App extends Component {
	state = {
		folders: [],
		notes: [],
		inputs: {
			name: "",
			content: "",
			folderId: "",
			modified: ""
		}
	};

	// =================Update state with get request================
	componentDidMount() {
		const options = {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		};

		Promise.all([
			fetch("http://localhost:9090/folders", options),
			fetch("http://localhost:9090/notes", options)
		])
			.then(([res1, res2]) => {
				if (res1.ok && res2.ok) return Promise.all([res1.json(), res2.json()]);
				else throw new Error(res1.status, res2.status);
			})
			.then(([folders, notes]) => {
				this.setState({
					folders,
					notes
				});
			})
			.catch(error => console.log(error));
		// console.log(this.state);
	}
	// ===============================================================

	// code some kind of reset function at some point
	// resetInputs = () => {
	//   this.setState(inputs: {})
	// };

	addFolder = folder => {
		const newFolders = [...this.state.folders, folder];
		this.setState({
			folders: newFolders
		});
	};

	addNote = note => {
		const newNotes = [...this.state.notes, note];
		this.setState({
			notes: newNotes
		});
		console.log(this.state);
	};

	deleteNote = noteId => {
		const newNotes = this.state.notes.filter(note => note.id !== noteId);
		this.setState({
			notes: newNotes
		});
	};

	// onChange
	updateNewName = value => {
		this.setState({ inputs: { ...this.state.inputs, name: value } });
	};

	updateNewContent = value => {
		this.setState({ inputs: { ...this.state.inputs, content: value } });
	};

	render() {
		const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNote: this.deleteNote,
			addNote: this.addNote,
			addFolder: this.addFolder,
			updateNewName: this.updateNewName,
			updateNewContent: this.updateNewContent,
			inputs: this.state.inputs
			// add new note, add new folder and delete note
		};
		// console.log(contextValue);
		return (
			<NotefulContext.Provider value={contextValue}>
				<div className="App">
					<header>
						<h1>
							<Link to="/">Noteful</Link>
						</h1>
					</header>
					<div className="main">
						<nav className="folder-nav">
							<Switch>
								<Route exact path="/" component={Folderlist} />
								<Route exact path="/folder/:folderId" component={Folderlist} />
								<Route path="/note/:noteId" component={Folder} />
							</Switch>
						</nav>
						<main className="note-list">
							<Switch>
								<Route exact path="/" component={Notelist} />
								<Route path="/folder/:folderId" component={Notelist} />
								<Route path="/note/:noteId" component={NoteInfo} />
								<Route path="/addFolder" component={AddFolder} />
								<Route path="/addNote/:folderId" component={AddNote} />
							</Switch>
						</main>
					</div>
				</div>
			</NotefulContext.Provider>
		);
	}
}

export default App;
