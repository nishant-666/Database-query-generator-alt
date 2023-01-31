import React from "react";
import Select from "react-select";
import "./App.css";

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
  return (
    <div className="App">
      <h1>Database Query Generator!</h1>
      <div className="app-inner">
        <Select
          placeholder="Select Your Database.."
          options={options}
          className="react-select"
        />

        <textarea
          rows={4}
          className="query-input"
          placeholder={`Enter your Database Query. \n\nFor Example, find all users who live in California and have over 1000 credits..`}
        />

        <button className="generate-query">Generate Query</button>
      </div>
    </div>
  );
}

export default App;
