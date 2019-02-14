import React, { Component } from "react";
import { addFolder } from "../Utilities";

export default class AddFolder extends Component {
	render() {
		return (
			<button
				onClick={
					(() => addFolder(JSON.stringify({ name: "thing" })),
					this.context.addFolder)
				}>
				Adding Folder
			</button>
		);
	}
}
