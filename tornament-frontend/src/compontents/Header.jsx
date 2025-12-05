import { NavLink, useLocation } from "react-router";
import styles from "./Header.module.css";

function Header() {
    const location = useLocation();

    // Mapear rutas a títulos
    const getTitleFromPath = (pathname) => {
        const titles = {
            '/': 'Ranking',
            '/matches': 'Matches',
            '/players': 'Players',
            '/statistics': 'Estadísticas'
        };
        return titles[pathname] || 'Tournament';
    };

    const currentTitle = getTitleFromPath(location.pathname);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>{currentTitle}</h1>

                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        <span className={styles.label}>Ranking</span>
                    </NavLink>

                    <NavLink
                        to="/matches"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        <span className={styles.label}>Matches</span>
                    </NavLink>

                    <NavLink
                        to="/players"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        <span className={styles.label}>Players</span>
                    </NavLink>

                    <NavLink
                        to="/statistics"
                        className={({ isActive }) =>
                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                        }
                    >
                        <span className={styles.label}>Stats</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;