import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CreateRoomPopup from '../CreateRoomPopup/CreateRoomPopup';
import UserProvider from '../UserProvider/UserProvider';
import './menu.scss';

type MenuState = {
    showCreateRoomPopup: boolean
};

export default class Menu extends Component<any, MenuState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showCreateRoomPopup: false
        };
    }

    handleCreateRoomClick = () => this.setState({ showCreateRoomPopup: true });

    toggleCreateRoomPopup = (e: any) => {
        if (e.target.click && !e.target.closest('.ModalWindow') && !e.target.closest('.MuiPopover-root')) {
            this.setState({ showCreateRoomPopup: false });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className='menu'>
                    <Link to='/game'><button className='button'>Play</button></Link>
                    <ul className='links'>
                        <li><Link to='/lobby'>Join the game</Link></li>
                        <UserProvider.context.Consumer>
                        {context => (
                        <li className={!context.user || !context.user.authenticated ? 'no' : '' }><a href='#' onClick={this.handleCreateRoomClick}>Create room</a></li>
                        )}
                        </UserProvider.context.Consumer>
                    </ul>
                </div>
                { this.state.showCreateRoomPopup ? (
                    <div onClick={this.toggleCreateRoomPopup}>
                        <CreateRoomPopup />
                    </div>
                ) : '' }
            </React.Fragment>
        );
    }
};