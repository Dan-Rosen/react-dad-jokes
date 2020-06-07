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
            <div>
                <h1 className={styles.JokeList}>Dad Jokes</h1>
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
