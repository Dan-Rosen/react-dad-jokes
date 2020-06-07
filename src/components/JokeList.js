import React, { Component } from 'react'
import axios from 'axios'
import { uuid } from 'uuidv4'
import Joke from './Joke'
import styles from './JokeList.module.css'

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props) {
        super(props)

        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
        }
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes() {
        let jokes = []
        while (jokes.length < this.props.numJokesToGet) {
            let res = axios.get('https://icanhazdadjoke.com/', {
                headers: { accept: 'application/json' }
            })
            jokes.push({ id: uuid(), text: (await res).data.joke, votes: 0 })
        }
        this.setState({ jokes: jokes })
        window.localStorage.setItem('jokes', JSON.stringify(jokes))
    }

    handleVote(id, delta) {
        this.setState((st) => ({
            jokes: st.jokes.map((j) =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        }))
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
                        <Joke
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeList
