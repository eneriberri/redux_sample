import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

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

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Spirited Away': 3,
            'Princess Mononoke': 2
          })
        }),
        entries: List.of('Totoro')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Totoro', 'Spirited Away')
        }),
        entries: List()
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Spirited Away': 2,
            'Princess Mononoke': 2
          })
        }),
        entries: List.of('Totoro')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Totoro', 'Spirited Away')
        }),
        entries: List.of('Princess Mononoke')
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Princess Mononoke');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Princess Mononoke': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Spirited Away': 2,
            'Princess Mononoke': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Princess Mononoke');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Spirited Away': 2,
            'Princess Mononoke': 3
          })
        }),
        entries: List()
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Spirited Away', 'Princess Mononoke'),
          tally: Map({
            'Spirited Away': 4,
            'Princess Mononoke': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Spirited Away'
      }));
    });

  });

});
