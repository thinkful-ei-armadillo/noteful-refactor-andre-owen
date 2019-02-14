export default function deleteNote(noteId, callBack) {
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
