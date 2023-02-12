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

    return <div>
        <BrowserRouter>
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<News setProgress={setProgress} key='general' pageSize={pageSize} country={country} category='general' apiKey={apiKey} />} />
                <Route path="/business" element={<News setProgress={setProgress} key='busines' pageSize={pageSize} country={country} category='business' apiKey={apiKey} />} />
                <Route path="/science" element={<News setProgress={setProgress} key='science' pageSize={pageSize} country={country} category='science' apiKey={apiKey} />} />
                <Route path="/technology" element={<News setProgress={setProgress} key='technology' pageSize={pageSize} country={country} category='technology' apiKey={apiKey} />} />
                <Route path="/sports" element={<News setProgress={setProgress} key='sports' pageSize={pageSize} country={country} category='sports' apiKey={apiKey} />} />
                <Route path="/health" element={<News setProgress={setProgress} key='health' pageSize={pageSize} country={country} category='health' apiKey={apiKey} />} />
                <Route path="/entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} country={country} category='entertainment' apiKey={apiKey} />} />
            </Routes>
        </BrowserRouter>
    </div>;
}

export default App;

