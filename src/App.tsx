import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MemorialScreen from './screens/Memorial';
import Navigation from './components/Navigation';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/memorial" element={<MemorialScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;