import { useState } from 'react'
import './App.css'
import CSVReader from './components/CSVReader/CSVReader'
import ResultsData from './components/ResultsData/ResultsData'
import { parseDate } from './utils/date'

function App() {
  const [projectsData, setProjectsData] = useState(null);

  function groupDataByProjects(data) {
    let projectsObj = {};

    for (const entry of data) {
      // variables are named after the header names in the file
      const { EmpID, ProjectID, DateFrom, DateTo } = entry;

      // Create item for every project
      if (!projectsObj[ProjectID]) {
        projectsObj[ProjectID] = [];
      }

      projectsObj[ProjectID].push({
        EmpID,
        DateFrom: parseDate(DateFrom),
        DateTo: parseDate(DateTo)
      });
    }

    return projectsObj;
  }

  function handleFileSelect(fileData) {
    console.log(fileData);
    const projects = groupDataByProjects(fileData);
    setProjectsData(projects);
  }

  function handleClick() {
    setProjectsData(null);
  }

  return (
    <>
      {!projectsData ?
        <CSVReader onFileSelect={handleFileSelect} /> :
        <>
          <ResultsData projectsData={projectsData} />
          <button onClick={handleClick}>New File</button>
        </>
      }
    </>
  )
}

export default App
