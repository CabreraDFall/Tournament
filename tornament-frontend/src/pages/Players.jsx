import { useState } from "react";
import styles from "./Players.module.css";
import Pagination from "../compontents/Pagination";

// Datos de ejemplo - luego puedes conectar esto a tu API
const playersData = [
    { id: 1, name: "Carlos Martínez", wins: 15, losses: 3, status: "Activo" },
    { id: 2, name: "Ana García", wins: 14, losses: 4, status: "Activo" },
    { id: 3, name: "Luis Rodríguez", wins: 12, losses: 6, status: "Activo" },
    { id: 4, name: "María López", wins: 11, losses: 7, status: "Activo" },
    { id: 5, name: "Pedro Sánchez", wins: 10, losses: 8, status: "Activo" },
    { id: 6, name: "Laura Fernández", wins: 9, losses: 9, status: "Activo" },
    { id: 7, name: "Jorge Ramírez", wins: 7, losses: 11, status: "Activo" },
    { id: 8, name: "Sofia Torres", wins: 6, losses: 12, status: "Activo" },
    { id: 9, name: "Diego Cruz", wins: 8, losses: 10, status: "Activo" },
    { id: 10, name: "Elena Morales", wins: 5, losses: 13, status: "Activo" },
    { id: 11, name: "Miguel Ángel", wins: 9, losses: 9, status: "Activo" },
    { id: 12, name: "Isabel Ramos", wins: 7, losses: 11, status: "Activo" },
    { id: 13, name: "Roberto Silva", wins: 6, losses: 12, status: "Activo" },
    { id: 14, name: "Patricia Vega", wins: 8, losses: 10, status: "Activo" },
    { id: 15, name: "Fernando Ortiz", wins: 10, losses: 8, status: "Activo" },
    { id: 16, name: "Gabriela Castro", wins: 5, losses: 13, status: "Activo" },
    { id: 17, name: "Andrés Herrera", wins: 7, losses: 11, status: "Activo" },
    { id: 18, name: "Rosa Moreno", wins: 9, losses: 9, status: "Activo" },
    { id: 19, name: "Manuel Gómez", wins: 6, losses: 12, status: "Activo" },
    { id: 20, name: "Carmen Diaz", wins: 8, losses: 10, status: "Activo" },
];

function PlayerCard({ player }) {
    const { name, wins, losses, status } = player;
    const gamesPlayed = wins + losses;
    const winPercentage = gamesPlayed > 0 ? ((wins / gamesPlayed) * 100).toFixed(0) : 0;
    const playerInitial = name.charAt(0).toUpperCase();

    return (
        <div className={styles.playerCard}>
            <div className={styles.playerHeader}>
                <div className={styles.playerAvatar}>{playerInitial}</div>
                <div className={styles.playerInfo}>
                    <div className={styles.playerName}>{name}</div>
                    <div className={styles.playerStatus}>{status}</div>
                </div>
            </div>

            <div className={styles.playerStats}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{wins}</span>
                    <span className={styles.statLabel}>Victorias</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{losses}</span>
                    <span className={styles.statLabel}>Derrotas</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{winPercentage}%</span>
                    <span className={styles.statLabel}>Win Rate</span>
                </div>
            </div>
        </div>
    );
}

function CreateMatchModal({ isOpen, onClose, players }) {
    // Obtener fecha actual en formato YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [score1, setScore1] = useState("");
    const [score2, setScore2] = useState("");
    const [matchDate, setMatchDate] = useState(getTodayDate());

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!player1 || !player2) {
            alert("Por favor selecciona ambos jugadores");
            return;
        }

        if (player1 === player2) {
            alert("No puedes seleccionar el mismo jugador dos veces");
            return;
        }

        if (!score1 || !score2) {
            alert("Por favor ingresa los puntos de ambos jugadores");
            return;
        }

        if (parseInt(score1) < 0 || parseInt(score2) < 0) {
            alert("Los puntos no pueden ser negativos");
            return;
        }

        // Aquí puedes agregar la lógica para crear el match
        const matchData = {
            player1,
            player2,
            score1: parseInt(score1),
            score2: parseInt(score2),
            date: matchDate,
            winner: parseInt(score1) > parseInt(score2) ? player1 : player2
        };

        console.log("Match creado:", matchData);
        alert(`Match registrado:\n${player1}: ${score1} pts\n${player2}: ${score2} pts\nFecha: ${matchDate}\n\nGanador: ${matchData.winner}`);

        // Resetear el formulario
        setPlayer1("");
        setPlayer2("");
        setScore1("");
        setScore2("");
        setMatchDate(getTodayDate());
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Registrar Match</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Jugador 1 y su score en la misma línea */}
                    <div className={styles.playerRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="player1">
                                Jugador 1
                            </label>
                            <select
                                id="player1"
                                className={styles.select}
                                value={player1}
                                onChange={(e) => setPlayer1(e.target.value)}
                            >
                                <option value="">Selecciona un jugador</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.name}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="score1">
                                Puntos
                            </label>
                            <input
                                type="number"
                                id="score1"
                                className={styles.select}
                                value={score1}
                                onChange={(e) => setScore1(e.target.value)}
                                placeholder="Ej: 25"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Jugador 2 y su score en la misma línea */}
                    <div className={styles.playerRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="player2">
                                Jugador 2
                            </label>
                            <select
                                id="player2"
                                className={styles.select}
                                value={player2}
                                onChange={(e) => setPlayer2(e.target.value)}
                            >
                                <option value="">Selecciona un jugador</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.name}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="score2">
                                Puntos
                            </label>
                            <input
                                type="number"
                                id="score2"
                                className={styles.select}
                                value={score2}
                                onChange={(e) => setScore2(e.target.value)}
                                placeholder="Ej: 18"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="matchDate">
                            Fecha del Match
                        </label>
                        <input
                            type="date"
                            id="matchDate"
                            className={styles.select}
                            value={matchDate}
                            onChange={(e) => setMatchDate(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Registrar Match
                    </button>
                </form>
            </div>
        </div>
    );
}

function Players() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        <div className={styles.playersContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Jugadores Inscritos</h1>
                <button className={styles.createMatchBtn} onClick={openModal}>
                    + Crear Match
                </button>
            </div>

            <div className={styles.playersGrid}>
                {currentData.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>

            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <CreateMatchModal
                isOpen={isModalOpen}
                onClose={closeModal}
                players={playersData}
            />
        </div>
    );
}

export default Players;
