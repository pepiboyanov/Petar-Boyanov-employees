import Papa from 'papaparse';

import styles from './CSVReader.module.css';

export default function CSVReader({ onFileSelect }) {
  function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Using PapaParse library for reading the csv file (https://www.papaparse.com/)
    Papa.parse(file, {
      header: true, // we assume that the files should contain header
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(), // trim whitespaces in headers
      transform: (data) => data.trim(), // trim whitespaces in data
      complete: (results) => onFileSelect(results.data), // the callback to execute when parsing is complete
      error: (err) => console.error("Error while parsing the file!", err)
    });
  };

  return (
    <div>
      <h1>Select a CSV File</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className={styles.input}
      />
    </div>
  );
};