import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import MainView from './views/MainView';
import { Provider } from 'react-redux';
import store from './store/store';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <MainView />
          </QueryClientProvider>
        </Provider>
      </header>
    </div>
  );
}

export default App;
