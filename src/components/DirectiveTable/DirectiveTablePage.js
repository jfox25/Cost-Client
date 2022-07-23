import styles from './DirectiveTable.module.css'

const DirectiveTablePage = ({ directive, description }) => {
    return (
        <div className={styles.directiveTablePage}>
            <h1>{directive?.Name}</h1>
            <p className={styles.description}>{description}</p>
            <p className={styles.directiveExpenseCount}>There are <span className={styles.accentColor}>{directive?.ExpenseCount}</span> expenses in this directive</p>
            <div>
                <p className={styles.label}>Total Cost of {directive?.Name} :</p>
                <p className={styles.totalCost}>${directive?.TotalCost}</p>
            </div>
        </div>
    )
}

export default DirectiveTablePage;