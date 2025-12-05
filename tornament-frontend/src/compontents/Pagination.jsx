import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];

    // Generar array de números de página
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Mostrar solo algunas páginas si hay muchas
    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;

        if (currentPage <= 3) {
            return [...pages.slice(0, 4), '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', ...pages.slice(totalPages - 4)];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ←
            </button>

            {visiblePages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className={styles.pageInfo}>
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                →
            </button>
        </div>
    );
}

export default Pagination;
