import React, { useEffect,useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";

const TypingBox = ({saveAiMessage,saveUserMessage , socket}) => {

  const [message, setMessage] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [silenceTimer, setSilenceTimer] = useState(null);
  const SILENCE_THRESHOLD = 5000; // 5 seconds


  const handelSend = async() => {
    socket.emit('userMessage', message);
    saveUserMessage(message);
    setMessage('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key (new line)
      handelSend();
    }
  };


  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); // For Chrome
    // const recognition = new SpeechRecognition(); // For other browsers

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      // setMessage((prevMessage) => prevMessage + transcript);
      console.log(transcript);

      resetSilenceTimer();
    };

    recognition.onend = () => {
      // Restart recognition after it ends for continuous listening
      if (recognition) {
        recognition.start();
      }
    };

    recognition.start();
    setRecognition(recognition);
  }

  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  }

  const resetSilenceTimer = () => {
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }

    setSilenceTimer(setTimeout(() => {
      if (transcript.trim() !== '') {
        // Send the user's speech to AI after 5 seconds of silence
        socket.emit('userMessage', message);
        saveUserMessage(message);
        setMessage('');
      }
    }, SILENCE_THRESHOLD));
  }

  const handelVoice = () => {
    if (recognition) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  }

  useEffect(() => {
    socket.on('aiResponse', (message) => {
      console.log(message);
      saveAiMessage(message);
    });

    return () => {
      socket.off('aiResponse');
    }
  }, [socket, saveAiMessage]);

  useEffect(() => {
    return () => {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
      }
    }
  }, [silenceTimer]);


  return (
    
    <div className=''>
    
        <div className='w-full bg-white max-w-screen-xl flex border-2 my-5 p-2 rounded-lg fixed bottom-0'>
        
            <input type="text" className='focus:ring-0 w-11/12 rounded-xl border-none' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
            <div className='flex justify-space'>
                {/* <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg' onClick={handelVoice}><IoMdMic /></i> */}
                <i className='my-auto text-xl m-3 hover:bg-gray-200 p-3 rounded-lg' onClick={handelSend}><IoSendSharp /></i>
            </div>
        </div>
    </div>
  )
}

export default TypingBox