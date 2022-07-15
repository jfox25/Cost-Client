import styles from './TableRow.module.css';
const TableRow = (props) => {
    const {item } = props
    const propertyValues = getProperties(item)
    const getHighlightedText = (text) => {
        let value;
        if(Number.isInteger(text))
        {
            value = text.toString();
        }else {
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
    return (
        <tr className={styles['table-row']}>
            {propertyValues.map((propertyValue, index) => <td className={styles['table-row-item']} key={index}>{getHighlightedText(propertyValue)}</td>)}
        </tr>
    )
}

export default TableRow;