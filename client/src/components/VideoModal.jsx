import React from 'react';
import Modal from 'react-modal';

// Utility to get YouTube video ID from URL
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    padding: '0',
    border: 'none',
    background: 'black',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root'); // Important for accessibility

const VideoModal = ({ isOpen, onRequestClose, videoUrl }) => {
  const videoId = getYouTubeId(videoUrl);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {videoId ? (
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p style={{ color: 'white', padding: '20px' }}>Invalid YouTube URL</p>
        )}
      </div>
    </Modal>
  );
};

export default VideoModal;