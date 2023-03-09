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

module.exports = {GetListOfMovies, AppendtoJSON, DeleteFromJSON}

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
