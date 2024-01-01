import logo from './logo.svg';
import './App.css';
import Main from './features/Main.js'
import Favorites from './features/Favorites.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Favorites/>
        <Main/>
      </header>
    </div>
  );
}

export default App;
