import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import { Link } from "react-router-dom";
import { deleteNote } from "../Utilities";

// function deleteNote(noteId, callBack){
//     const options = {
//                       method: 'DELETE',
//                       headers: {'content-type': 'application/json'}
//                     }

//     fetch(`http://localhost:9090/notes/${noteId}`, options)
//                     .then(res => {
//                         if(res.ok) return res.json()
//                         else throw new Error(res.status)
//                     })
//                     .then(() => callBack(noteId))
//                     .catch(error => console.log(error))
// }

class Notelist extends Component {
	static contextType = NotefulContext;

	getNotesFolder = folderId => {
		return this.context.notes.filter(note => note.folderId === folderId);
	};

	render() {
		let notes = this.context.notes;
		const { folderId } = this.props.match.params;
		if (folderId) {
			notes = this.getNotesFolder(folderId);
		}

		return (
			<ul className="note-list">
				{notes.map(note => {
					return (
						<li key={note.id}>
							<h2 className="title">
								<Link to={`/note/${note.id}`}>{note.name}</Link>
							</h2>
							<button
								className="delete-note"
								onClick={() => deleteNote(note.id, this.context.deleteNote)}>
								DELETE
							</button>
							<div className="modified-date">
								Modified <span>{note.modified}</span>
							</div>
						</li>
					);
				})}
				<Link to={`/addNote/${this.props.match.params.folderId}`}>
					Add Note
				</Link>
			</ul>
		);
	}
}

export default Notelist;
