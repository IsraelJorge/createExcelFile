import { data } from "./data";
import { XlsxControllBoard } from "./XlsxControllBoard";

function App() {
  return (
    <div className="App">
      <XlsxControllBoard data={data} />
    </div>
  );
}

export default App;
