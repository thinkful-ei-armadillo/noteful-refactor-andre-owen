import React, { Component } from "react";
import NotefulContext from "../NotefulContext";
import { Link } from "react-router-dom";

class Folderlist extends Component {
	static contextType = NotefulContext;

	render() {
		const folders = this.context.folders.map(folder => {
			return (
				<li key={folder.id}>
					<Link to={`/folder/${folder.id}`} id={folder.id}>
						{folder.name}
					</Link>
				</li>
			);
		});
		return (
			<div className="folder-list">
				<ul className="folders">{folders}</ul>
				<Link to="/addFolder">Add Folder</Link>
			</div>
		);
	}
}

export default Folderlist;
