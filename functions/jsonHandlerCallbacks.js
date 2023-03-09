const fs = require('fs');
const path = './movieList.json';

//just research JSON handling in Nodejs, then call this script from various commands

let GetListOfMovies = function(callback){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        string = JSON.parse(data).movies;
        callback(string);
    }
    )
}

let ReadJSON = function(callback){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        string = JSON.parse(data);
        callback(string);
    }
    )
}

let AppendtoJSON = function(string){
    ReadJSON(function(json){
        json.movies.push(string);

        fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
            if (error) {
              console.log('An error has occurred ', error);
              return;
            }
            console.log('Data written successfully to disk');
          });
    })
}

let DeleteFromJSON = function(string){
    ReadJSON(function(json){
        arr = json.movies;
        index = arr.indexOf(string);

        if(index < 0){
            console.log('That movie was not in the watchlist!');
            return;
        }
        else{
            arr.splice(index,1);
            fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
                if (error) {
                  console.log('An error has occurred ', error);
                  return;
                }
                console.log(string + ' successfully removed.');
              });
        }
    })
}

module.exports = {GetListOfMovies, AppendtoJSON, DeleteFromJSON}

//TEST FUNCTIONS

/*
GetListOfMovies(function(result){
    for(movie in result){
        console.log(result[movie]);
    }
});

AppendtoJSON("Pride (2014)");
DeleteFromJSON("The Lorax");*/