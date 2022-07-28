import { useState, useEffect, useRef } from 'react'
import styles from './SelectInput.module.css'

const RequiredSelectInput = ({label, items, onSubmit, isRequired}) => {
    const [shownItems, setShownItems] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [value, setValue] = useState({id: 0, name: ""});
    const inputRef = useRef('')

    const handleFilterItems = () => {
        const filteredItems = items.filter(item => item.Name.toLowerCase().includes(inputRef.current.value.toLowerCase()))
        setShownItems(filteredItems);
        if(inputRef.current.value !== value.name)
        {
            setValue({id: 0, name: ""});
        }
    }
    const handleSearchItemClick = (event) => {
        event.stopPropagation();
        setValue({id : event.currentTarget.id, name: event.currentTarget.getAttribute("name")})
    }
    useEffect(() => {
        if(value.id === 0)
        {
            setIsValid(false)
            onSubmit(value)
        }else {
            setIsValid(true)
            onSubmit(value)
        }
    }, [value]);
    useEffect(() => {
        if(!isValid){
            inputRef.current.value = ""
        }else {
            inputRef.current.value = value.name
        }
    }, [isValid]);
    useEffect(() => {
        if(showResults === true) {
            handleFilterItems();
        } else {
            if(inputRef.current.value !== "" && !isValid)
            {
                inputRef.current.value = ""
            }
        }
    }, [showResults]);
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
        <div onBlur={() => setShowResults(false)} onFocus={() => setShowResults(true)} className={styles.selectInput}>
            <label className={(!isValid) ? styles.inValid : styles.Valid} onClick={(event) =>  event.stopPropagation()}>{label}</label>
            <input maxLength="25" placeholder={`Click for ${label}`} ref={inputRef} onChange={handleFilterItems} type="text" required={isRequired}/>
            {(showResults) ? <ul className={styles.resultsBox}>{(shownItems.length > 0) ? shownItems.map(item => <li onMouseDown={handleSearchItemClick} className={styles.searchElement} id={item.id} name={item.Name} key={item.id}>{getHighlightedText(item.Name)}</li>) : <li>No Results</li>}</ul> : null}
        </div>
    )
}

export default RequiredSelectInput;