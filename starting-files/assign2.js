
/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

document.addEventListener("DOMContentLoaded", () => {
    const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

    fetch(api)
        .then(resp => resp.json()).then(songs => {
            const playlist = [];

            function addToPlaylistButtonHandler() {
                const buttons = document.querySelectorAll("#add");
                for (b of buttons) {
                    b.addEventListener("click", function (song) {
                        const theClickedSong = b.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.parentNode;
                        const clickedID = theClickedSong.dataset.song;
                        const selectedSong = songs.find(s => s.song_id == clickedID);
                        playlist.push(selectedSong);
                        

                    });
                }
            }
            function addToAllPlaylistButtonHandler(songList) {

                const addAll = document.querySelector("#addAll");
                addAll.addEventListener("click", function () {
                    for (s of songList) {
                        playlist.push(s);
                        
                    }
                });
            }


            function removeTable() {
                const tableDiv = document.querySelectorAll("#songTable");
                let checkTable = document.querySelector("#songTable table") != undefined;
                
                if (checkTable) {

                    if (tableDiv.length = 1) {
                        for (let i = 0; i < tableDiv.length; i++) {
                            tableDiv[i].remove();
                        }
                    }
                }

            }



            function addArtist() {
                const artist = JSON.parse(artistData);
                const empty = document.createElement("option");

                empty.textContent = "Select a Artist";

                document.querySelector("#artistSearch").appendChild(empty);


                for (let i = 0; i < artist.length; i++) {

                    const option = document.createElement("option");
                    option.textContent = artist[i].name;

                    option.dataset.artist = artist[i].id;
                    option.value = artist[i].id;

                    
                    document.querySelector("#artistSearch").appendChild(option);
                }
            }

            function addGenre() {

                const generes = JSON.parse(genreData);
                const empty = document.createElement("option");
                empty.value = "";
                empty.dataset.genre = ""
                empty.selected;
                empty.textContent = "Select a Genere";
                document.querySelector("#genreSearch").appendChild(empty);
                for (let i = 0; i < generes.length; i++) {
                    const option = document.createElement("option");
                    option.dataset.genre = generes[i].id;
                    option.textContent = generes[i].name;
                    option.value = generes[i].id;
                    document.querySelector("#genreSearch").appendChild(option);
                }

            }

            function sorter(SongList) {



                const tableHeaders = document.querySelectorAll("#songTable th");
                const sortValue = document.querySelector("#sortingIndicator");
                sortValue.style.color = "red";
                sortValue.style.textAlign = "center";
                
                tableHeaders.forEach(column => {
                    column.addEventListener('click', () => {

                        if (column.textContent == "Title") {
const sorted = sortByTitle(SongList);
                           sortByTitle(sorted);

                            createSongTable(sorted);
                            sortValue.textContent = "Sorted by: Title";

                        } else if (column.textContent == "Artist") {

                            const sorted = sortByArtist(SongList);
                        
                            sortValue.textContent = "Sorted by: Artist";
                            createSongTable(sorted);
                        } else if (column.textContent == "Genre") {
                            const sorted = sortByGenre(SongList);
                           
                            sortValue.textContent = "Sorted by: Genre";
                            createSongTable(sorted);
                        } else if (column.textContent == "Year") {
                            const sorted = sortByYear(SongList);
                            createSongTable(sorted);
                            sortValue.textContent = "Sorted by: Year";

                        } else {
                            const sorted = sortByPopularity(SongList);
                            createSongTable(sorted);

                            sortValue.textContent = "Sorted by: Popularity";

                        }
                    });
                });


            }

            function createSongTable(SongList) {

                const songTable = document.createElement("div");
                songTable.setAttribute("id", "songTable");
                songTable.style.placeSelf = "center";
                //Query to see if the table exists
                removeTable();

                const table = document.createElement("table");
                let tableMainHead = document.createElement("thead");
                
                table.appendChild(tableMainHead);
                let tableRow = document.createElement('tr');
                let tableHead = document.createElement('th');
                tableHead.textContent = 'Title';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Artist';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Year';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Genre';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Popularity';
                tableRow.appendChild(tableHead);

                tableHead = document.createElement('th');

                const button = document.createElement('button');
                button.textContent = "Add All";
                button.id = "addAll";

                tableHead.appendChild(button);
                tableRow.appendChild(tableHead);


                tableMainHead.appendChild(tableRow);
                table.appendChild(tableMainHead);
                

                let tableBody = document.createElement("tbody");

                for (let i = 0; i < SongList.length; i++) {
                    tableRow = document.createElement('tr');
                    tableRow.dataset.song = SongList[i].song_id;
                    let tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].title;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].artist.name;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].year;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].genre.name;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].details.popularity;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('button');
                    tableColumn.textContent = "Add song to Playlist";
                    tableColumn.id = "add"
                    tableRow.appendChild(tableColumn);
                    tableBody.appendChild(tableRow);
                    table.appendChild(tableBody);
                }

                document.querySelector(".basicSongWrapper").appendChild(songTable).appendChild(table);
                addToPlaylistButtonHandler();
                addToAllPlaylistButtonHandler(SongList);



                sorter(SongList);

                const tableRows = document.querySelectorAll("#songTable table tbody tr");
               
                for (let i = 0; i < tableRows.length; i++) {
                    for (let j = 0; j< 5; j++){
                        tableRows[i].childNodes[j].addEventListener("click", function (e)

                    {
                        
                        const clickedRow = tableRows[i]; 

                        const clickedID = clickedRow.dataset.song;
                        
                        const selectedSong = songs.find(s => s.song_id == clickedID);


                        addRadarChart(selectedSong);
                        // document.querySelector("#singleSongWrapper").className = "show";

                        addSingleSongInfo(selectedSong);

                        });
                    }
                   
                }

            }
            function addSingleSongHeaders() {
                const songHeading = document.createElement("h2");
                songHeading.textContent = "Song Information";
                return songHeading;
            }
            function closeViewButtonHandler() {
                const close = document.querySelector("#closeView");
                close.addEventListener("click", function () {

                    document.querySelector("#singleSongWrapper").className = "hide";
                    document.querySelector(".basicSongWrapper").className = "show";
                })
            }
            closeViewButtonHandler();

            function addSingleSongDiv(song) {
                const songInfoDiv = document.createElement("div");
                const duration = secondsToMinutes(song);
                const type = getArtistType(song);
                songInfoDiv.textContent = song.title + ",  " + song.artist.name + ", " + type + ", " + song.genre.name + ", " + song.year + ", " + duration + " minutes";
                return songInfoDiv;

            }
            function addSingleSongInfo(song) {

                const songInfo = document.createElement("div");
                songInfo.id = "singleSongInfo";
                const header = addSingleSongHeaders();
                songInfo.appendChild(header);


                const info = addSingleSongDiv(song);
                songInfo.appendChild(info);

                const songtextContent = ["Danceability:" + song.analytics.danceability, "Liveness:" + song.analytics.liveness, "Energy:" + song.analytics.energy, "Speechiness:" + song.analytics.speechiness, "Acousticness:" + song.analytics.acousticness, "Valenace:" + song.analytics.valence];
                for (s of songtextContent) {
                    const ul = document.createElement("ul");
                    ul.textContent = s;
                    songInfo.appendChild(ul);

                }
                const wrapper = document.querySelector("#singleSongWrapper #singleSongInfo");

                if (wrapper != null) {
                    // remove(songInfo);
                }


                document.querySelector("#singleSongWrapper").appendChild(songInfo);
            }

            function displayPlayList(){
                createPlayListTable(playlist);
            }
            function displayPlaylistView(playlist){
                createPlayListTable();
                createPlaylistInfo(playlist);
            }
            // displayPlayList();
            function createPlayListTable (){
                const songTable = document.createElement("div");
                songTable.setAttribute("id", "playlistTable");
                songTable.style.placeSelf = "center";
                
                removeTable();

                const table = document.createElement("table");
                let tableMainHead = document.createElement("thead");
                
                table.appendChild(tableMainHead);
                let tableRow = document.createElement('tr');
                let tableHead = document.createElement('th');
                tableHead.textContent = 'Title';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Artist';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Year';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Genre';
                tableRow.appendChild(tableHead);
                tableHead = document.createElement('th');
                tableHead.textContent = 'Popularity';
                tableRow.appendChild(tableHead);

                tableHead = document.createElement('th');

                const button = document.createElement('button');
                button.textContent = "Remove All";
                button.id = "remove";

                tableHead.appendChild(button);
                tableRow.appendChild(tableHead);


                tableMainHead.appendChild(tableRow);
                table.appendChild(tableMainHead);
                

                let tableBody = document.createElement("tbody");

                for (let i = 0; i < SongList.length; i++) {
                    tableRow = document.createElement('tr');
                    tableRow.dataset.song = SongList[i].song_id;
                    let tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].title;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].artist.name;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].year;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].genre.name;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('td');
                    tableColumn.textContent = SongList[i].details.popularity;
                    tableRow.appendChild(tableColumn);
                    tableColumn = document.createElement('button');
                    tableColumn.textContent = "Remove song from Playlist";
                    tableColumn.id = "remove"
                    tableRow.appendChild(tableColumn);
                    tableBody.appendChild(tableRow);
                    table.appendChild(tableBody);
                }

                document.querySelector("#playlistWrapper").appendChild(songTable).appendChild(table);
                // addToPlaylistButtonHandler();
                // addToAllPlaylistButtonHandler(SongList);



                sorter(SongList);

                const tableRows = document.querySelectorAll("#songTable table tbody tr");
               
                for (let i = 0; i < tableRows.length; i++) {
                    // document.querySelector("#singleSongWrapper").style.display = "block";
                    // document.querySelector(".basicSongWrapper").style.display = "none";

                    
                    for (let j = 0; j< 5; j++){
                        tableRows[i].childNodes[j].addEventListener("click", function (e)
                    {
                            const clickedRow = tableRows[i];
                           

                        const clickedID = clickedRow.dataset.song;
                        
                        const selectedSong = songs.find(s => s.song_id == clickedID);


                        addRadarChart(selectedSong);
                       
                        addSingleSongInfo(selectedSong);

                        });
                    }
                   
                }

            }
            function createPlaylistInfo(playlist){
                let length = playlist.length;
                const header = document.createElement("h2");
                h2.textContent = "Playlist Details";

                let count = getAvgPopulatirty(playlist)[0];
                let avg = getAvgPopulatirty(playlist)[1];
                
                const text = document.createElement("div");
                text.textContent=count+avg;
                
                const appender = document.querySelectorAll("#playlistWrapper");
                appender.appendChild(h2);
                appender.appendChild(text);
            }
            
            function getAvgPopulatirty(playlist){
                let count = 0;
                let sum = 0;
                const returnArray=[];
                for (s of playlist){
                    count++;
                    sum += s.details.popularity;
                }
                let avg = count/sum;
                returnArray.push(count);
                returnArray.push(avg)
                return returnArray;
            }
            function addRadarChart(song) {
                const canvas = document.createElement("canvas");
                canvas.id = "radarChart";
                let radarChart = new Chart(canvas, {
                    type: 'radar',
                    data: {
                        labels: ['Danceability', 'Energy', 'Speachness', 'Accousticness', 'livness', 'Valence'],
                        datasets: [
                            {
                                label: song.title,
                                data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence]
                                , fill: true,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                pointBackgroundColor: 'rgb(255, 99, 132)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(255, 99, 132)'
                            }
                        ]
                    },
                    options: {
                        responsive: false
                    }
                });
                const songPage = document.querySelector("#singleSongWrapper");
                songPage.appendChild(canvas, radarChart);
            }

            // // Function to get the song ID by its title
            // function getSongIdByTitle(title) {
            //     const foundSong = songs.find(song => song.title === title);
            //     return foundSong;
            // }


            showForm();

            // function closeViewHandler(){
            //     const closeView
            // }
            function showPlayList() {
                // console.log(playlist);

            }



            function showForm() {
                // Creating header Element
                const h2 = document.createElement("h2");
                h2.textContent = "Basic Song Search"
                h2.id = "songSearchTitle";

                const form = document.createElement("form");
                form.id = "songForm";

                //Creating Title radio and inputs
                const titleRadioButton = document.createElement("input");
                titleRadioButton.type = "radio";
                titleRadioButton.name = "searchFilter"
                titleRadioButton.value = "title";
                titleRadioButton.id = "titleFilter";

                const titleLabel = document.createElement("label");
                titleLabel.textContent = "Title";
                titleLabel.for = "artistFilter";

                const titleInput = document.createElement("input");
                titleInput.type = "input";
                titleInput.id = "titleSearch";
                titleInput.placeholder = "Type Here";

                //Creating artist radio and inputs
                const artistRadioButton = document.createElement("input");
                artistRadioButton.type = "radio";
                artistRadioButton.value = "artist"
                artistRadioButton.id = "artistFilter"
                artistRadioButton.name = "searchFilter";

                const artistLabel = document.createElement("label");
                artistLabel.for = "artistFilter";
                artistLabel.textContent = "Artist";

                const artistSelect = document.createElement("select");
                artistSelect.id = "artistSearch";

                //Creating genre radio and inputs

                const genreRadioButton = document.createElement("input");
                genreRadioButton.type = "radio";
                genreRadioButton.name = "searchFilter";
                genreRadioButton.id = "genreFilter";
                genreRadioButton.value = "genre";

                const genreLabel = document.createElement("label");
                genreLabel.for = "genreFilter";
                genreLabel.textContent = "Genre";

                const genreSelect = document.createElement("select");
                genreSelect.id = "genreSearch"


                const titleDiv = document.createElement("div");
                const artistDiv = document.createElement("div");
                const genreDiv = document.createElement("div");

                titleDiv.appendChild(titleRadioButton);
                titleDiv.appendChild(titleLabel);
                titleDiv.appendChild(titleInput);



                artistDiv.appendChild(artistRadioButton);
                artistDiv.appendChild(artistLabel);
                artistDiv.appendChild(artistSelect);


                genreDiv.appendChild(genreRadioButton);
                genreDiv.appendChild(genreLabel);
                genreDiv.appendChild(genreSelect);

                // addGenre();
                form.appendChild(titleDiv);
                form.appendChild(artistDiv);
                form.appendChild(genreDiv);

                //Creating filter button
                const fButton = document.createElement("button");
                fButton.type = "button";
                fButton.id = "filterButton";
                fButton.textContent = "Filter";

                //Creating clear button
                const cButton = document.createElement("button");
                cButton.type = "button";
                cButton.id = "clearButton";
                cButton.textContent = "Clear";


                //Appending buttons to the form
                form.appendChild(cButton);
                form.appendChild(fButton);

                //Appending from to its DIV
                const formDiv = document.querySelector(".basicSongWrapper");
                formDiv.appendChild(h2);
                
                formDiv.appendChild(form);
                addArtist();
                addGenre();
                document.querySelector("#genreSearch").className = "hide";
                document.querySelector("#artistSearch").className = "hide";
                document.querySelector("#titleSearch").className = "hide";
                document.querySelector("#clearButton").addEventListener("click", function () {
                    document.querySelector("#genreFilter").disabled = false;
                    document.querySelector("#titleFilter").disabled = false;
                    document.querySelector("#artistFilter").disabled = false;

                    document.querySelector("#genreSearch").className = "hide";
                    document.querySelector("#artistSearch").className = "hide";
                    document.querySelector("#titleSearch").className = "hide";
                });
                document.querySelector("#titleFilter").addEventListener("click", function () {

                    document.querySelector("#genreFilter").disabled = true;
                    document.querySelector("#titleFilter").disabled = false;
                    document.querySelector("#artistFilter").disabled = true;

                    document.querySelector("#genreSearch").className = "hide";
                    document.querySelector("#artistSearch").className = "hide";
                    document.querySelector("#titleSearch").className = "show";
                    document.querySelector("#titleSearch").textContent = "";

                });
                document.querySelector("#artistFilter").addEventListener("click", function () {
                    document.querySelector("#genreFilter").disabled = true;
                    document.querySelector("#titleFilter").disabled = true;
                    document.querySelector("#artistFilter").disabled = false;

                    document.querySelector("#genreSearch").className = "hide";
                    document.querySelector("#artistSearch").className = "show";
                    document.querySelector("#artistSearch").childNodes[0].selected = true;
                    document.querySelector("#titleSearch").className = "hide";

                });
                document.querySelector("#genreFilter").addEventListener("click", function () {
                    document.querySelector("#genreFilter").disabled = false;
                    document.querySelector("#titleFilter").disabled = true;
                    document.querySelector("#artistFilter").disabled = true;

                    document.querySelector("#genreSearch").className = "show";
                    document.querySelector("#genreSearch").childNodes[0].selected = true;
                    document.querySelector("#artistSearch").className = "hide";
                    document.querySelector("#titleSearch").className = "hide";

                });
                document.querySelector("#filterButton").addEventListener("click", function () {


                    const radioButtons = document.querySelectorAll('input[name="searchFilter"]');
                    
                    // const genereSearchFilter = document.querySelector("#genreSearch");
                    // const titleSearchFilter = document.querySelector("#titleSearch");
                    const artistSearchFilter = document.querySelectorAll("#artistSearch");

                    for (let i = 0; i < radioButtons.length; i++) {
                        if (radioButtons[i].disabled == false) {

                            if (radioButtons[i].value == "artist") {
                                const options = document.querySelectorAll("#artistSearch option");
                                for (o of options) {


                                    if (o.selected) {

                                        const id = o.dataset.artist;


                                        const selectedArtist = songs.filter(function (s) {
                                            
                                            s.artist.id
                                            
                                            return s.artist.id == id;

                                        }

                                        );
                                        
                                        createSongTable(selectedArtist);
                                    }
                                }




                                // removeTable();
                                // printTable();

                            } else if (radioButtons[i].value == "genre") {
                                

                                const options = document.querySelectorAll("#genreSearch option");
                                for (o of options) {


                                    if (o.selected) {

                                        const id = o.dataset.genre;

                                       

                                        const selectedGenre = songs.filter(function (s) {
                                            
                                            // s.artist.id
                                            
                                            return s.genre.id == id;

                                        }

                                        );
                                        
                                        createSongTable(selectedGenre);
                                    }
                                }

                                // let choosenValue = genereSearchFilter.options[genereSearchFilter.selectedIndex].value;
                                // songs.filter(item => item.genre.id == choosenValue);
                                // removeTable();
                                // printTable();



                            } else {
                                // let choosenValue = titleSearchFilter.value;
                                // songs.filter(item => item.title == choosenValue);
                                // removeTable();
                                // printTable();


                            }
                        }
                    }
                });
            }
        });


}


);
function sortByPopularity(songList) {
    return songList.sort(function (a, b) {
            return -(a.details.popularity - b.details.popularity);
        });
    }

function sortByYear(songList){
   
   return songList.sort(function (a, b) {
            return a.year - b.year;
        });

   
}
function sortByArtist(songList){
    return  songList.sort(function (a, b) {
            return a.artist.name.charCodeAt(0) - b.artist.name.charCodeAt(0);
        });

    }

function sortByTitle(songList){
    return songList.sort(function (a, b) {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        

    }

function sortByGenre(songList){
    
     return    songList.sort(function (a, b) {
            return a.genre.name.charCodeAt(0) - b.genre.name.charCodeAt(0);
        });

    }

function secondsToMinutes(song) {
    return Number.parseInt(song.details.duration) / 60;
}

function getArtistType(song) {
    const id = song.artist.id;
    const artist = JSON.parse(artistData);
    for (a of artist) {
        if (a.id == id) {
            return a.type;
        }
    }

}

// .catch(err => {
//     console.log(":(");
// });
