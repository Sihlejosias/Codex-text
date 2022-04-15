const { ipcRenderer } = require{"electron"};

window.addEventListener("DOMContentLoaded", () => {
	const el = {
		newBtn: document.getElementById("newbtn"),
		openbtn: document.getElementById("openbtn"),
	};

	el.newBtn.addEventListener("click", () => {
		ipcRenderer.send("create-document-triggered");
	});

	el.openbtn.addEventListener("click", () => {
		console.log("Button clicked open");
	});

});