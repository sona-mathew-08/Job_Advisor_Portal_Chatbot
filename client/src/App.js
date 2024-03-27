import React, { useState } from 'react';
import './App.css';

function App() {
  const [qualification, setQualification] = useState('');
  const [skills, setSkills] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showSkillsPrompt, setShowSkillsPrompt] = useState(false);
  const [mesg,showmsg]=useState(true);

  const sendMessage = async () => {
    if (!qualification) return;
    addMsg(message)
    !showSkillsPrompt && window.setTimeout(addResponseMsg, 1000,"Enter your skills");
    if (!showSkillsPrompt) {
      setShowSkillsPrompt(true);
      return;
    }

    if (!skills) return;

    // Send user input to Flask backend
    const response = await fetch('http://localhost:5000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qualification, skills }),
    });
    const data = await response.json();
    const jobMessages = data.map((job, index) => `${index + 1}. ${job}`);
    // Update chat history with bot response
    setChatHistory([...chatHistory, `Based on your qualifications and skills, you can apply for the following jobs:`, ...jobMessages]);
    // Clear input fields
    setQualification('');
    setSkills('');
    // Hide skills prompt
    setShowSkillsPrompt(false);
    
    showmsg(false);
  };
  const [qual,setqual]=useState(true);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState('');
  // const [chatHistory, setChatHistory] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  // const send = () => {
  //   if (running) return;
  //   if (message === '') return;
  //   setRunning(true);
  //   addMsg(message);
  //   window.setTimeout(addResponseMsg, 1000, message);
  // };

  const addMsg = (msg) => {
    const div = document.createElement('div');
    div.innerHTML = `<span style='flex-grow:1'></span><div class='chat-message-sent'>${msg}</div>`;
    div.className = 'chat-message-div';
    document.getElementById('message-box').appendChild(div);
    setMessage('');
    document.getElementById('message-box').scrollTop = document.getElementById('message-box').scrollHeight;
    
  };

  const addResponseMsg = (msg) => {
    const div = document.createElement('div');
    div.innerHTML = `<div class='chat-message-received'>${msg}</div>`;
    div.className = 'chat-message-div';
    document.getElementById('message-box').appendChild(div);
    document.getElementById('message-box').scrollTop = document.getElementById('message-box').scrollHeight;
    setRunning(false);
  };

  // const handleKeyDown = (event) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     send();
  //   }
  // };

  const handleToggle = () => {
    if (collapsed) {
      document.getElementById('chatbot').classList.remove('collapsed');
      document.getElementById('chatbot_toggle').children[0].style.display = 'none';
      document.getElementById('chatbot_toggle').children[1].style.display = '';
      // setTimeout(addResponseMsg, 1000, 'Enter your highest qualification');
    } else {
      document.getElementById('chatbot').classList.add('collapsed');
      document.getElementById('chatbot_toggle').children[0].style.display = '';
      document.getElementById('chatbot_toggle').children[1].style.display = 'none';
    }
    setCollapsed(!collapsed);
  };

  return (
    <div className="title">
      <div>
        <div id="chatbot" className={`main-card ${collapsed ? 'collapsed' : ''}`}>
          <button id="chatbot_toggle" onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ display: `${collapsed ? '' : 'none'}` }}>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15 4v7H5.17l-.59.59-.58.58V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ display: `${collapsed ? 'none' : ''}` }}>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
          <div className="main-title">
            <div>
              <svg viewBox="0 0 640 512" title="robot">
                <path fill="currentColor" d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z" />
              </svg>
            </div>
            <span>Chatbot</span>
          </div>
         {mesg && <div className="chat-area" id="message-box">
          <div class='chat-message-received'>Enter your highest qualification</div>
          <div className="chat-message-received ChatHistory">
            {/* {chatHistory.map((message, index) => (
              
              <div key={index} className="Message">
                <p>{message}</p>
              </div>
            ))} */}
          </div>
          
          {/* <span style={{flexgrow:1}}></span><div class='chat-message-sent chat-message-div'>hi</div> */}
          </div>}
          {!mesg && <div className="chat-area" id="message-box">
          {/* <div class='chat-message-received'>Enter your highest qualification</div> */}
          <div className="chat-message-received ChatHistory">
            {chatHistory.map((message, index) => (
              
              <div key={index} className="Message">
                <p>{message}</p>
              </div>
            ))}
          </div>
          
          {/* <span style={{flexgrow:1}}></span><div class='chat-message-sent chat-message-div'>hi</div> */}
          </div>}
          <div className="line"></div>
          <div className="input-div">
            {/* <input
              className="input-message"
              name="message"
              type="text"
              id="message"
              placeholder="Type your message ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              
            /> */}
           {mesg && qual && <input className='input-message'
          type="text"
          // placeholder="Enter your highest qualification"
          placeholder="Type your message ..."
          value={qualification}
          onChange={(e) => {setQualification(e.target.value);setMessage(e.target.value);}}
          disabled={showSkillsPrompt}
        />}
        {mesg && showSkillsPrompt && (
          <input className='input-message'
            type="text"
            // placeholder="Enter your skills"
            placeholder="Type your message ..."
            value={skills}
            onChange={(e) => {setSkills(e.target.value);setMessage(e.target.value);}}
          />
        )}

           {mesg && <button className="input-send" onClick={()=>{sendMessage();setqual(false);}} >
              <svg style={{ width: '24px', height: '24px' }}>
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            </button>}
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [qualification, setQualification] = useState('');
//   const [skills, setSkills] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [showSkillsPrompt, setShowSkillsPrompt] = useState(false);

//   const sendMessage = async () => {
//     if (!qualification) return;

//     if (!showSkillsPrompt) {
//       setShowSkillsPrompt(true);
//       return;
//     }

//     if (!skills) return;

//     // Send user input to Flask backend
//     const response = await fetch('http://localhost:5000/chatbot', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ qualification, skills }),
//     });
//     const data = await response.json();
//     const jobMessages = data.map((job, index) => `${index + 1}. ${job}`);
//     // Update chat history with bot response
//     setChatHistory([...chatHistory, `Based on your qualifications and skills, you can apply for the following jobs:`, ...jobMessages]);
//     // Clear input fields
//     setQualification('');
//     setSkills('');
//     // Hide skills prompt
//     setShowSkillsPrompt(false);
//   };

//   return (
//     <div className="App">
//       <h1>Job Suggestion Chatbot</h1>
//       <div className="ChatHistory">
//         {chatHistory.map((message, index) => (
//           <div key={index} className="Message">
//             <p>{message}</p>
//           </div>
//         ))}
//       </div>
//       <div className="InputContainer">
//         <input
//           type="text"
//           placeholder="Enter your highest qualification"
//           value={qualification}
//           onChange={(e) => setQualification(e.target.value)}
//           disabled={showSkillsPrompt}
//         />
//         {showSkillsPrompt && (
//           <input
//             type="text"
//             placeholder="Enter your skills"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//           />
//         )}
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;
