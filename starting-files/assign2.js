/* url of song api --- https versions hopefully a little later this semester */
// const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
// window.localStorage

const filteredArray = [];


// const data = fetch(api).then(res => res.json());
// console.log(data);
// for (let i = 0; i<data.length; i++){
// // console.log(data[i].id);
// }


// let data_serialized = JSON.stringify(data);




/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/



const songs = JSON.parse(songsArray);
const artist = JSON.parse(artistData);
const generes = JSON.parse(generesData);



document.addEventListener("DOMContentLoaded", function() {
   document.querySelector("#artistSearch").style.display = "none";
   document.querySelector("#titleSearch").style.display = "none";
   document.querySelector("#genreSearch").style.display = "none";
    function removeTable() {
        const tableDiv = document.querySelectorAll("#songTable");
        let checkTable = document.querySelector("#songTable table") != undefined;
        console.log(tableDiv.length);
        if (checkTable) {

            if (tableDiv.length = 1) {
                for (let i = 0; i < tableDiv.length; i++) {
                    tableDiv[i].remove();
                }
            }
        }

    }
   //  const radioButtons = document.querySelectorAll('input[name="searchFilter"]');
    const clearButton = document.querySelector("#clearButton");
    const titleFilter = document.querySelector("#titleFilter");
    const artistFilter = document.querySelector("#artistFilter");
    const genereFilter = document.querySelector("#genreFilter");
    const genereSearchFilter = document.querySelector("#genreSearch");
    const titleSearchFilter = document.querySelector("#titleSearch");
    const artistSearchFilter = document.querySelector("#artistSearch");
    const buttonFilter = document.querySelector("#filterButton");


    titleFilter.addEventListener("click", function() {
        titleSearchFilter.style.display = "block";;
        artistFilter.setAttribute("disabled", "");
        artistSearchFilter.style.display = "none";
        genereFilter.setAttribute("disabled", "");
        genereSearchFilter.style.display = "none";


        buttonFilter.addEventListener("click", function() {
            getNodes();
        });
    })

    artistFilter.addEventListener("click", function() {
      artistSearchFilter.style.display = "block"
        genereFilter.setAttribute("disabled", "");
        genereSearchFilter.style.display = "none";

        genereFilter.setAttribute("disabled", "");
        genereSearchFilter.style.display = "none";
        titleFilter.setAttribute("disabled", "");
        titleSearchFilter.style.display = "none";


        artistSearchFilter.removeAttribute("disabled");
        titleFilter.setAttribute("disabled", "");
        titleSearchFilter.style.display = "none";

        buttonFilter.addEventListener("click", function() {
            getNodes();
        });

    

    });

    genereFilter.addEventListener("click", function() {
      genereSearchFilter.style.display = "block";
        genereSearchFilter.removeAttribute("disabled");
        titleFilter.setAttribute("disabled", "");
        titleSearchFilter.style.display = "none";
        artistFilter.setAttribute("disabled", "");
        artistSearchFilter.style.display = "none";

        buttonFilter.addEventListener("click", function() {
            getNodes();
        });

    })

    clearButton.addEventListener("click", function() {

        artistFilter.removeAttribute("disabled");
        artistFilter.checked=false;
        titleFilter.removeAttribute("disabled");
        titleFilter.checked=false;
        genereFilter.removeAttribute("disabled");
        genereFilter.checked=false;
         genereSearchFilter.style.display = "none";
         titleSearchFilter.style.display = "none";
        artistSearchFilter.style.display = "none";
        removeTable();

    });




 


    function addArtist() {
        let empty = document.createElement("option");
        empty.value = "";
        empty.textContent = "Select a Artist";
        document.querySelector("#artistSearch").appendChild(empty);

        for (let i = 0; i < artist.length; i++) {
            let option = document.createElement("option");
            option.textContent = artist[i].name;
            option.value = artist[i].id;
            document.querySelector("#artistSearch").appendChild(option);
        }
    }
    addArtist();

    function addGenre() {

        let empty = document.createElement("option");
        empty.value = "";
        empty.textContent = "Select a Genere";
        document.querySelector("#genreSearch").appendChild(empty);
        for (let i = 0; i < generes.length; i++) {
            let option = document.createElement("option");
            option.textContent = generes[i].name;
            option.value = generes[i].id;
            document.querySelector("#genreSearch").appendChild(option);
        }

    }
    addGenre();



    function getNodes() {
      removeTable();
        const radioButtons = document.querySelectorAll('input[name="searchFilter"]');

        const genereSearchFilter = document.querySelector("#genreSearch");
        const titleSearchFilter = document.querySelector("#titleSearch");
        const artistSearchFilter = document.querySelector("#artistSearch");


        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].disabled == false) {
                

                if (radioButtons[i].value == "artist") {
                    if (filteredArray.length > 0) {
                        filteredArray.splice(0, filteredArray.length);
                    }


                    let choosenValue = artistSearchFilter.options[artistSearchFilter.selectedIndex].value;


                    songs.filter(item => item.artist.id == choosenValue).forEach((item) => {
                        filteredArray.push(item)
                    });
                    removeTable();
                   printTable();



                } else if (radioButtons[i].value == "genre") {
                    let choosenValue = genereSearchFilter.options[genereSearchFilter.selectedIndex].value;

                    songs.filter(item => item.genre.id == choosenValue).forEach((item) => {
                        filteredArray.push(item)
                    });
                    removeTable();
                  printTable();



                } else {
                    let choosenValue = titleSearchFilter.value;

                    songs.filter(item => item.title == choosenValue).forEach((item) => {
                        filteredArray.push(item)
                    });
                    removeTable();
                   printTable();


                }
            }
        }
    }



    function sorter() {
        const tableHeaders = document.querySelectorAll("#songTable th");
        const sortValue = document.querySelector("#sortingIndicator");
        sortValue.style.color = "red";
        sortValue.style.textAlign = "center";
        console.log(sortValue);
        tableHeaders.forEach(column => {
            column.addEventListener('click', () => {

                if (column.textContent == "Title") {

                    for (let i = 0; i < filteredArray.length; i++) {
                        filteredArray.sort(function(a, b) {
                            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                        });
                    }

                    printTable();
                    sortValue.textContent = "Sorted by: Title";

                } else if (column.textContent == "Artist") {

                    for (let i = 0; i < filteredArray.length; i++) {

                        filteredArray.sort(function(a, b) {
                            return a.artist.name.charCodeAt(0) - b.artist.name.charCodeAt(0);
                        });
                        sortValue.textContent = "Sorted by: Artist";
                    }
                    printTable();
                } else if (column.textContent == "Genre") {

                    for (let i = 0; i < filteredArray.length; i++) {

                        filteredArray.sort(function(a, b) {
                            return a.genre.name.charCodeAt(0) - b.genre.name.charCodeAt(0);
                        });
                        sortValue.textContent = "Sorted by: Genre";
                    }
                    printTable();
                } else if (column.textContent == "Year") {
                    for (let i = 0; i < filteredArray.length; i++) {
                        filteredArray.sort(function(a, b) {
                            return a.year - b.year;
                        });

                    }
                    printTable();
                    sortValue.textContent = "Sorted by: Year";

                } else {
                    for (let i = 0; i < filteredArray.length; i++) {
                        filteredArray.sort(function(a, b) {
                            return -(a.details.popularity - b.details.popularity);
                        });
                    }
                    printTable();

                    sortValue.textContent = "Sorted by: Popularity";

                }
            });
        });
    }

    function printTable() {

        const songTable = document.createElement("div");
        songTable.setAttribute("id", "songTable");
        songTable.style.placeSelf = "center";
        //Query to see if the table exists
        removeTable();

        const table = document.createElement("table");
        let tableMainHead = document.createElement("thead");
        console.log(tableMainHead);
        table.appendChild(tableMainHead);
        let tableRow = document.createElement('tr');
        let tableHead = document.createElement('th');
        tableHead.innerHTML = 'Title';
        tableRow.appendChild(tableHead);
        tableHead = document.createElement('th');
        tableHead.innerHTML = 'Artist';
        tableRow.appendChild(tableHead);
        tableHead = document.createElement('th');
        tableHead.innerHTML = 'Year';
        tableRow.appendChild(tableHead);
        tableHead = document.createElement('th');
        tableHead.innerHTML = 'Genre';
        tableRow.appendChild(tableHead);
        tableHead = document.createElement('th');
        tableHead.innerHTML = 'Popularity';
        tableRow.appendChild(tableHead);

        tableHead = document.createElement('th');
        let button = document.createElement('button');
        button.innerHTML = "Add All";
        tableRow.appendChild(button);

        tableMainHead.appendChild(tableRow);
        table.appendChild(tableMainHead);
        console.log(table);

        let tableBody = document.createElement("tbody");

        for (let i = 0; i < filteredArray.length; i++) {


            tableRow = document.createElement('tr');
            let tableColumn = document.createElement('td');
            tableColumn.textContent = filteredArray[i].title;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = filteredArray[i].artist.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = filteredArray[i].year;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = filteredArray[i].genre.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = filteredArray[i].details.popularity;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('button');
            tableColumn.textContent = "Add song to Playlist";
            tableRow.appendChild(tableColumn);
            tableBody.appendChild(tableRow);
            table.appendChild(tableBody);
        }

        document.querySelector(".basicSongWrapper").appendChild(songTable).appendChild(table);



        sorter();

    }


   });




// Array to store the matched song IDs
const favoritesArray = [];

// Function to get the song ID by its title
function getSongIdByTitle(title) {
    const foundSong = songs.find(song => song.title === title);
    return foundSong ? foundSong.song_id : null;
}

// Function to handle button click and add song ID to the favorites array
function handleAddButtonClick() {
    // Read the song title from an input field (replace 'yourInputId' with the actual input field ID)
    const songTitleInput = document.getElementById('yourInputId'); //HE DOES NOT WANT US TO USE GETS BUT RATHER QUERY
    const songTitle = songTitleInput.value.trim();

    if (songTitle) {
        // Get the song ID using the title
        const songId = getSongIdByTitle(songTitle);

        if (songId) {
            // Add the song ID to the favorites array
            favoritesArray.push(songId);

            // Log the updated favorites array
            console.log('Favorites Array:', favoritesArray);

            // Optionally, you can update the UI or perform other actions here
        } else {
            // Handle the case where the song title is not found
            console.log(`No song found with title: ${songTitle}`);
        }
    } else {
        // Handle the case where the input field is empty
        console.log('Please enter a song title.');
    }
}