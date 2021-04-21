import { useState, useEffect } from "react";
// import { Parser } from "./Parser";
// const parser = new Parser();

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [segment, setSegment] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [toggle, setToggle] = useState(false);

  // Searches function for search submit event
  const search = (event) => {
    event.preventDefault();

    const seg = input[segment.toUpperCase()];
    const field = seg && seg[fieldName.toUpperCase()];

    if (!field) {
      setOutput("Invalid segment or fieldname!");
    } else {
      setOutput(JSON.stringify(field));
    }
  };

  // Displays parsed message or hide message
  const handleClick = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  // After components mounts, fetch for input.txt in public directory
  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((input) => setInput(input));
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <form onSubmit={search}>
          Segment:
          <input
            value={segment}
            onChange={(event) => setSegment(event.target.value)}
          />
          Field name:
          <input
            value={fieldName}
            onChange={(event) => setFieldName(event.target.value)}
          />
          <button>Search</button>
        </form>

        <button onClick={handleClick}>
          {" "}
          {!toggle ? <span>Parsed message</span> : <span>Hide</span>}
        </button>
      </div>

      <div id="output">
        <h2>Output:</h2>
        <h3>{output}</h3>
        <br></br>
        {toggle ? <pre>{JSON.stringify(input, null, 2)}</pre> : null}
      </div>
    </div>
  );
}

export default App;
