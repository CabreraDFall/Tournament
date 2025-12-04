import styles from "./Vs.module.css";
import Crown from "../assets/icon/Crown";


function SinglePlayer({ player, points, className, isWinner }) {
  return (
    <div className={`${styles.player} ${className || ""} ${isWinner || ""}`}>
      <div className={styles.score}>{points}</div>

      <div className={styles.playerInfo}>
        <p className={styles.icon}>{player[0]}</p>
        <p>{player}</p>
      </div>
        <div className={styles.iconWrapper}>
    
      <div className={styles.winnerIcon}>{isWinner && <Crown />}</div>
    </div>
    </div>
  );
}

function Vs({ player1 = "Abraham C.", player2 = "Jose B." }) {
  return (
    <div className={styles.vsWrapper}>
      <SinglePlayer player={player1} points={2} className={styles.right} isWinner={styles.isWinner}/>
      <SinglePlayer player={player2} points={0}  />
    </div>
  );
}

export default Vs;
