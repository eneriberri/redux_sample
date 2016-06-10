import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: fromJS(['Spirited Away'])};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Spirited Away']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Spirited Away', 'Princess Mononoke']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Spirited Away', 'Princess Mononoke']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Spirited Away', 'Princess Mononoke']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Spirited Away'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Spirited Away', 'Princess Mononoke'],
        tally: {'Spirited Away': 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: fromJS(['Princess Mononoke'])};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Princess Mononoke']
    }));
  });

});
