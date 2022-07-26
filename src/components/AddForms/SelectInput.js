import { useState, useEffect, useRef } from 'react'
import styles from './SelectInput.module.css'

const SelectInput = ({label, items, onSubmit, isRequired}) => {
    const [shownItems, setShownItems] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [submitHasRan, setSubmitHasRan] = useState(false);
    const inputRef = useRef('')
 
    const handleFilterItems = () => {
        const filteredItems = items.filter(item => item.Name.toLowerCase().includes(inputRef.current.value.toLowerCase()))
        setShownItems(filteredItems);
    }
    const handleSearchItemClick = (event) => {
        event.stopPropagation();
        const value = {id : event.currentTarget.id, name: event.currentTarget.getAttribute("name")}
        inputRef.current.value = value.name
        setSubmitHasRan(true);
        onSubmit(value)
    }
    useEffect(() => {
        if(showResults === true) {
            handleFilterItems("");
            setSubmitHasRan(false);
        }
    }, [showResults]);
    const blurEventHandler = () => {
        setShowResults(false)
        if(!submitHasRan) {
            onSubmit({id : 0, name: inputRef.current.value})
        }
    }
    const getHighlightedText = (text) => {
        const parts = text.split(new RegExp(`(${inputRef.current.value})`, 'gi'));
        if(parts.length > 1)
        {
            return <span> { parts.map((part, i) => 
                <span key={i} style={part.toLowerCase() === inputRef.current.value.toLowerCase() ? { fontWeight: 'bold', color :'#d2042d' } : {} }>
                    { part }
                </span>)
            } </span>;
        }
        return text
    }
    return (
        <div onBlur={blurEventHandler} onFocus={() => setShowResults(true)} className={styles.selectInput}>
            <label onClick={(event) =>  event.stopPropagation()}>{label}</label>
            <input maxLength="25" type="text" placeholder={`Click for ${label}`} ref={inputRef} onChange={handleFilterItems} required={isRequired}/> 
            {(showResults) ? <ul className={styles.resultsBox}>{(shownItems.length > 0) ? shownItems.map(item => <li onMouseDown={handleSearchItemClick} className={styles.searchElement} id={item.id} name={item.Name} key={item.id}>{getHighlightedText(item.Name)}</li>) : <li>No Results</li>}</ul> : null}
        </div>
    )
}

export default SelectInput;