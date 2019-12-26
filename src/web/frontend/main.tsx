import React from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage/MainPage';
import Lobby from './components/Lobby/Lobby';
import GamePage from "./components/GamePage/gamepage";
import UserProvider from './components/UserProvider/UserProvider';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./sass/main.scss";
import io from "socket.io-client"
const App = () => {
    const socket = io(process.env.SERVER_URL+':'+process.env.SERVER_PORT);
    return (
        <UserProvider>
            <Router>
                <Switch>
                    <Route path="/game">
                        <UserProvider.context.Consumer>{context => (
                            <GamePage socket={ socket } user={ context.user }/>
                        )}</UserProvider.context.Consumer>
                    </Route>
                    <Route path="/lobby">
                        <Lobby />
                    </Route>
                    <Route path="/">
                        <MainPage />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById("root"),
);
