
function Team(props) {
    let shotPercentageDiv
    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <h2>Shot %: {shotPercentage}%</h2>
            </div>
        )


    }
    return (
        <div className="Team" >

            <h1>{props.name}</h1>

            <div className="symbol">
                <img width={350} src={props.logo} alt={props.name} />
            </div>

            <div>
                <h1>Shots taken by {props.name}: {props.stats.shots}</h1>

            </div>

            <div>
                <h1>Scored {props.stats.score} by {props.name}</h1>
            </div>

            {shotPercentageDiv}

            <button onClick={props.shotHandler}>Shoot</button>
        </div>
    )


}

function ScoreBoard(props) {
    return (
        <div className="ScoreBoard">
            <div className="teamStats">
                <h3>HOME</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>

            <h3>SCOREBOARD</h3>

            <div className="teamStats">
                <h3>VISITOR</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>
        </div>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }

        this.shotSound = new Audio("./audio/Swish.mp3")
        this.scoreSound = new Audio("./audio/audi+1.mp3")
    }

    shoot = (team) => {

        const teamStatsKey = `${team}TeamStats`


        let score = this.state[teamStatsKey].score


        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1
            setTimeout(() => {
                this.scoreSound.play()
            }, 100)

        }

        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }
    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))

    }

    render() {
        return (
            <div className="Game" >
                <ScoreBoard
                    homeTeamStats={this.state.homeTeamStats}
                    visitingTeamStats={this.state.visitingTeamStats}
                />
                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">
                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}

                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong>{this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>


                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}

                    />
                </div>

            </div>
        )
    }
}

function App(props) {

    const kingJ = {
        name: "King James",
        logoSrc: "./assets/king-james.jpg"
    }

    const kingG = {
        name: "King George",
        logoSrc: "./assets/king-george.jpg"
    }

    const TheGeorge = {
        name: "George Washington",
        logoSrc: "./assets/Its_George.jpg"
    }

    const Abe = {
        name: "Abraham Lincoln",
        logoSrc: "./assets/Abe_Lincoln.jpg"
    }

    return (
        <div className="App">
            <Game
                venue="The Kings Throne"
                homeTeam={kingJ}
                visitingTeam={kingG}
            />
            <Game
                venue="Fight Island"
                homeTeam={TheGeorge}
                visitingTeam={Abe}
            />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));