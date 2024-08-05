// src/utils/pdf.js
import { PDFDocument } from 'pdf-lib';

export const createPDF = async (images, texts) => {
  const pdfDoc = await PDFDocument.create();
  for (let i = 0; i < images.length; i++) {
    const page = pdfDoc.addPage();
    const jpgImage = await pdfDoc.embedJpg(images[i]);
    const { width, height } = jpgImage.scale(0.5);
    page.drawImage(jpgImage, {
      x: page.getWidth() / 2 - width / 2,
      y: page.getHeight() / 2 - height / 2,
      width,
      height,
    });

    if (texts[i]) {
      page.drawText(texts[i], {
        x: 50,
        y: 50,
        size: 12,
      });
    }
  }
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
