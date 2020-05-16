import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import QueryView from "./view/QueryView";
import AllUserQueries from "./view/AllUserQueries";
import LinkButtons from "./components/LinkButtons";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <LinkButtons/>
          <Route path="/" exact component={QueryView}/>
          <Route path="/allUserQueries" exact component={AllUserQueries}/>
        </div>
      </Router>
    );
  }

}

export default App;
