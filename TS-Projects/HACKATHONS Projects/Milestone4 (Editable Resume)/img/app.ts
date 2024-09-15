// Import jsPDF library
import { jsPDF } from "jspdf";

// Elements
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
const downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
const profilePic = document.getElementById('profilePic') as HTMLImageElement;
const uploadPic = document.getElementById('uploadPic') as HTMLInputElement;
const resumeContainer = document.getElementById('resumeContainer') as HTMLElement;

// Event listener for profile picture upload
uploadPic.addEventListener('change', function (event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                profilePic.src = e.target.result as string;
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
    const doc = new jsPDF();
    
    doc.html(resumeContainer, {
        callback: function (pdf) {
            pdf.save("resume.pdf");
        },
        x: 10,
        y: 10
    });
});
