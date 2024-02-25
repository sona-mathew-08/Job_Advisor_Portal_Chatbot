import React, { useState } from 'react';
import './App.css';

function App() {
  const [qualification, setQualification] = useState('');
  const [skills, setSkills] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showSkillsPrompt, setShowSkillsPrompt] = useState(false);

  const sendMessage = async () => {
    if (!qualification) return;

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
  };

  return (
    <div className="App">
      <h1>Job Suggestion Chatbot</h1>
      <div className="ChatHistory">
        {chatHistory.map((message, index) => (
          <div key={index} className="Message">
            <p>{message}</p>
          </div>
        ))}
      </div>
      <div className="InputContainer">
        <input
          type="text"
          placeholder="Enter your highest qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          disabled={showSkillsPrompt}
        />
        {showSkillsPrompt && (
          <input
            type="text"
            placeholder="Enter your skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        )}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
