const { ipcRenderer } = require("electron");
const path = require("path");

window.addEventListener("DOMContentLoaded", function () {
    var el = {
        newBtn: document.getElementById("newbtn"),
        openbtn: document.getElementById("openbtn"),
        documentName: document.getElementById("documentName"),
        fileTextarea: document.getElementById("fileTextarea"),    
        characCount: document.getElementById("character-count"),
        wordCount: document.getElementById("word-count"),    
    };

    el.newBtn.addEventListener("click", function () {
        ipcRenderer.send("create-document-triggered");
    });

    el.openbtn.addEventListener("click", function () {
        ipcRenderer.send("open-document-triggered");
    });

    ipcRenderer.on("document-created", (_, filePath) => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.fileTextarea.removeAttribute("disabled");
        el.fileTextarea.value = "";
        el.fileTextarea.focus();
    });

    ipcRenderer.on("document-opened", (_, {filePath, content}) => {
        el.documentName.innerHTML = path.parse(filePath).base;

        el.fileTextarea.removeAttribute("disabled");
        el.fileTextarea.value = content;
        el.fileTextarea.focus();
    });

    // el.fileTextarea.addEventListene("input", (e) => {
    //     ipcRenderer.send("file-content-updated", e.target.value)
    // });

    let characCount = document.getElementById("character-count");
    let wordCount = document.getElementById("word-count");
    let inputTextArea = document.querySelector(".input-text-area");

    inputTextArea.addEventListener('input', () => {
        characCount.textContent = inputTextArea.value.length;

        let txt = inputTextArea.value.trim();
        wordCount.textContent = txt.split(/\s+/).filter((item) => item).length;
    });
});
