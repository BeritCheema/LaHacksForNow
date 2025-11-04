import CursorTrail from './components/CursorTrail.jsx';
import Starfield from './components/Starfield.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-white">
      <Starfield />
      <CursorTrail />
      <Home />
    </div>
  );
};

export default App;
