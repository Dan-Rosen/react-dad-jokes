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
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map((j) => j.text))
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes() {
        try {
            let jokes = []
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get('https://icanhazdadjoke.com/', {
                    headers: { accept: 'application/json' }
                })
                let newJoke = res.data.joke
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({ id: uuid(), text: newJoke, votes: 0 })
                }
            }
            this.setState(
                (st) => ({
                    jokes: [...st.jokes, ...jokes],
                    loading: false
                }),
                () =>
                    window.localStorage.setItem(
                        'jokes',
                        JSON.stringify(this.state.jokes)
                    )
            )
        } catch (err) {
            alert(err)
            this.setState({ loading: false })
        }
    }

    handleVote(id, delta) {
        this.setState(
            (st) => ({
                jokes: st.jokes.map((j) =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j
                )
            }),
            () =>
                window.localStorage.setItem(
                    'jokes',
                    JSON.stringify(this.state.jokes)
                )
        )
    }

    handleClick() {
        this.setState({ loading: true }, this.getJokes)
    }

    render() {
        if (this.state.loading) {
            return (
                <div className={styles.JokeListSpinner}>
                    <i className='far fa-8x fa-laugh fa-spin'></i>
                    <h1 className={styles.JokeListTitle}>Loading...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
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
                    <button
                        className={styles.JokeListGetMore}
                        onClick={this.handleClick}
                    >
                        Fetch Jokes
                    </button>
                </div>

                <div className={styles.JokeListJokes}>
                    {jokes.map((j) => (
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
