import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faRotateRight, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import '@dotlottie/player-component';
import { BiSolidVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";

const MusicPlayer = ({ tracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [volume, setVolume] = useState(1);
  const [seekValue, setSeekValue] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioRef = useRef(null);

  const [audioSources, setAudioSources] = useState([]);

  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const lottieRefs = useRef([]);

 

  useEffect(() => {
    lottieRefs.current.forEach(ref => {
      if (ref) {
        if (isPlaying) {
          ref.play();
        } else {
          ref.stop();
        }
      }
    });
    setIsAnimationPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const loadAudioSources = async () => {
      const sources = await Promise.all(
        tracks.map(async (track) => {
          try {
            const audio = new Audio(track.src);
            return new Promise((resolve) => {
              audio.addEventListener('loadeddata', () => {
                resolve({ ...track, audio });
              });
              audio.addEventListener('error', () => {
                console.error(`Failed to load audio: ${track.src}`);
                resolve({ ...track, audio: null });
              });
            });
          } catch (error) {
            console.error(`Error loading audio for ${track.src}:`, error);
            return { ...track, audio: null };
          }
        })
      ); 
      setAudioSources(sources);
    };

    loadAudioSources();

  }, [tracks]);

useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', setDurationTime);
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', setDurationTime);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Playback failed", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    audioRef.current.currentTime = (seekTo / 100) * audioRef.current.duration;
    setSeekValue(seekTo);
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    audioRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const updateTime = () => {
    setCurrentTime(formatTime(audioRef.current.currentTime));
    setSeekValue((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const setDurationTime = () => {
    setDuration(formatTime(audioRef.current.duration));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play();          
    }
  };

  const backgroundStyle = {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  };
  
  const videoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    opacity: 0.9,
  };
  
  return (
    <div style={backgroundStyle} className="flex justify-center h-screen w-full">
      <video autoPlay loop muted style={videoStyle}>
        <source src="/v1.mp4" type="video/mp4" />
      </video>
      
      <div className="bg-transparent rounded-lg space-y-3 z-50 max-w-[32rem] my-20 px-4 w-full sm:px-0">
        <div className="flex space-x-1.5">
          {[...Array(1)].map((_, index) => (
            <dotlottie-player
              key={index}
              ref={el => lottieRefs.current[index] = el}
              src="https://lottie.host/9e0025fc-4108-4796-a385-68eed2cc5a47/Cyz39vu62E.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '8rem' }}
              loop
              autoplay
            ></dotlottie-player>
          ))}
        </div>
        
        <div className="flex space-x-1.5">
          {[...Array(1)].map((_, index) => (
            <dotlottie-player
              key={index}
              ref={el => lottieRefs.current[index] = el}
              src="https://lottie.host/b257acf0-ef3e-45a1-8af1-3c15ca723652/6W6BuM2E6z.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '8rem' }}
              loop
              autoplay={false}
            ></dotlottie-player>
          ))}
        </div>
        
        <div className="text-center font-bold mb-20 text-[#080f02]">
          {audioSources[currentTrackIndex]?.title || 'Loading...'}
        </div>
        
        <input type="range" min="0" max="100" value={seekValue} onChange={handleSeek} className="w-full" />
        
        <div className="flex items-center justify-between lg:gap-9 text-sm sm:text-base gap-3">
  <div className="flex items-center lg:gap-6 space-x-2 gap-3">
    <button onClick={playPreviousTrack}>
      <FontAwesomeIcon icon={faStepBackward} className="text-lg" />
    </button>
    
    <button className='text-yellow-500' onClick={togglePlay}>
      <FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} className="text-xl" />
    </button>
    
    <button onClick={playNextTrack}>
      <FontAwesomeIcon icon={faStepForward} className="text-lg" />
    </button>
  </div>

  <button onClick={restartSong}>
    <FontAwesomeIcon icon={faRotateRight} className="text-lg" />
  </button>
  
  <select
    value={playbackSpeed}
    onChange={handleSpeedChange}
    className="border-none bg-transparent text-base"
  >
    <option className='bg-transparent' value="0.5">0.5x</option>
    <option className='bg-transparent' value="1">1x</option>
    <option className='bg-transparent' value="1.5">1.5x</option>
    <option className='bg-transparent' value="2">2x</option>
    <option className='bg-transparent' value="2.5">2.5x</option>
  </select>
  
  <div className="flex items-center space-x-2">
    <button onClick={toggleMute}>
      {isMuted ? <BiSolidVolumeMute className='font-bold'/> : <GoUnmute className='font-bold'/>}
    </button>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      className="w-20 hidden sm:block"
    />
  </div>
  
  <div className="text-sm">
    <span>{currentTime}/</span>
    <span>{duration}</span>
  </div>
</div>

      </div>
      
      <audio
        type="audio/mpeg"
        ref={audioRef}
        src={audioSources[currentTrackIndex]?.src}
        onEnded={() => { playNextTrack(); setIsPlaying(false); }}
        onError={(e) => console.error("Audio error", e)}
      ></audio>
    </div>
  );

};

export default MusicPlayer;