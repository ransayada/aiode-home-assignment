import './index.css';
import { useState, useRef, useEffect } from "react";
import track from './assets/audio/track.wav';
import trackRev from './assets/audio/track-reverse.wav';

//handle key press hook
const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};


const App = () => {
  const speeds = [5.0, 4.0, 3.0, 2.0, 1.0,0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
  const [isReverse, setIsReverse] = useState(false);
  const [isPlaying,setIsPlaying] = useState(false);
  const [playBackSpeedIndex,setPlayBackSpeedIndex] = useState(6);
  const audioRegRef = useRef();
  const audioRevRef = useRef();
  //key press hooks
  const jPressed = useKeyPress("j");
  const lPressed = useKeyPress("l");
  const kPressed = useKeyPress("k");
  const escapePressed = useKeyPress("Escape");
  
  //Click on K button or K-Key pressed
  const play =() =>{
      if(isPlaying){
        setPlayBackSpeedIndex(6);
        audioRegRef.current.playbackRate = speeds[playBackSpeedIndex];
        setIsReverse(false);
        audioRegRef.current.pause();
        audioRevRef.current.pause();
      }else{
          audioRegRef.current.playbackRate = speeds[playBackSpeedIndex];
          audioRegRef.current.play();
          audioRevRef.current.play();
        }
      setIsPlaying(!isPlaying);
    };
  //Click on L button or L-Key pressed
  const speedUp = () => {
      if(playBackSpeedIndex < speeds.length-1){
        if(playBackSpeedIndex<5){setIsReverse(true);}
        if(playBackSpeedIndex>5){setIsReverse(false);}
        setPlayBackSpeedIndex(playBackSpeedIndex+1);
        audioRegRef.current.playbackRate = speeds[playBackSpeedIndex];
        audioRevRef.current.playbackRate = speeds[playBackSpeedIndex];
      }
    };
  //Click on J button or J-Key pressed
  const speedDown = () => {
      if(playBackSpeedIndex > 0){
        if(playBackSpeedIndex<5){setIsReverse(true);}
        if(playBackSpeedIndex>5){setIsReverse(false);}
        setPlayBackSpeedIndex(playBackSpeedIndex-1);
        audioRegRef.current.playbackRate = speeds[playBackSpeedIndex];
        audioRevRef.current.playbackRate = speeds[playBackSpeedIndex];
      }   
    };

    const terminate= () =>{
      alert('Program Terminated');
    }
    if(escapePressed){
      audioRegRef.current.pause();
      audioRevRef.current.pause();
      terminate();
    }
    

    //Key press handler
    const handleKeyPress = (ev) => {
      console.log('here', ev.key);
      const key = ev.key;
      if (key === "k") {
        play();
      } else if (key === "j") {
        speedDown();
      } else if (key === "l") {
        speedUp();
      } else if (key === "Escape") {
        terminate();
      }
    };

    //DOM
  return (
    <div className="App">
      <div className="title">
        <h1>a<span>I</span>o<span>D</span>e</h1>
      </div>
      <div className="audio">
      <audio
          loop
          muted={isReverse}
          ref={audioRegRef}
          src={track}
          playbackrate={speeds[playBackSpeedIndex]}
        ></audio>
        <audio
          loop
          muted={!isReverse}
          ref={audioRevRef}
          src={trackRev}
          playbackrate={speeds[playBackSpeedIndex]}
        ></audio>
      </div>
      <div className="buttons">
      <div className="btn-container">
      <button
            className={!jPressed ? "btn-not-active" : "btn-active"}
            onClick={speedDown}
            onKeyPress={handleKeyPress}
          >
            J
          </button>
          <button
            
            className={!isPlaying ? "btn-not-active" : "btn-pressed"}
            onClick={play}
            onKeyPress={handleKeyPress}
          >
            K
            </button>
          <button
            className={!lPressed ? "btn-not-active" : "btn-active"}
            onClick={speedUp}
            onKeyPress={handleKeyPress}
          >
            L
          </button>
      </div>
      </div>
    </div>
  );
}


export default App;
