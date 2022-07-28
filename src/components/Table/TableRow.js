import styles from './TableRow.module.css';
const TableRow = (props) => {
    const {item } = props
    const propertyValues = getProperties(item)
    const getHighlightedText = (text) => {
        let value;
        if(typeof text === "number")
        {
            value = text.toString();
        }else{
            value = text
        }
        const parts = value.split(new RegExp(`(${props.searchValue})`, 'gi'));
        if(parts.length > 1)
        {
            return <span> { parts.map((part, i) => 
                <span key={i} style={part.toLowerCase() === props.searchValue.toLowerCase() ? { fontWeight: 'bold', color :'#d2042d' } : {} }>
                    { part }
                </span>)
            } </span>;
        }
        return text
    }
    function getProperties(obj) {
        let properties = []
        Object.keys(obj).forEach(e => {
            if(e !== "id")
            {
                properties.push(obj[e])
            }
        })
        
        return properties
    }
    const showDetailHandler = () => {
        props.onTableRowClick(item.id)
    }
    const deleteButtonClickHandler = (e) => {
        e.stopPropagation();
        props.onDeleteButtonClick(item.id);
    }
    return (
        <tr onClick={showDetailHandler} className={styles['table-row']}>
            {propertyValues.map((propertyValue, index) => <td className={styles['table-row-item']} key={index}>{getHighlightedText(propertyValue)}</td>)}
            {props.deleteIsOn && <td className={styles['table-row-item']}><button className={styles.deleteButton} onClick={deleteButtonClickHandler}>X</button></td>}
        </tr>
    )
}

export default TableRow;