import React, { Component } from 'react'
import styles from './Joke.module.css'

class Joke extends Component {
    render() {
        return (
            <div className={styles.Joke}>
                <div className={styles.JokeButtons}>
                    <i
                        className='fas fa-arrow-up'
                        onClick={this.props.upvote}
                    ></i>
                    <span>{this.props.votes}</span>
                    <i
                        className='fas fa-arrow-down'
                        onClick={this.props.downvote}
                    ></i>
                </div>
                <div className={styles.JokeText}>{this.props.text}</div>
            </div>
        )
    }
}

export default Joke
