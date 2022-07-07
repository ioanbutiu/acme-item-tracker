import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, users, deleteThing, increment, updateThing }) => {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {things.map((thing) => {
          const user = users.find((user) => user.id === thing.userId) || {};
          return (
            <li key={thing.id}>
              {thing.name}
              &nbsp;
              <small>({thing.ranking})</small>
              &nbsp;
              <small>owned by {user.name || 'nobody'}</small>
              <button onClick={() => increment(thing, -1)}>-</button>
              &nbsp;
              <button onClick={() => increment(thing, 1)}>+</button>
              &nbsp;
              <button onClick={() => deleteThing(thing)}>Delete</button>
              <div>
                <select
                  defaultValue={thing.userId}
                  onChange={(ev) => updateThing(thing, ev.target.value)}
                >
                  <option value="">-- nobody --</option>
                  {users.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </li>
          );
        })}
      </ul>
      <ThingForm />
    </div>
  );
};

// export default connect(
//   (state) => {
//     return;
//     {
//       things: state.things;
//     }
//   },
//   (dispatch) => {
//     return {
//       deleteThing: async (thing) => {
//         await axios.delete(`/api/things/${thing.id}`);
//         console.log(thing);
//         dispatch({ type: 'DELETE_THING', thing });
//       },
//     };
//   }
// )(Things);

const mapStateToProps = (state) => {
  return {
    things: state.things,
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteThing: async (thing) => {
      await axios.delete(`/api/things/${thing.id}`);
      console.log(thing);
      dispatch({ type: 'DELETE_THING', thing });
    },
    increment: async (thing, direction) => {
      thing = { ...thing, ranking: thing.ranking + direction };
      thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
      dispatch({ type: 'UPDATE_THING', thing });
      console.log(thing);
    },
    updateThing: async (thing, userId) => {
      thing = { ...thing, userId: userId * 1 };
      thing = (await axios.put(`api/things/${thing.id}`, thing)).data;
      dispatch({ type: 'UPDATE_THING', thing });
      console.log(thing, userId);
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Things);
