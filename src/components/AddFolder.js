import React, { Component } from "react";
import { addFolder } from "../Utilities";
import NotefulContext from "../NotefulContext";

export default class AddFolder extends Component {
	static contextType = NotefulContext;

	render() {
		return (
			<>
				<input
					type="text"
					className="name"
					onChange={e => this.context.updateNewName(e.target.value)}
				/>
				<button
					onClick={() =>
						addFolder(
							JSON.stringify({ name: this.context.inputs.name }),
							this.context.addFolder,
							this.props.history
						)
					}>
					Adding Folder
				</button>
			</>
		);
	}
}
