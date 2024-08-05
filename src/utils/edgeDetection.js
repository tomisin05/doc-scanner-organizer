// src/utils/edgeDetection.js
import cv from 'opencv.js';

export const detectEdges = (imageSrc) => {
  const src = cv.imread(imageSrc);
  const dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.Canny(src, dst, 50, 100, 3, false);
  cv.imshow('canvasOutput', dst);
  src.delete();
  dst.delete();
};
