import { useState } from "react";
import styles from "./Ranking.module.css";
import Pagination from "../compontents/Pagination";

// Datos de ejemplo - luego puedes conectar esto a tu API
const rankingData = [
    { id: 1, name: "Alex Chen", score: 8, avatar: "AC" },
    { id: 2, name: "Maria Garcia", score: 7, avatar: "MG" },
    { id: 3, name: "David Lee", score: 6, avatar: "DL" },
    { id: 4, name: "Sarah Kim", score: 5, avatar: "SK" },
    { id: 5, name: "Janes Kox", score: 4, avatar: "JK" },
    { id: 6, name: "Kara Coatal", score: 3, avatar: "KC" },
    { id: 7, name: "Miguel Torres", score: 2, avatar: "MT" },
    { id: 8, name: "Emma Wilson", score: 1, avatar: "EW" },
    { id: 9, name: "Luis Martín", score: 0, avatar: "LM" },
    { id: 10, name: "Ana Sánchez", score: 0, avatar: "AS" },
    { id: 11, name: "Carlos Ruiz", score: 0, avatar: "CR" },
    { id: 12, name: "Sofia Diaz", score: 0, avatar: "SD" },
    { id: 13, name: "Diego López", score: 0, avatar: "DL" },
    { id: 14, name: "Laura Pérez", score: 0, avatar: "LP" },
    { id: 15, name: "Jorge Gómez", score: 0, avatar: "JG" },
    { id: 16, name: "Elena Castro", score: 0, avatar: "EC" },
    { id: 17, name: "Pablo Moreno", score: 0, avatar: "PM" },
    { id: 18, name: "Isabel Ramos", score: 0, avatar: "IR" },
    { id: 19, name: "Manuel Silva", score: 0, avatar: "MS" },
    { id: 20, name: "Carmen Vega", score: 0, avatar: "CV" },
    { id: 21, name: "Andrés Herrera", score: 0, avatar: "AH" },
    { id: 22, name: "Rosa Ortiz", score: 0, avatar: "RO" },
];

function PodiumCard({ position, player, className }) {
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
    const labels = { 1: "1st Place", 2: "2nd Place", 3: "3rd Place" };
    const positionClass = { 1: "first", 2: "second", 3: "third" };

    return (
        <div className={`${styles.podiumCard} ${styles[positionClass[position]]}`}>
            <div className={styles.medalIcon}>{medals[position]}</div>
            <div className={styles.placeLabel}>{labels[position]}</div>
            <div className={`${styles.placeNumber} ${styles[positionClass[position]]}`}>
                {position}
            </div>
            <div className={styles.playerAvatar}>{player.avatar}</div>
            <div className={styles.playerName}>{player.name}</div>
            <div className={styles.scoreLabel}>Score</div>
            <div className={styles.playerScore}>{player.score.toLocaleString()} pts</div>
        </div>
    );
}

function PlayerCard({ position, player }) {
    return (
        <div className={styles.playerCard}>
            <div className={styles.position}>{position}.</div>
            <div className={styles.avatar}>{player.avatar}</div>
            <div className={styles.playerInfo}>
                <div className={styles.name}>{player.name}</div>
            </div>
            <div className={styles.score}>{player.score.toLocaleString()} pts</div>
        </div>
    );
}

function Ranking() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular el total de páginas
    const totalPages = Math.ceil(rankingData.length / itemsPerPage);

    // Obtener los datos para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = rankingData.slice(startIndex, endIndex);

    // Separar top 3 y el resto solo en la primera página
    const isFirstPage = currentPage === 1;
    const top3 = isFirstPage ? currentData.slice(0, 3) : [];
    const rest = isFirstPage ? currentData.slice(3) : currentData;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.rankingContainer}>
            {/* Podio del Top 3 - solo en la primera página */}
            {isFirstPage && top3.length === 3 && (
                <div className={styles.podiumContainer}>
                    <PodiumCard position={2} player={top3[1]} />
                    <PodiumCard position={1} player={top3[0]} />
                    <PodiumCard position={3} player={top3[2]} />
                </div>
            )}

            {/* Resto de jugadores */}
            <div className={styles.restList}>
                {rest.map((player, index) => {
                    const actualPosition = startIndex + (isFirstPage ? 4 : 1) + index;
                    return <PlayerCard key={player.id} position={actualPosition} player={player} />;
                })}
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

export default Ranking;
