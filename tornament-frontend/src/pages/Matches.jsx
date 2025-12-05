import Title from "../compontents/Title"
import Vs from "../compontents/Vs"

const SCORES = [
  [
    { "player": "player1", "points": 2, "isWinner": true },
    { "player": "player2", "points": 0, "isWinner": false }
  ],
  [
    { "player": "player3", "points": 1, "isWinner": false },
    { "player": "player4", "points": 3, "isWinner": true }
  ],
  [
    { "player": "player5", "points": 4, "isWinner": true },
    { "player": "player6", "points": 2, "isWinner": false }
  ],
  [
    { "player": "player7", "points": 0, "isWinner": false },
    { "player": "player8", "points": 1, "isWinner": true }
  ],
  [
    { "player": "player9", "points": 3, "isWinner": true },
    { "player": "player10", "points": 2, "isWinner": false }
  ]
]


function Matches() {
  return (
    <>
      <Title title={"Enfrentamientos"} />
      <div>
        {SCORES.map((match, index) => (
          <Vs key={index} scores={match} />
        ))}
      </div>

    </>
  )
}

export default Matches