// src/components/Scanner.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Alert from '@mui/lab/Alert';

const Scanner = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [error, setError] = useState(null);

  const capture = React.useCallback(() => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
      setError(null);
    } catch (err) {
      setError('Error capturing image. Please try again.');
    }
  }, [webcamRef, onCapture]);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
      />
      <button onClick={capture}>Capture</button>
    </div>
  );
};

export default Scanner;
