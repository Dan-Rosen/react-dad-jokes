import React, { Component } from 'react'
import styles from './Joke.module.css'

class Joke extends Component {
    render() {
        return (
            <div className={styles.Joke}>
                <div className={styles.JokeButtons}>
                    <i
                        className={`fas fa-arrow-up ${styles.JokeVoteArrow}`}
                        onClick={this.props.upvote}
                    ></i>
                    <span className={styles.JokeVotes}>{this.props.votes}</span>
                    <i
                        className={`fas fa-arrow-down ${styles.JokeVoteArrow}`}
                        onClick={this.props.downvote}
                    ></i>
                </div>
                <div className={styles.JokeText}>{this.props.text}</div>
                <div className={styles.JokeSmiley}>
                    <i
                        class='em em-rolling_on_the_floor_laughing'
                        aria-label='ROLLING ON THE FLOOR LAUGHING'
                    ></i>
                </div>
            </div>
        )
    }
}

export default Joke
