import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function ComparisonTable({ data }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Característica</th>
            <th>⚡️ Widget Web</th>
            <th>🛠️ API Personalizada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className={styles.featureCell}>{row.feature}</td>
              <td className={clsx(styles.valueCell, styles.highlightWidget)}>{row.widget}</td>
              <td className={clsx(styles.valueCell, styles.highlightApi)}>{row.api}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
