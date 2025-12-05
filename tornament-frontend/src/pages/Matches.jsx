import { useState } from "react";
import styles from "./Matches.module.css";
import Pagination from "../compontents/Pagination";

// Datos de ejemplo - luego puedes conectar esto a tu API
const matchesData = [
  { id: 1, player1: { name: "Alex Chen", score: 3, avatar: "AC" }, player2: { name: "David Lee", score: 1, avatar: "DL" } },
  { id: 2, player1: { name: "Maria Garcia", score: 2, avatar: "MG" }, player2: { name: "Sarah Kim", score: 3, avatar: "SK" } },
  { id: 3, player1: { name: "Carlos Martínez", score: 4, avatar: "CM" }, player2: { name: "Luis Rodríguez", score: 2, avatar: "LR" } },
  { id: 4, player1: { name: "Ana García", score: 1, avatar: "AG" }, player2: { name: "Pedro Sánchez", score: 2, avatar: "PS" } },
  { id: 5, player1: { name: "Sofia Torres", score: 3, avatar: "ST" }, player2: { name: "Jorge Ramírez", score: 2, avatar: "JR" } },
  { id: 6, player1: { name: "Emma Wilson", score: 4, avatar: "EW" }, player2: { name: "Miguel Torres", score: 1, avatar: "MT" } },
  { id: 7, player1: { name: "Laura Pérez", score: 2, avatar: "LP" }, player2: { name: "Diego López", score: 3, avatar: "DL" } },
  { id: 8, player1: { name: "Elena Castro", score: 3, avatar: "EC" }, player2: { name: "Pablo Moreno", score: 3, avatar: "PM" } },
  { id: 9, player1: { name: "Isabel Ramos", score: 4, avatar: "IR" }, player2: { name: "Manuel Silva", score: 2, avatar: "MS" } },
  { id: 10, player1: { name: "Carmen Vega", score: 1, avatar: "CV" }, player2: { name: "Andrés Herrera", score: 3, avatar: "AH" } },
  { id: 11, player1: { name: "Rosa Ortiz", score: 3, avatar: "RO" }, player2: { name: "Janes Kox", score: 2, avatar: "JK" } },
  { id: 12, player1: { name: "Kara Coatal", score: 2, avatar: "KC" }, player2: { name: "Luis Martín", score: 4, avatar: "LM" } },
  { id: 13, player1: { name: "Ana Sánchez", score: 3, avatar: "AS" }, player2: { name: "Carlos Ruiz", score: 1, avatar: "CR" } },
  { id: 14, player1: { name: "Sofia Diaz", score: 2, avatar: "SD" }, player2: { name: "Jorge Gómez", score: 2, avatar: "JG" } },
  { id: 15, player1: { name: "Alex Chen", score: 4, avatar: "AC" }, player2: { name: "Maria Garcia", score: 3, avatar: "MG" } },
];

function MatchCard({ match }) {
  const { player1, player2 } = match;
  const player1IsWinner = player1.score > player2.score;
  const player2IsWinner = player2.score > player1.score;

  return (
    <div className={styles.matchCard}>
      {/* Jugador 1 */}
      <div className={`${styles.player} ${player1IsWinner ? styles.winner : styles.loser}`}>
        {player1IsWinner && <div className={styles.crownIcon}>👑</div>}
        <div className={styles.playerAvatar}>{player1.avatar}</div>
        <div className={styles.playerInfo}>
          <p className={styles.playerName}>{player1.name}</p>
          <div className={styles.playerScore}>{player1.score}</div>
        </div>
      </div>

      {/* Jugador 2 */}
      <div className={`${styles.player} ${player2IsWinner ? styles.winner : styles.loser}`}>
        <div className={styles.playerInfo}>
          <p className={styles.playerName}>{player2.name}</p>
          <div className={styles.playerScore}>{player2.score}</div>
        </div>
        <div className={styles.playerAvatar}>{player2.avatar}</div>
        {player2IsWinner && <div className={styles.crownIcon}>👑</div>}
      </div>
    </div>
  );
}

function Matches() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular el total de páginas
  const totalPages = Math.ceil(matchesData.length / itemsPerPage);

  // Obtener los datos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = matchesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.matchesContainer}>
      <div className={styles.matchList}>
        {currentData.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
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

export default Matches;