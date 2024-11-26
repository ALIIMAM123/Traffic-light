import React, { useState, useEffect } from 'react';
import './style.css';

// // Requirement -
// // whenever i open app green signal start for 20sec after that yellow signal and then red signal .
// // we have three button  for red, yellow , green ,
// // when  i click on any button their time whatever previously left should increse by 10 sec (means left 5 + increase by 10 -> 15)
// // After  completing thier respective time respective signal will glow after each completion of their duration.

// // step1- make three signal

// export default function App() {
//   const [showLight, setShowLight] = useState({ name: 'red', duration: 5000 });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (showLight.name === 'red') {
//         setShowLight({ name: 'yellow', duration: 5000 });
//       } else if (showLight.name === 'yellow') {
//         setShowLight({ name: 'green', duration: 5000 });
//       } else if (showLight.name === 'green') {
//         setShowLight({ name: 'red', duration: 5000 });
//       }
//     }, showLight.duration);
//     return () => clearTimeout(timer);
//   }, [showLight.name]);

//   const IncreaseRedTimer = () => {
//     if (showLight.name == 'red') {
//       setShowLight((prev) => ({ ...prev, duration: prev.duration + 3000 }));
//     }
//   };

//   const IncreaseYellowTimer = () => {
//     if (showLight.name == 'yellow') {
//       setShowLight((prev) => ({ ...prev, duration: prev.duration + 8000 }));
//     }
//   };

//   const IncreaseGreenTimer = () => {
//     if (showLight.name == 'green') {
//       setShowLight((prev) => ({ ...prev, duration: prev.duration + 10000 }));
//     }
//   };

//   console.log(showLight.duration);

//   return (
//     <div>
//       <div className="wrapper-container">
//         <div className="signal">
//           <div className="signal-wrapper">
//             <div
//               className="signal-color"
//               style={{
//                 height: '40px',
//                 width: '40px',
//                 backgroundColor: 'red',
//                 borderRadius: '50%',
//                 opacity: showLight.name == 'red' ? 1 : 0.1,
//               }}
//             ></div>
//             <div className="signal-color">
//               <button className="signal-btn" onClick={IncreaseRedTimer}>
//                 Increase By 10s
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="signal">
//           <div className="signal">
//             <div className="signal-wrapper">
//               <div
//                 className="signal-color"
//                 style={{
//                   height: '40px',
//                   width: '40px',
//                   backgroundColor: 'yellow',
//                   borderRadius: '50%',
//                   opacity: showLight.name == 'yellow' ? 1 : 0.1,
//                 }}
//               ></div>
//               <div className="signal-color">
//                 <button className="signal-btn" onClick={IncreaseYellowTimer}>
//                   Increase By 10s
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="signal">
//           <div className="signal">
//             <div className="signal-wrapper">
//               <div
//                 className="signal-color"
//                 style={{
//                   height: '40px',
//                   width: '40px',
//                   backgroundColor: 'green',
//                   borderRadius: '50%',
//                   opacity: showLight.name == 'green' ? 1 : 0.1,
//                 }}
//               ></div>
//               <div className="signal-color">
//                 <button className="signal-btn" onClick={IncreaseGreenTimer}>
//                   Increase By 10s
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

export default function App() {
  const [showLight, setShowLight] = useState({ name: 'red', duration: 5000 });
  const [timeLeft, setTimeLeft] = useState(showLight.duration / 1000);

  // Manage light transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showLight.name === 'red') {
        setShowLight({ name: 'yellow', duration: 5000 });
      } else if (showLight.name === 'yellow') {
        setShowLight({ name: 'green', duration: 4000 });
      } else if (showLight.name === 'green') {
        setShowLight({ name: 'red', duration: 5000 });
      }
    }, showLight.duration);

    setTimeLeft(showLight.duration / 1000);
    let uniqueId = setInterval(() => {
      setTimeLeft((prevCount) => (prevCount > 0 ? prevCount - 1 : 1));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(uniqueId);
    };
  }, [showLight]);

  // Functions to increase the duration of the current light
  const increaseDuration = (lightName, increment) => {
    if (showLight.name === lightName) {
      setShowLight((prev) => ({
        ...prev,
        duration: prev.duration + increment,
      }));
      // setTimeLeft((prev) => prev + increment / 1000); // Adjust timeLeft as well
    }
  };

  return (
    <div>
      <h1>Traffic Light Control</h1>
      <div className="wrapper-container">
        {/* Red Light */}
        <div className="signal">
          <div className="signal-wrapper">
            <div
              className="signal-color"
              style={{
                height: '50px',
                width: '50px',
                backgroundColor: 'red',
                borderRadius: '50%',
                opacity: showLight.name === 'red' ? 1 : 0.2,
              }}
            ></div>
            {/* {showLight.name === 'red' && <p>Time left: {timeLeft}s</p>} */}
            {showLight.name == 'red' ? (
              <span>Time Left: {timeLeft}sec</span>
            ) : (
              ''
            )}
            <button
              className="signal-btn"
              onClick={() => increaseDuration('red', 10000)}
            >
              Increase Red by 10s
            </button>
          </div>
        </div>

        {/* Yellow Light */}
        <div className="signal">
          <div className="signal-wrapper">
            <div
              className="signal-color"
              style={{
                height: '50px',
                width: '50px',
                backgroundColor: 'yellow',
                borderRadius: '50%',
                opacity: showLight.name === 'yellow' ? 1 : 0.2,
              }}
            ></div>
            {showLight.name == 'yellow' ? (
              <span>Time Left: {timeLeft}sec</span>
            ) : (
              ''
            )}
            <button
              className="signal-btn"
              onClick={() => increaseDuration('yellow', 8000)}
            >
              Increase Yellow by 8s
            </button>
          </div>
        </div>

        {/* Green Light */}
        <div className="signal">
          <div className="signal-wrapper">
            <div
              className="signal-color"
              style={{
                height: '50px',
                width: '50px',
                backgroundColor: 'green',
                borderRadius: '50%',
                opacity: showLight.name === 'green' ? 1 : 0.2,
              }}
            ></div>
            {showLight.name == 'green' ? (
              <span>Time Left: {timeLeft}sec</span>
            ) : (
              ''
            )}
            <button
              className="signal-btn"
              onClick={() => increaseDuration('green', 12000)}
            >
              Increase Green by 12s
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
