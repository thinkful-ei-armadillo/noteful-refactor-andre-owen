// the callback is App.addFolder
function addFolder(folder, callBack, history) {
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: folder
	};

	fetch(`http://localhost:9090/folders/`, options)
		.then(res => {
			if (res.ok) return res.json();
			else throw new Error(res.status);
		})
		.then(json => {
			callBack(json);
			history.push("/");
		})
		.catch(error => console.log(error));
}

// the callback is App.addNote
function addNote(note, callBack, history) {
	const newNote = JSON.stringify({
		...note,
		modified: "" //timestamp at time of submit
	});
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: newNote
	};

	fetch(`http://localhost:9090/notes/`, options)
		.then(res => {
			if (res.ok) return res.json();
			else throw new Error(res.status);
		})
		.then(json => {
			callBack(json);
			history.push("/");
		})
		.catch(error => console.log(error));
}

function deleteNote(noteId, callBack) {
	const options = {
		method: "DELETE",
		headers: { "content-type": "application/json" }
	};

	fetch(`http://localhost:9090/notes/${noteId}`, options)
		.then(res => {
			if (res.ok) return res.json();
			else throw new Error(res.status);
		})
		.then(() => callBack(noteId))
		.catch(error => console.log(error));
}
export { addFolder, addNote, deleteNote };
