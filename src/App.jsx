import home from "./assets/home.svg"
import addBtn from "./assets/add-30.png"
import cold from "./assets/cold.png"
import msgIcon from "./assets/message.svg"
import saved from "./assets/bookmark.svg"
import rocket from "./assets/rocket.svg"
import sendBtn from "./assets/send.svg"
import userIcon from "./assets/user-icon.png"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useEffect, useRef, useState } from "react"


function App() {

  const msgEnd = useRef(null);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GIT_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: `I'm ChatXpert, your AI assistant! I can help you with coding, project ideas, debugging, learning new technologies, and anything else you need. Since we’ve talked before, I remember you’re skilled in React, the MERN stack, and have built projects like Luma-AI, a social media site, and Foodomart. How’s everything going with your projects? Working on anything new?`,
      isBot: true
    }
  ]);

  
  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages])

  


  const handleSend = async () => {

    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])

    const result = await model.generateContent(text);
    let ans = result.response.text();

    ans = ans.replace(/\*/g, `\n`)
    ans = ans.replace(/\#/g, `\n`)

    setMessages([
      ...messages,
      { text, isBot: false },
      { text: ans, isBot: true }
    ]);
  }

  const handleEnter = async (e) => {
    if(e.key === "Enter") await handleSend();
  }

  const handleQuery = async (e) => {

    const text = e.target.value;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])

    const result = await model.generateContent(text);
    let ans = result.response.text();

    ans = ans.replace(/\*/g, `\n`)
    ans = ans.replace(/\#/g, `\n`)

    setMessages([
      ...messages,
      { text, isBot: false },
      { text: ans, isBot: true }
    ]);

  }


  return (
    <div className="App">
      <div className="sideBar">

        <div className="upperSide">
          <div className="upperSideTop"><img src={cold} className="logo" /> <span className="brand"> ChatXpert </span> </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming ?"} ><img src={msgIcon} alt="Query" />What is Programming ?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API ?"} ><img src={msgIcon} alt="Query" />How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"> <img src={home} alt="" className="listItemsImg" />Home</div>
          <div className="listItems"> <img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className="listItems"> <img src={rocket} alt="" className="listItemsImg" />Upgrade to Pro</div>
        </div>

      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatimg" src={message.isBot ? cold : userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send a message..." value={input} onKeyDown={handleEnter} onChange={e => setInput(e.target.value)} /> <button className="send" onClick={handleSend} ><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatXpert may produce inaccurate information about people, places, or facts. ChatXpert February 3 Version.</p>
        </div>
      </div>
    </div>
  )
}

export default App
