import { useQuery } from "@apollo/client";
import React from "react";
import { useAuthContext } from "../context/auth";
import { GET_POSTS } from "../graphql/queries";
import avatar from "./assets/avatar.png";

const Users = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { user } = useAuthContext();

  const users = data.getPosts.map((post: any) => post.username);
  const uniqueUsers = [...new Set(users)];

  const otherUsers = uniqueUsers.filter(
    (uniqueUser) => uniqueUser !== user?.username
  );

  return (
    <>
      {!loading && !error && (
        <div className="user-list">
          <h2>Who to follow...</h2>
          {otherUsers.map((user: any, i) => (
            <div className="user-list__row">
              <div className="user-list__info">
                <img className="" src={avatar} alt="avatar" />
                <p key={i}>{user}</p>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Users;
