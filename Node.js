const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generate-pdf', (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('resume.pdf'));
    doc.text(`Name: ${req.body.name}`);
    doc.text(`Email: ${req.body.email}`);
    doc.text(`Phone: ${req.body.phone}`);
    doc.text(`Education: ${req.body.education}`);
    doc.text(`Skills: ${req.body.skills}`);
    doc.text(`Hobbies: ${req.body.hobbies}`);
    doc.end();

    res.download('resume.pdf');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});