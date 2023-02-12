import './App.css';
import React, { Component } from "react";
import Navbar from './components/Navbar';
import News from './components/News';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
    apiKey = process.env.REACT_APP_NEWSAPI;
    pageSize = 6;
    country = 'in';
    state = {
        progress: 0
    }
    setProgress = (progress) => {
        this.setState({ progress: progress })
    }

    render() {
        return <div>
            <BrowserRouter>
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    height={3}
                />
                <Navbar />
                <Routes>
                    <Route path="/" element={<News setProgress={this.setProgress} key='general' pageSize={this.pageSize} country={this.country} category='general' apiKey={this.apiKey} />} />
                    <Route path="/business" element={<News setProgress={this.setProgress} key='busines' pageSize={this.pageSize} country={this.country} category='business' apiKey={this.apiKey} />} />
                    <Route path="/science" element={<News setProgress={this.setProgress} key='science' pageSize={this.pageSize} country={this.country} category='science' apiKey={this.apiKey} />} />
                    <Route path="/technology" element={<News setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country={this.country} category='technology' apiKey={this.apiKey} />} />
                    <Route path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country={this.country} category='sports' apiKey={this.apiKey} />} />
                    <Route path="/health" element={<News setProgress={this.setProgress} key='health' pageSize={this.pageSize} country={this.country} category='health' apiKey={this.apiKey} />} />
                    <Route path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country={this.country} category='entertainment' apiKey={this.apiKey} />} />
                </Routes>
            </BrowserRouter>
        </div>;
    }
}

