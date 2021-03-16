import './styles/App.css';
import InvoiceList from './components/InvoiceList';
import InvoicePage from './components/InvoicePage';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router >
    <div className="App">
      <NavBar />
      <Switch>
      <Route path="/" exact component={InvoiceList}/>
      <Route path="/invoice/:id" component={InvoicePage}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
