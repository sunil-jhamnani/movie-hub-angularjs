/**
 * Created by sunil.jhamnani on 2/24/17.
 */
(function () {
    function FavoriteService($localStorage, $sessionStorage, OmdbHttpFactory) {
        var favoriteMovies = {};

        function onInstantiate() {
            $localStorage.$default({
                movies: {}
            });
            $sessionStorage.$default({
                movies: {}
            });
            angular.forEach($localStorage.movies, function (value, key) {
                if(!favoriteMovies[key]) {
                    favoriteMovies[key] = new OmdbHttpFactory.OmdbEntity(value)
                }
            })
        }

        this.getFavoriteMovies = function () {
            return Object.keys(favoriteMovies).map(function (key) {
                return favoriteMovies[key];
            })
        };

        this.isFavoriteMovie = function (id) {
            return Object.keys(favoriteMovies).indexOf(id) == 0 ? true : false
        };

        this.addFavoriteMovies = function (movie) {
            if (favoriteMovies[movie.imdbID]) {
                return;
            }
            if (Object.keys(favoriteMovies).length == OmdbHttpFactory.maxFavoriteLength) {
                deleteFavoriteMovies(favoriteMovies[0]);
            }
            $localStorage.movies[movie.imdbID] = movie;
            objOmdbEntity = new OmdbHttpFactory.OmdbEntity(movie);
            favoriteMovies[movie.imdbID] = objOmdbEntity;
            return favoriteMovies;
        };

        function deleteFavoriteMovies(movie) {
            var key = movie.imdbid;
            delete $localStorage.movies[key];
            return delete favoriteMovies[key];
        }

        this.addToRecent = function (movie) {

        };

        onInstantiate();
    }

    var app = angular.module("ngOMDBSearch"),
        requires = [
            '$localStorage',
            '$sessionStorage',
            'ngOMDBSearchCore.factories.OmdbHttpFactory',
            FavoriteService
        ];
    app.service('FavoriteService', requires);
}());