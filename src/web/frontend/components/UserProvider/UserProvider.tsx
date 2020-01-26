import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { DixitUser } from "../../../backend/entities/User";
import { Player } from "../../../backend/entities/Player";
import { JwtPayload } from '../../../backend/authentication/helpers';
import axios from "axios";
import cookie from "cookie";

export type UserData = {
  authenticated: boolean,
  nickname: DixitUser['nickname'],
  user_id?: DixitUser['user_id'],
  player_id: Player['player_id'],
  is_banned: boolean,
  profile_picture: DixitUser['profile_picture']
}

export type ContextData = {
  user: UserData | null,
  updateContext: () => void
}

let defaultUser: JwtPayload | null = null;
let token = localStorage.getItem('jwt_token');

if(token) {
  defaultUser = jwt_decode(token);
}

const contextProps: ContextData = {
  user: defaultUser,
  updateContext: () => {}
}

const context = createContext(contextProps);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserData | null>(defaultUser);

  function updateContext() {
    let cookies = cookie.parse(document.cookie);
    
    if(cookies.oauth_jwt_token) {
      localStorage.setItem('jwt_token', cookies.oauth_jwt_token);
      document.cookie = "oauth_jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    token = localStorage.getItem('jwt_token');

    axios.post('/api/auth/user', null, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        const decoded: JwtPayload = jwt_decode(res.data.jwt_token);

        if(decoded === defaultUser) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return;
        }

        if (decoded.authenticated) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.jwt_token}`;
          localStorage.setItem('jwt_token', res.data.jwt_token);
        }
        setUser(decoded);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    updateContext();
  }, []);

  return (
    <context.Provider value={{user, updateContext}}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;