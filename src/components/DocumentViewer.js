// src/components/DocumentViewer.js
import React from 'react';

const DocumentViewer = ({ document }) => {
  return (
    <div>
      {document && (
        <>
          <img src={document.imageSrc} alt="Document" />
          <p>{document.text}</p>
        </>
      )}
    </div>
  );
};

export default DocumentViewer;
