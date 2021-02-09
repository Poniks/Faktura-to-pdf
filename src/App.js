import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <div>
          <div>
            <div className="row">
              Sprzedawca
              <input type="text"/>
            </div>
            <div className="row">
              NIP
              <input type="text"/>
            </div>
            <div className="row">
              Ulica
              <input type="text"/>
            </div>
            <div className="row">
              Miasto / kod
              <input type="text"/>
            </div>
          </div>
          <div></div>
        </div>
      </form>
    </div>
  );
}

export default App;
