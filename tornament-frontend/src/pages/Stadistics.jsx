import { useState } from "react";
import styles from "./Stadistics.module.css";
import Pagination from "../compontents/Pagination";

// Datos de ejemplo - luego puedes conectar esto a tu API
const playersData = [
    { id: 1, name: "Carlos Martínez", wins: 15, losses: 3 },
    { id: 2, name: "Ana García", wins: 14, losses: 4 },
    { id: 3, name: "Luis Rodríguez", wins: 12, losses: 6 },
    { id: 4, name: "María López", wins: 11, losses: 7 },
    { id: 5, name: "Pedro Sánchez", wins: 10, losses: 8 },
    { id: 6, name: "Laura Fernández", wins: 9, losses: 9 },
    { id: 7, name: "Jorge Ramírez", wins: 7, losses: 11 },
    { id: 8, name: "Sofia Torres", wins: 6, losses: 12 },
    { id: 9, name: "Diego Cruz", wins: 8, losses: 10 },
    { id: 10, name: "Elena Morales", wins: 5, losses: 13 },
    { id: 11, name: "Miguel Ángel", wins: 9, losses: 9 },
    { id: 12, name: "Isabel Ramos", wins: 7, losses: 11 },
    { id: 13, name: "Roberto Silva", wins: 6, losses: 12 },
    { id: 14, name: "Patricia Vega", wins: 8, losses: 10 },
    { id: 15, name: "Fernando Ortiz", wins: 10, losses: 8 },
    { id: 16, name: "Gabriela Castro", wins: 5, losses: 13 },
    { id: 17, name: "Andrés Herrera", wins: 7, losses: 11 },
    { id: 18, name: "Rosa Moreno", wins: 9, losses: 9 },
    { id: 19, name: "Manuel Gómez", wins: 6, losses: 12 },
    { id: 20, name: "Carmen Diaz", wins: 8, losses: 10 },
];

function PlayerRow({ position, player }) {
    const { name, wins, losses } = player;
    const gamesPlayed = wins + losses;
    const winPercentage = gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(1) : "0.0";
    const playerInitial = name.charAt(0).toUpperCase();

    return (
        <tr>
            <td>
                <div className={styles.position}>{position}</div>
            </td>
            <td>
                <div className={styles.playerCell}>
                    <div className={styles.playerIcon}>{playerInitial}</div>
                    <span className={styles.playerName}>{name}</span>
                </div>
            </td>
            <td>
                <span className={styles.wins}>{wins}</span>
                <span>:</span>
                <span className={styles.losses}>{losses}</span>
            </td>
            <td>
                <span className={styles.pct}>{winPercentage}%</span>
            </td>
            <td>
                <span className={styles.gamesPlayed}>{gamesPlayed}</span>
            </td>
        </tr>
    );
}

function Stadistics() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular el total de páginas
    const totalPages = Math.ceil(playersData.length / itemsPerPage);

    // Obtener los datos para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = playersData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.rankingContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th>#</th>
                            <th>Jugador</th>
                            <th>W:L</th>
                            <th>PCT</th>
                            <th>GP</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {currentData.map((player, index) => {
                            const actualPosition = startIndex + index + 1;
                            return <PlayerRow key={player.id} position={actualPosition} player={player} />;
                        })}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Stadistics;
