const fs = require('fs').promises;
const path = './movieList.json';

//just research JSON handling in Nodejs, then call this script from various commands

async function GetListOfMovies(){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });
    string = JSON.parse(data).movies;
    return string;
}

async function GetCurrentFilm(){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });
    string = JSON.parse(data).currentFilm;
    return string;
}

async function GetDateTime(){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
        });
    string = JSON.parse(data).filmDateTime;
    return string;
}

async function SetCurrentFilm(string){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });

    json = JSON.parse(data);
    json.currentFilm = string;

    fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
      });
      
      console.log(string);
      console.log('Data successfully written to file.');
    }

async function SetDateTime(string){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });

    json = JSON.parse(data);
    json.filmDateTime = string;

    fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
      });
      
      console.log('Data successfully written to file.');
    }

async function AppendtoJSON(string){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });

    json = JSON.parse(data);
    json.movies.push(string);

    fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
            if (error) {
              console.log('An error has occurred ', error);
              return;
            }
          });

    console.log('Data successfully written to list.');
}

async function DeleteFromJSON(string){
    let data = await fs.readFile(path)
        .catch((error) =>{
            console.log(error);
            return;
    });

    json = JSON.parse(data);
    arr = json.movies;
    index = arr.indexOf(string);

    if(index < 0){
        console.log('That movie was not in the watchlist!');
        return false;
    }
    else{
        arr.splice(index,1);
        fs.writeFile(path, JSON.stringify(json, null, 2), (error) => {
            if (error) {
            console.log('An error has occurred ', error);
            return;
            }
        });
        
        console.log(string + ' successfully removed.');
        return true;
    }
}

module.exports = {GetListOfMovies, AppendtoJSON, DeleteFromJSON, GetCurrentFilm, SetCurrentFilm, GetDateTime, SetDateTime}

//TEST FUNCTIONS

/*
async function CallAsync() {
    movies = await GetListOfMovies();
    for(i in movies){
        console.log(movies[i]);
    }
    //await AppendtoJSON("Spy Kids 4");
    await DeleteFromJSON("Spy Kids 4");
}
    
CallAsync();
*/
