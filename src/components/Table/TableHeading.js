import './TableHeading.css'
const TableHeading = (props) => {
    const columnClickHandler = (event) => {
        props.onColumnClick(event.target.innerHTML)
    }
    return (
        <div className='table-heading'>
            {props.columns.map((column, index) => <div onClick={columnClickHandler} key={index}>{column}</div>)}
        </div>
    )
}

export default TableHeading;