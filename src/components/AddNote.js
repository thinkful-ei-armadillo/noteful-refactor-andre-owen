import React, { Component } from "react";
import { addNote } from "../Utilities";

export default class AddNote extends Component {
	render() {
		return <p onClick={() => addNote()}>Adding Note</p>;
	}
}
