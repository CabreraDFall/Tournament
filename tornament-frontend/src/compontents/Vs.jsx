import styles from "./Vs.module.css";
import Crown from "../assets/icon/Crown";


function SinglePlayer({ player, points, right = false, isWinner = false }) {
  return (
    <div className={`${styles.player} ${right ? styles.right : ""} ${isWinner ? styles.isWinner : ""}`}>
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

function Vs({ scores }) {

  return (
    <div className={styles.vsWrapper}>
      <SinglePlayer
        player={scores[0].player}
        points={scores[0].points}
        isWinner={scores[0].points > scores[1].points}
        right={true}
      />
      <SinglePlayer
        player={scores[1].player}
        points={scores[1].points}
        isWinner={scores[1].points > scores[0].points}

      />
    </div>
  );
}

export default Vs;
