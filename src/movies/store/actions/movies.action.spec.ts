import * as fromMovies from './movies.action';

describe('Movies Actions', () => {
  describe('LoadMovies Actions', () => {
    describe('LoadMovies', () => {
      it('should create an action', () => {
        const action = new fromMovies.LoadMovies();

        expect({ ...action }).toEqual({
          type: fromMovies.LOAD_MOVIES,
        });
      });
    });

    describe('LoadMoviesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromMovies.LoadMoviesFail(payload);

        expect({ ...action }).toEqual({
          type: fromMovies.LOAD_MOVIES_FAIL,
          payload,
        });
      });
    });

    describe('LoadMoviesSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            "id": 2,
            "key": "we-are-the-millers",
            "name": "We\"re the Millers",
            "description": "A veteran pot dealer creates a fake family as part of his plan to move a huge shipment of weed into the U.S. from Mexico.",
            "genres": ["adventure", "comedy", "crime"],
            "rate": "7.0",
            "length": "1hr 50mins",
            "img": "we-are-the-millers.jpg"
          },
          {
            "id": 3,
            "key": "straight-outta-compton",
            "name": "Straight Outta Compton",
            "description": "The group NWA emerges from the mean streets of Compton in Los Angeles, California, in the mid-1980s and revolutionizes Hip Hop culture with their music and tales about life in the hood.",
            "genres": ["biography", "drama", "history"],
            "rate": "8.0",
            "length": "2hr 27mins",
            "img": "straight-outta-compton.jpg"
          },
        ];
        const action = new fromMovies.LoadMoviesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromMovies.LOAD_MOVIES_SUCCESS,
          payload,
        });
      });
    });
  });

});
