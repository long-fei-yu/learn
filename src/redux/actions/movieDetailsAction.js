export const MovieId = 'movieId';

export const setMovieId = (id) => {
    return {
        type: MovieId,
        id,
    }
};