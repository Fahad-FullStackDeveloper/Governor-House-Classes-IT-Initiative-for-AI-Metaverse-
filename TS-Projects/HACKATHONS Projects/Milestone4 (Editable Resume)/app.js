"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import jsPDF library
const jspdf_1 = require("jspdf");
// Elements
const saveButton = document.getElementById('saveButton');
const downloadButton = document.getElementById('downloadButton');
const profilePic = document.getElementById('profilePic');
const uploadPic = document.getElementById('uploadPic');
const resumeContainer = document.getElementById('resumeContainer');
// Event listener for profile picture upload
uploadPic.addEventListener('change', function (event) {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                profilePic.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
});
// Save resume to local storage
saveButton.addEventListener('click', () => {
    const resumeContent = resumeContainer.innerHTML;
    localStorage.setItem('resume', resumeContent);
    alert('Resume saved locally!');
});
// Load resume from local storage on page load
window.onload = () => {
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
        resumeContainer.innerHTML = savedResume;
    }
};
// Download resume as PDF
downloadButton.addEventListener('click', () => {
    const doc = new jspdf_1.jsPDF();
    doc.html(resumeContainer, {
        callback: function (pdf) {
            pdf.save("resume.pdf");
        },
        x: 10,
        y: 10
    });
});
