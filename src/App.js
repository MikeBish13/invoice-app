import "./styles/App.css";
import InvoiceList from "./Pages/InvoiceList";
import { Route, Switch } from 'react-router-dom'
import InvoicePage from "./Pages/InvoicePage";
import {QueryClient, QueryClientProvider} from 'react-query';
import SideBar from "./components/SideBar";


const queryClient = new QueryClient();

function App() {
  return (
    <>
    <div className="App">
    <QueryClientProvider client={queryClient}>
      <SideBar />
          <Switch>
              <Route path='/' exact component={InvoiceList}></Route>
              <Route path='/invoice/:id' component={InvoicePage}></Route>
          </Switch>
    </QueryClientProvider>
    </div>
    </>   
  );
}

export default App;
