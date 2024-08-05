// src/utils/ocr.js
import Tesseract from 'tesseract.js';

export const extractText = async (imageSrc) => {
  try {
    const result = await Tesseract.recognize(
      imageSrc,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Error extracting text from image.');
  }
};
