import React from 'react';
import styles from './TableHeading.module.css';
const TableHeading = (props) => {
    const columnClickHandler = (event) => {
        props.onColumnClick(event.target.innerHTML)
    }
    return (
        <tr className={styles['table-heading-row']}>
            {props.columns.map((column, index) => 
            <th 
                className={column.sortable ? `${styles['table-heading']} ${column.name.replace(/\s/g, "") === props.activeColumn && styles['is-active']}` : styles['table-headting-no-sort']} 
                onClick={column.sortable ? columnClickHandler : undefined} 
                key={index}
                >{column.name}
            </th>)}
        </tr>
    )
}

export default TableHeading;