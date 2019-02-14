import React, { Component } from "react";
import { addNote } from "../Utilities";
import NotefulContext from "../NotefulContext";

export default class AddNote extends Component {
	static contextType = NotefulContext;
	render() {
		return (
			<>
				<input
					type="text"
					className="name"
					onChange={e => this.context.updateNewName(e.target.value)}
				/>
				<input
					type="text"
					className="content"
					onChange={e => this.context.updateNewContent(e.target.value)}
				/>
				<p
					onClick={() =>
						addNote(
							{
								name: this.context.inputs.name,
								content: this.context.inputs.content,
								folderId: this.props.match.params.folderId
							},
							this.context.addNote,
							this.props.history
						)
					}>
					Adding Note
				</p>
				)
			</>
		);
	}
}
