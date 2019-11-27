import React, { Component } from 'react';
import PushedCard from './Card';
import './pushedcards.scss';

type PushedCardsProps = {
    users: string[]
}

export default class PushedCards extends Component <PushedCardsProps> {
    static defaultProps = {
        users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user4', 'user5']
    };

    render() {
        return this.props.users.map((item:string, index:number) => {
            return < PushedCard key={index} />
        })
    }
}