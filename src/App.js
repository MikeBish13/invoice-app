import "./App.css";
import InvoiceList from "./Pages/InvoiceList";
import {QueryClient, QueryClientProvider} from 'react-query';
import { Route, Switch } from 'react-router-dom'
import InvoicePage from "./Pages/InvoicePage";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
