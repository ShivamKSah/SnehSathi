
import { useState, useEffect } from 'react';

// Add ImageCapture type definition since TypeScript doesn't include it by default
interface ImageCapture {
  takePhoto(): Promise<Blob>;
}

declare global {
  interface Window {
    ImageCapture?: {
      prototype: ImageCapture;
      new(track: MediaStreamTrack): ImageCapture;
    };
  }
}

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  const startCamera = async (constraints: MediaStreamConstraints = { video: true }) => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setIsActive(true);
      setError(null);
      return newStream;
    } catch (err: any) {
      setError(err.message || 'Failed to access camera');
      setIsActive(false);
      return null;
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      setIsActive(false);
    }
  };

  const takePhoto = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!stream) {
        resolve(null);
        return;
      }

      try {
        const videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack) {
          resolve(null);
          return;
        }

        // Use ImageCapture API if available
        if (window.ImageCapture) {
          const imageCapture = new window.ImageCapture(videoTrack);
          imageCapture.takePhoto()
            .then(blob => {
              const url = URL.createObjectURL(blob);
              resolve(url);
            })
            .catch(() => {
              fallbackTakePhoto();
            });
        } else {
          fallbackTakePhoto();
        }
        
        function fallbackTakePhoto() {
          // Fallback method for browsers not supporting ImageCapture API
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();

          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              ctx.drawImage(video, 0, 0);
              canvas.toBlob(blob => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  resolve(url);
                } else {
                  resolve(null);
                }
              });
            } else {
              resolve(null);
            }
            
            video.pause();
            video.srcObject = null;
          }, 100);
        }
      } catch (err) {
        console.error('Error taking photo:', err);
        resolve(null);
      }
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    stream,
    isActive,
    error,
    startCamera,
    stopCamera,
    takePhoto,
    hasCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
  };
}
