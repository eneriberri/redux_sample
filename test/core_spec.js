import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Spirited Away', 'Princess Mononoke');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Spirited Away', 'Princess Mononoke')
      }));
    });
  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Spirited Away', 'Princess Mononoke', 'Totoro')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('Totoro'),
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke')
        })
      }));
    });

  });
  
});
