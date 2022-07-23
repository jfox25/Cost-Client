import styles from "./Table.module.css"

const PaginationControls = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={styles.pagination}>
                <li>Pages :</li>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button className={(currentPage === number) ? styles.active : null} onClick={() => paginate(number)} href='!#'>
                        {number}
                    </button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default PaginationControls;