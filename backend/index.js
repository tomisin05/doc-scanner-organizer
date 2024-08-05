// backend/index.js
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const allowedTypes = ['image/jpeg', 'image/png'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }


    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).send('Invalid file type');
    }

    if (req.file.size > maxFileSize) {
        return res.status(400).send('File size exceeds limit');
    }

    // File is available in req.file
    const imageBuffer = req.file.buffer;
    
    // Perform OCR and return extracted text (we'll implement OCR next)
    Tesseract.recognize(imageBuffer, 'eng')
      .then(({ data: { text } }) => {
        res.json({ text });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error performing OCR');
      });
  });
  
// backend/index.js
app.post('/generate-pdf', upload.array('files', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded');
  }

  try {
    const pdfDoc = await PDFDocument.create();
    for (const file of req.files) {
      const imageBuffer = file.buffer;
      const image = await pdfDoc.embedPng(imageBuffer);

      const page = pdfDoc.addPage();
      const { width, height } = image.scale(1);
      page.drawImage(image, {
        x: 0,
        y: page.getHeight() - height,
        width,
        height,
      });

      const text = await Tesseract.recognize(imageBuffer, 'eng').then(({ data: { text } }) => text);
      page.drawText(text, {
        x: 10,
        y: page.getHeight() - height - 20,
        size: 12,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, 'output.pdf');
    fs.writeFileSync(pdfPath, pdfBytes);

    res.download(pdfPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

const cors = require('cors');

app.use(cors());

app.get('/download', (req, res) => {
  const pdfPath = path.join(__dirname, 'output.pdf');
  res.download(pdfPath);
});
