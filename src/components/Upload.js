// src/components/Upload.js
import React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Upload = ({ onUpload }) => {
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
  
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Invalid file type');
        return;
      }
  
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size exceeds limit');
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button-file">
        <Button
          variant="contained"
          color="default"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default Upload;
