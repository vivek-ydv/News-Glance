import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import News from './components/News';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
    const apiKey = process.env.REACT_APP_NEWSAPI;
    const pageSize = 6;
    const country = 'in';
    const [progress, setProgress] = useState(0)
    const [mode, setMode] = useState("light");

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = '#223333';

        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    return <div>
        <BrowserRouter>
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
            />
            <Navbar mode={mode} toggleMode={toggleMode}/>
            <Routes>
                <Route path="/" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='general' pageSize={pageSize} country={country} category='general' apiKey={apiKey} />} />
                <Route path="/business" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='busines' pageSize={pageSize} country={country} category='business' apiKey={apiKey} />} />
                <Route path="/science" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='science' pageSize={pageSize} country={country} category='science' apiKey={apiKey} />} />
                <Route path="/technology" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='technology' pageSize={pageSize} country={country} category='technology' apiKey={apiKey} />} />
                <Route path="/sports" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='sports' pageSize={pageSize} country={country} category='sports' apiKey={apiKey} />} />
                <Route path="/health" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='health' pageSize={pageSize} country={country} category='health' apiKey={apiKey} />} />
                <Route path="/entertainment" element={<News mode={mode} toggleMode={toggleMode} setProgress={setProgress} key='entertainment' pageSize={pageSize} country={country} category='entertainment' apiKey={apiKey} />} />
            </Routes>
        </BrowserRouter>
    </div>;
}

export default App;

