const { ipcRenderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", function () {
    var el = {
        newBtn: document.getElementById("newbtn"),
        openbtn: document.getElementById("openbtn"),
        documentName: document.getElementById("documentName"),
        fileTextarea: document.getElementById("fileTextarea"),
    };

    el.newBtn.addEventListener("click", function () {
        ipcRenderer.send("create-document-triggered");
    });

    el.openbtn.addEventListener("click", function () {
        console.log("Button clicked open");
    });

    ipcRenderer.on("document-created", (_, filePath) => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.fileTextarea.removeAttribute("disabled");
        el.fileTextarea.value = "Test";
        el.fileTextarea.focus();
    });
});
