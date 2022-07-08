import './App.css';
import Demo from './components/Demo';
import DemoAnalytics from './components/DemoAnalytics';
import DemoFrequents from './components/DemoFrequents';
import DemoLocations from './components/DemoLocations';

function App() {
  return (
    <div className="App">
      <Demo />
      <DemoFrequents />
      <DemoLocations />
      <DemoAnalytics />
    </div>
  );
}

export default App;
