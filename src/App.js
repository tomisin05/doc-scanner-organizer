// src/App.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Scanner from './components/Scanner';
import DocumentList from './components/DocumentList';
import DocumentViewer from './components/DocumentViewer';
import Upload from './components/Upload';
import { detectEdges } from './utils/edgeDetection';
import { extractText } from './utils/ocr';
import { createPDF } from './utils/pdf';
import './App.css';
import { makeStyles } from '@mui/material/styles';
import Alert from '@mui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument, selectDocument } from './slices/documentSlice';
import { uploadImage, generatePDF } from './api';



const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  captureButton: {
    marginTop: theme.spacing(1),
  },
  documentList: {
    marginTop: theme.spacing(2),
  },
  documentViewer: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginTop: theme.spacing(1),
  },
  downloadButton: {
    marginTop: theme.spacing(2),
  },
}));


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents.list);
  const selectedDocument = useSelector((state) => state.documents.selectedDocument);
  const [error, setError] = useState(null);

  const handleCapture = async (imageSrc) => {
    try {
      const text = await uploadImage(imageSrc);
      const newDocument = { name: `Document ${documents.length + 1}`, imageSrc, text };
      dispatch(addDocument(newDocument));
      setError(null);
    } catch (err) {
      setError('Error processing image. Please try again.');
    }
  };

  const handleUpload = async (imageSrc) => {
    try {
      const text = await extractText(imageSrc);
      const newDocument = { name: `Document ${documents.length + 1}`, imageSrc, text };
      dispatch(addDocument(newDocument));
      setError(null);
    } catch (err) {
      setError('Error processing image. Please try again.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const files = documents.map(doc => doc.imageSrc);
      const pdfBlob = await generatePDF(files);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'documents.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setError(null);
    } catch (err) {
      setError('Error generating PDF. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className={classes.container}>
        {error && <Alert severity="error">{error}</Alert>}
        <Scanner onCapture={handleCapture} />
        <Upload onUpload={handleUpload} />
        <DocumentList documents={documents} onSelect={(doc) => dispatch(selectDocument(doc))} className={classes.documentList} />
        <DocumentViewer document={selectedDocument} className={classes.documentViewer} />
        <button onClick={handleDownloadPDF} className={classes.downloadButton}>Download PDF</button>
      </div>
    </div>
  );
};

export default App;
