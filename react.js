
/*function App(props) {
    return (
        <div className="App">
            <h1>Lets Begin!</h1>
            <Team />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
*/

class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shot: 0,
            score: 0,
        }

        this.shotSound = new Audio("./audio/Swish.mp3")
        this.scoreSound = new Audio("./audio/audi+1.mp3")
    }

    shotsTakenHandler = () => {
        //console.log('why dont you displayyyyyyyyyyyyyyyyyyyyyy!')
        let score = this.state.score


        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1
            setTimeout(() => {
                this.scoreSound.play()
            }, 100)

        }

        this.setState((state, props) => ({
            shot: state.shot + 1,
            score
        }))
    }

    render() {
        let shotPercentageDiv
        if (this.state.shot) {
            const shotPercentage = Math.round((this.state.score / this.state.shot) * 100)
            shotPercentageDiv = (
                <div>
                    <h2>Shot %: {shotPercentage}%</h2>
                </div>
            )


        }
        return (
            <div className="Team" >

                <h1>{this.props.name}</h1>

                <div className="symbol">
                    <img width={350} src={this.props.logo} alt={this.props.name} />
                </div>

                <div>
                    <h1>Shots taken by {this.props.name}: {this.state.shot}</h1>

                </div>

                <div>
                    <h1>Scored {this.state.score} by {this.props.name}</h1>
                </div>

                {shotPercentageDiv}

                <button onClick={this.shotsTakenHandler}>Shoot</button>
            </div>
        )
    };

}

function Game(props) {
    return (
        <div className="Game">
            <h1>Welcome to {props.venue}</h1>
            <Team
                name={props.homeTeam.name}
                logo={props.homeTeam.logoSrc}
            />
            <Team
                name={props.visitingTeam.name}
                logo={props.visitingTeam.logoSrc}
            />
        </div>
    )
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