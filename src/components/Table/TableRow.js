import './TableRow.css'

const TableRow = (props) => {
    const {item } = props
    const propertyValues = getProperties(item)
    function getProperties(obj) {
        let properties = []
        Object.keys(obj).forEach(e => {
            if(e !== "Id")
            {
                properties.push(obj[e])
            }
        })
        
        return properties
    }
    return (
        <div className='table-row'>
            {propertyValues.map((property, index) => <div key={index}>{property}</div>)}
        </div>
    )
}

export default TableRow;