<<<<<<< HEAD
import './styles/App.css';
import InvoiceList from './components/InvoiceList';
import InvoicePage from './components/InvoicePage';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
=======
import "./styles/App.css";
import InvoiceList from "./Pages/InvoiceList";
import { Route, Switch } from 'react-router-dom'
import InvoicePage from "./Pages/InvoicePage";
import {QueryClient, QueryClientProvider} from 'react-query';
import SideBar from "./components/SideBar";
>>>>>>> development


const queryClient = new QueryClient();

function App() {
  return (
    <>
    <div className="App">
<<<<<<< HEAD
      <NavBar />
      <Switch>
      <Route path="/" exact component={InvoiceList}/>
      <Route path="/invoice/:id" component={InvoicePage}/>
      </Switch>
=======
    <QueryClientProvider client={queryClient}>
      <SideBar />
          <Switch>
              <Route path='/' exact component={InvoiceList}></Route>
              <Route path='/invoice/:id' component={InvoicePage}></Route>
          </Switch>
    </QueryClientProvider>
>>>>>>> development
    </div>
    </>   
  );
}

export default App;
