
// Here is the class based component
import "./App.css";
import React, { Component } from "react"
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";


// Below is the function based component.
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


export default class App extends Component {
  pageSize=6;
  apiKey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
          <Route exact path = "/" element={<News key="general"pageSize={this.pageSize} country="in" category="general" apiKey={this.apiKey}/>}>
          </Route>

          <Route exact path = "/business" element={<News key="business"pageSize={this.pageSize} country="in" category="business" apiKey={this.apiKey}/>}>
          </Route>

          <Route exact path = "/entertainment" element={<News key="entertainment"pageSize={this.pageSize} country="in" category="entertainment" apiKey={this.apiKey}/>}>
          </Route>
          <Route exact path = "/general" element={<News key="general"pageSize={this.pageSize} country="in" category="general" apiKey={this.apiKey}/>}>
          </Route>

          <Route exact path = "/technology" element={<News key="technology"pageSize={this.pageSize} country="in" category="technology" apiKey={this.apiKey}/>}>
          </Route>

          <Route exact path = "/health" element={<News key="health"pageSize={this.pageSize} country="in" category="health" apiKey={this.apiKey}/>}>
         
          </Route>
          <Route exact path = "/science" element={<News key="science"pageSize={this.pageSize} country="in" category="science" apiKey={this.apiKey}/>}>
          </Route>

          <Route exact path = "/sports" element={<News key="sports"pageSize={this.pageSize} country="in" category="sports" apiKey={this.apiKey}/>}>
          </Route>
        </Routes>
      </Router>
      </div>
    )
  
  }
}
