import { data } from "./data";
import { ExampleComponent } from "./ExampleComponent";

function App() {
  return (
    <div className="App">
      <ExampleComponent data={data} />
    </div>
  );
}

export default App;
