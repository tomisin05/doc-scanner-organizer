// src/api.js
const API_URL = 'http://localhost:5000';

export const uploadImage = async (imageSrc) => {
  const formData = new FormData();
  formData.append('file', imageSrc);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.text;
};

export const generatePDF = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  const response = await fetch(`${API_URL}/generate-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }

  const blob = await response.blob();
  return blob;
};
