import React, { Component } from 'react'
import axios from 'axios'
import styles from './JokeList.module.css'

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)

        this.state = {
            jokes: []
        }
    }

    async componentDidMount() {
        let jokes = []
        while (jokes.length < this.props.numJokesToGet) {
            let res = axios.get('https://icanhazdadjoke.com/', {
                headers: { accept: 'application/json' }
            })
            jokes.push((await res).data.joke)
        }
        this.setState({ jokes: jokes })
    }

    render() {
        return (
            <div className={styles.JokeList}>
                <div className={styles.JokeListSidebar}>
                    <h1 className={styles.JokeListTitle}>
                        <span>Dad</span> Jokes
                    </h1>
                    <img
                        src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
                        alt='crying laughing emoji'
                    />
                    <button className={styles.JokeListGetMore}>
                        New Jokes
                    </button>
                </div>

                <div className={styles.JokeListJokes}>
                    {this.state.jokes.map((j) => (
                        <div>{j}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeList
