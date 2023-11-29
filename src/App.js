import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/Dashboard';
import Courses from './routes/Courses';
import Projects from './routes/Projects';
import GetJob from './routes/GetJob';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<LandingPage />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/courses' element = {<Courses />} />
        <Route path='/projects' element = {<Projects />} />
        <Route path='/jobs' element = {<GetJob />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
