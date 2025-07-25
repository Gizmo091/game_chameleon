import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { t } from '../utils/i18n';

function QRScanner({ onScan, onError, onClose, lang }) {
  const videoRef = useRef(null);
  const [reader] = useState(() => new BrowserMultiFormatReader());
  const [scanning, setScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let controls;

    const startScanning = async () => {
      try {
        setScanning(true);
        
        // Check if we're on HTTPS or localhost
        const isSecure = window.location.protocol === 'https:' || 
                        window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';
        
        if (!isSecure) {
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          const error = isIOS 
            ? 'QR scanning is not available on iOS devices without HTTPS. Please enter the game code manually.'
            : 'Camera access requires HTTPS. Please enter the game code manually.';
          setErrorMessage(error);
          onError(new Error(error));
          return;
        }

        // Request camera permission explicitly
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        // Stop the stream immediately - we just wanted to check permission
        stream.getTracks().forEach(track => track.stop());

        controls = await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, error) => {
            if (result) {
              const text = result.getText();
              console.log('QR Code scanned:', text);
              
              // Extract game code from URL format: http://domain/?join=CODE
              const match = text.match(/[?&]join=([A-Z0-9]{4})/i);
              if (match) {
                onScan(match[1].toUpperCase());
              } else {
                // Try direct game code (just 4 characters)
                const directMatch = text.match(/^([A-Z0-9]{4})$/i);
                if (directMatch) {
                  onScan(directMatch[1].toUpperCase());
                }
              }
            }
          }
        );
      } catch (err) {
        console.error('Error starting QR scanner:', err);
        let errorMsg = t(lang, 'join.scanError');
        
        if (err.name === 'NotAllowedError') {
          errorMsg = 'Camera permission denied. Please allow camera access and try again.';
        } else if (err.name === 'NotFoundError') {
          errorMsg = 'No camera found on this device.';
        } else if (err.name === 'NotReadableError') {
          errorMsg = 'Camera is already in use by another application.';
        } else if (!window.isSecureContext) {
          errorMsg = 'Camera access requires HTTPS. Please use HTTPS or enter the game code manually.';
        }
        
        setErrorMessage(errorMsg);
        onError(new Error(errorMsg));
        setScanning(false);
      }
    };

    startScanning();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [reader, onScan, onError]);

  return (
    <div className="qr-scanner-overlay" onClick={onClose}>
      <div className="qr-scanner-container" onClick={(e) => e.stopPropagation()}>
        <div className="qr-scanner-header">
          <h3>{errorMessage ? 'Error' : t(lang, 'join.scanning')}</h3>
          <button onClick={onClose} className="close-scanner">×</button>
        </div>
        {errorMessage ? (
          <div className="qr-scanner-error">
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📱</div>
            <p>{errorMessage}</p>
            {/iPad|iPhone|iPod/.test(navigator.userAgent) && (
              <div className="qr-scanner-hint">
                💡 Tip: Look at the host's screen and type the 4-digit code shown there.
              </div>
            )}
          </div>
        ) : (
          <video 
            ref={videoRef} 
            className="qr-scanner-video"
            style={{ width: '100%', maxWidth: '400px' }}
          />
        )}
        <button onClick={onClose} className="btn-secondary">
          {errorMessage ? 'Close' : t(lang, 'join.stopScan')}
        </button>
      </div>
    </div>
  );
}

export default QRScanner;