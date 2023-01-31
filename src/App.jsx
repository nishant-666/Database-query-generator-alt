import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import Select from "react-select";
import Loader from "./components/Loader";
import "./App.css";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_Open_AI_Key,
});

const openai = new OpenAIApi(configuration);

const options = [
  { value: "MongoDB", label: "MongoDB" },
  { value: "SQL", label: "SQL" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MariaDB", label: "MariaDB" },
  { value: "Firebase", label: "Firebase" },
  { value: "Prisma", label: "Prisma" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "DynamoDB", label: "DynamoDB" },
];

function App() {
  const [database, setDatabase] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [valid, setValid] = useState({
    db: false,
    query: false,
  });
  const getDB = (selected) => {
    setDatabase(selected.value);
    setValid({ db: true, query: valid.query });
    setCopied(false);
  };

  const getQuery = (e) => {
    setQuery(e.target.value);
    setValid({
      db: valid.db,
      query: e.target.value.length === 0 ? false : true,
    });
    setCopied(false);
  };

  const generateQuery = async () => {
    let finalQuery = `Create a ${database} request to ${
      query.charAt(0).toLowerCase() + query.slice(1)
    }:`;
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: finalQuery,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setLoading(false);
    setResult(response.data.choices[0].text);
  };
  return (
    <div className="App">
      <h1>Database Query Generator!</h1>
      <div className="app-inner">
        <Select
          placeholder="Select Your Database.."
          options={options}
          className="react-select"
          onChange={getDB}
        />

        <textarea
          rows={4}
          className="query-input"
          onChange={getQuery}
          placeholder={`Enter your Database Query. \n\nFor Example, find all users who live in California and have over 1000 credits..`}
        />

        <button
          disabled={valid.db && valid.query ? false : true}
          onClick={generateQuery}
          className="generate-query"
        >
          Generate Query
        </button>

        {!loading ? (
          result.length > 0 ? (
            <div className="result-text">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                }}
                className="copy-btn"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <h3>{result}</h3>
            </div>
          ) : (
            <></>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default App;
