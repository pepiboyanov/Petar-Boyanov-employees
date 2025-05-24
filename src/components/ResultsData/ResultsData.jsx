import { getOverlappingDays } from "../../utils/date";

import styles from "./ResultsData.module.css";

export default function ResultsData({ projectsData }) {
    console.log(projectsData);

    function findLongestWorkingPairs(data) {
        let resultsArr = [];

        // iterate trough the project entries
        for (const [projectID, records] of Object.entries(data)) {
            // check only projects with more than 1 employee
            if (records.length > 1) {
                let maxOverlap = 0;
                let bestPair;

                for (let i = 0; i < records.length - 1; i++) {
                    for (let j = i + 1; j < records.length; j++) {
                        const emp1 = records[i];
                        const emp2 = records[j];

                        const overlappingDays = getOverlappingDays(emp1.DateFrom, emp1.DateTo, emp2.DateFrom, emp2.DateTo);

                        if (overlappingDays > maxOverlap) {
                            maxOverlap = overlappingDays;
                            bestPair = {
                                projectID,
                                emp1: emp1.EmpID,
                                emp2: emp2.EmpID,
                                daysWorkedTogether: overlappingDays
                            };
                        }
                    }
                }

                if (bestPair) {
                    resultsArr.push(bestPair);
                }
            }
        }

        return resultsArr;
    }

    const longestWorkingPairs = findLongestWorkingPairs(projectsData);

    console.log(longestWorkingPairs);

    return <table className={styles.results}>
        <caption>Longest working pairs of employees per project</caption>
        <thead>
            <tr>
                <th>Project Id</th>
                <th>Employee 1</th>
                <th>Employee 2</th>
                <th>Days together</th>
            </tr>
        </thead>
        <tbody>
            {longestWorkingPairs.map(el => (
                <tr key={el.projectID}>
                    <td>{el.projectID}</td>
                    <td>{el.emp1}</td>
                    <td>{el.emp2}</td>
                    <td>{el.daysWorkedTogether}</td>
                </tr>
            ))}
        </tbody>
    </table>
}