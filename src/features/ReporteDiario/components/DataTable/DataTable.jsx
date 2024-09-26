import React from "react";
import styles from "./DataTable.module.css";

const DataTable = ({ titles, data }) => {
	return (
		<table className={styles.customTable}>
			<thead>
				<tr>
					<th>{titles.main}</th>
					{titles.subtitles.map((sub, index) => (
						<th key={index}>{sub}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index}>
						<td>{item.subtitle}</td>
						{item.values.map((val, valIndex) => (
							<td key={valIndex}>{val}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
