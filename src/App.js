import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState({
    link1 : "",
    link2 : ""
  })

  const handleInput = (e) => {
    const {value} = e.target;
    setInput(value);
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${input}`);
      const res = await response.json();

      if(res.ok) {
        setOutput((prev) => {
          return {...prev, link1 : res.result.short_link, link2 : res.result.short_link2}
        })
      } else {
        alert("error occured. try again")
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(`error occured. try again: ${error}`)
    }
  }

  return (
    <div className="App">
      <div className="App-body">
        <div className="App-container">
          <div className='App-form'>
            <input type="text" value={input} onChange={handleInput} />
            <button className='submit-btn' onClick={handleSubmit} disabled={isLoading}>
              Shorten
            </button>
          </div>
          <div className="App-output">
            <div className='url-container'>
              <span className='label'>Short Url:</span> 
              <span className='url'><a target='_blank' rel="noreferrer" href={`https://${output.link1}`}>{output.link1}</a></span>
            </div>
            <div className='url-container'>
              <span className='label'>Short Url 2:</span> 
              <span className='url'><a target='_blank' rel="noreferrer" href={`https://${output.link2}`}>{output.link2}</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
