import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LandingPage />} />
        <Route path='/dashboard' element = {<Dashboard />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
