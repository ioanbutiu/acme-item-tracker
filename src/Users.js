import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Users = ({ users, createUser, deleteUser, things }) => {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={createUser}>+</button>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name}
              <button onClick={() => deleteUser(user)}>X</button>
              <ul>
                {things
                  .filter((thing) => thing.userId === user.id)
                  .map((thing) => {
                    return (
                      <li key={thing.id}>
                        {thing.name} ({thing.ranking})
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createUser: async () => {
      const user = (await axios.post('/api/users', { name: Math.random() }))
        .data;
      dispatch({ type: 'CREATE_USER', user });
      console.log(user);
    },
    deleteUser: async (user) => {
      await axios.delete(`/api/users/${user.id}`);
      console.log(user);
      dispatch({ type: 'DELETE_USER', user });
    },
  };
};
export default connect(mapStateToProps, mapDispatch)(Users);
