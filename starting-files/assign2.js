document.addEventListener("DOMContentLoaded", () => {
   //Creatomg base markup and navbar and nav bar
    baseMarkup();
    createNavBar();
    createFooter();

    //All the arrays for sorting and saving
    const songs = [];
    const sortedSongs = [];
    const playlist = [];
   //Letting the user go to the playlist page anytime
    addToPlaylistButtonHandler();


    //Checks to see if the songs are in local storage
    if (localStorage.getItem("songs") == null) {
        const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
        fetch(api).then(resp => resp.json()).then(fetchedSongs => {
            songs.push(...fetchedSongs);
            localStorage.setItem("songs", JSON.stringify(fetchedSongs));

        }).catch(()=>{
            console.error("Sever Offline");
        });
    } else {
        songs.push(...JSON.parse(localStorage.getItem("songs")));
    }

    //Creating the base html markup
    function baseMarkup() {
        const headerWrapper = document.createElement("header");
        headerWrapper.id = "header";

        const songSearchWrapper = document.createElement("div");
        songSearchWrapper.id = "basicSongWrapper";
        songSearchWrapper.classList = "container";
        
        const singleSongWrapper = document.createElement("div");
        singleSongWrapper.id = "singleSongWrapper";
        singleSongWrapper.classList = "container";
      
        const playlistWrapper = document.createElement("div");
        playlistWrapper.id = "playlistWrapper";
        playlistWrapper.classList = "container";
     
        
        const footerWrapper = document.createElement("footer");
        footerWrapper.classList = "footer";
        footerWrapper.id = "footer";

        document.querySelector("body").appendChild(headerWrapper);
        document.querySelector("body").appendChild(songSearchWrapper);
        document.querySelector("body").appendChild(singleSongWrapper);
        document.querySelector("body").appendChild(playlistWrapper);
        document.querySelector("body").appendChild(footerWrapper);

        document.querySelector("#basicSongWrapper").classList = "bg-body";
        document.querySelector("#singleSongWrapper").classList = "bg-body";
        document.querySelector("#playlistWrapper").classList = "bg-body";


    }


    //Bellow is for the Search Page
    addToPlaylistButtonHandler();

    //Adds all the artist to the Search Input
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

    //Adds all the genres to the search input
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

    //The close single song button
    function closeHandler() {
        document.querySelector("#singleSongCloseView").hidden = false;
        const button = document.querySelector("#singleSongCloseView");
        button.addEventListener("click", () => {
            document.querySelector("#singleSongWrapper").hidden = true;
            document.querySelector("#playlistWrapper").hidden = true;
            document.querySelector("#basicSongWrapper").hidden = false;
            document.querySelector("#playlistView").hidden = false;
            document.querySelector("#singleSongCloseView").hidden = true;
        });

    }
    //Creatigna nd formatting the Song Search Page
    function createSingleSongSearch() {

        const row = document.createElement("div");
        row.className = "row";

        //Contains the form column
        const formColumn = document.createElement("div");
        formColumn.className = "col-6"

        //Contains the table
        const tableColumn = document.createElement("div");
        tableColumn.className = "col-6";

        //Contains the container for the table and the from
        const searchContainer = document.createElement("div");
        searchContainer.className = "container";

        //The Search row that will be added to the container
        const searchRow = document.createElement("div");
        searchRow.className = "row";
        searchRow.id = "searchRow";

        //Making and returning the form
        const form = showForm();
        
        //Appending the from to the desired column
        formColumn.appendChild(form);


        //Creating a br element to add spacing
        const br = document.createElement("br");
        formColumn.appendChild(br);

        //This row contains the sorting indicator and page header
        const titleRow = document.createElement("div");
        titleRow.className = "row";
        titleRow.id = "titleRow";



        //The song hedaer
        const h2 = document.createElement("h2");
        h2.textContent = "Basic Song Search";

        //the indicator that displays to the user what they sorted the table by 
        const sortingIndicator = document.createElement("div");
        sortingIndicator.id = "sortingIndicator";

        //Creating Columns for the header and the sorter
        const titleCol = document.createElement("div");
        titleCol.className = "col-6";
        

        const sortingIndicatorCol = document.createElement("div");
        sortingIndicatorCol.className = "col-6";
        sortingIndicatorCol.style.textAlign = "center";
        sortingIndicatorCol.appendChild(sortingIndicator);

        //Appending the header and indicator to a row
        titleCol.appendChild(h2);
        titleRow.appendChild(titleCol);
        titleRow.appendChild(sortingIndicatorCol);

        //the container that will hold the previous 2 elements
        const titleRowContainer = document.createElement("div")
        titleRowContainer.classList = "container";

        //Adding previous element to a contianer        
        titleRowContainer.appendChild(titleRow);

        //Appending the title row and search containers to the page 'view'
        document.querySelector("#basicSongWrapper").appendChild(titleRowContainer);
        document.querySelector("#basicSongWrapper").appendChild(searchRow);

        //Making the table
        const table = createTable("#songTable");

       
        //Adding the table to the postioning column 
        tableColumn.appendChild(table);

        //Adding the form and table columns to the search row
        row.appendChild(formColumn);
        row.appendChild(tableColumn);

        //Appending the previous 2 elements to their contianer
        searchContainer.appendChild(row);

        //Adding the container to the page in the DOM
        document.querySelector("#basicSongWrapper").appendChild(searchContainer);

        //Adding all selects to the form
        addArtist();
        addGenre();
        

        //Hidding access to the user for things that are not needed 
        document.querySelector("#singleSongCloseView").hidden = true;
        document.querySelector("#playlistCloseView").hidden = true;
        document.querySelector("#basicSongSearchCloseView").hidden = true;
        document.querySelector("#genreSearch").hidden = true;
        document.querySelector("#artistSearch").hidden = true;
        document.querySelector("#titleSearch").hidden = true;

        //Giving access to the user to view the playlist
        document.querySelector("#playlistView").hidden = false;
sorter();

        //Making the form active with handlers
        filterButtonHandler();
        titleRadioButtonHandler();
        artistRadioButtonHandler();
        clearButtonHandler();
        genreRadioButtonHandler();
    }

    //This handler displays the song info page of the selected song
    function songClickHandler() {
        //Getting all table body rwos
        const tableRows = document.querySelectorAll("#songTable tbody tr ");

        for (let i = 0; i < tableRows.length; i++) {
            //Looping through all the columns but the add button
            for (let j = 0; j < 5; j++) {
                tableRows[i].childNodes[j].addEventListener("click", function () {

                    const clickedRow = tableRows[i];
                    //Getting the song id of the clicked row
                    const clickedID = clickedRow.dataset.song;
                    //Searching for the song in the song table against the song id in the row
                    const selectedSong = songs.find(s => s.song_id == clickedID);
                    //Opening the page and buttons to the user
                    document.querySelector("#basicSongWrapper").hidden = true;
                    document.querySelector("#playlistCloseView").hidden = true;
                    document.querySelector("#playlistView").hidden = true;
                    document.querySelector("#singleSongCloseView").hidden = false;
                    document.querySelector("#singleSongWrapper").hidden = false;
                    document.querySelector("#basicSongSearchCloseView").hidden = true;
                    //Removing old page
                    removeSingleSongInfo();
                    //Making new single song page
                    addSingleSongInfo(selectedSong);
                    //Adding the radar chart to the single song page
                    addRadarChart(selectedSong);
                    //Actualizing the close button to exit
                    closeHandler();

                    
                });
            }
        }

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
        return form;
    }
    //Function that uses natural sort
    function sortByPopularity() {
        return sortedSongs.sort(function (a, b) {
            return -(a.details.popularity - b.details.popularity);
        });
    }
//Sorts descending
    function sortByYear() {
        return sortedSongs.sort(function (a, b) {
            return a.year - b.year;
        });
    }
    function sortByArtist() {
        return function (a, b) {
            let lowercaseAArtist = a.title[0].toLowerCase();
            let lowercaseBArtist = b.title[0].toLowerCase();
            
            //Comparing artist at lowercase 
            if (lowercaseAArtist < lowercaseBArtist) {
                return -1;
            }
            else if (lowercaseAArtist > lowercaseBArtist) {
                return 1;
            }
            else {
                return 0;
            }

        }

    }

    function sortByTitle() {

        return sortedSongs.sort(
            function (a, b) {
                let lowercaseATitle = a.title[0].toLowerCase();
                let lowercaseBTitle = b.title[0].toLowerCase();
                //Comparing the titles in lowercase form
                if (lowercaseATitle < lowercaseBTitle) {
                    return -1;
                }
                else if (lowercaseATitle > lowercaseBTitle) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
    }

    function sortByGenre() {

        return sortedSongs.sort(function (a, b) {
            let lowercaseAGenere = a.genre.name[0].toLowerCase();
            let lowercaseBGenere = b.genre.name[0].toLowerCase();
            if (lowercaseAGenere < lowercaseBGenere) {
                return -1;
            }
            else if (lowercaseAGenere > lowercaseBGenere) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    //Formats the song duration from seconds to minutes and seconds
    function secondsToMinutes(song) {
        //Getting the minutes of the song minutes and ensuring no rounding occurs
        const minutes = Math.floor(song.details.duration / 60);
        //Getting the seconds that are left from minutes
        const seconds = song.details.duration - minutes * 60;
        //Returning a formatted string 
        return minutes + ":" + seconds + " minutes";
    }
    //Finding the artist type of a specfic song
    function getArtistType(song) {
        //Getting the songs artist id
        const id = song.artist.id;
        //Creating a artist array from the JSON provided
        const artist = JSON.parse(artistData);
        for (a of artist) {
            //returns the artist type if both ID's are the same
            if (a.id == id) {
                return a.type;
            }
        }
    }

    function createNavBar() {
        const nav = document.createElement("div");
        nav.classList.add("navbar", "navbar-expand-lg", "sticky-top", "bg-primary", "navbar-dark");
        const divContainer = document.createElement("div");
        divContainer.classList = "container";
        const logo = document.createElement("span");
        logo.textContent = "Smartify";
        logo.classList.add("navbar-brand");
        const ul = document.createElement("ul");
        ul.classList.add("navbar-nav", "ms-auto", "align-items-center");
        const buttonNames = ["Playlist", "Close View", "Close View", "Close View", "Credits"];
        const idNames = ["playlistView", "playlistCloseView", "singleSongCloseView", "basicSongSearchCloseView", "credits"];
        for (let i = 0; i < buttonNames.length; i++) {
            const li = document.createElement("li");
            li.classList = "nav-item";
            const button = document.createElement("button");
            //Loop for addding all the buttons
            if (buttonNames[i] != "Credits") {
                button.textContent = buttonNames[i];
                button.classList.add("nav-link");
                button.id = idNames[i];
                li.appendChild(button);
                ul.appendChild(li);
            } else {
                //Creating the dropdown credit button
                const dropdown = document.createElement("button");
                dropdown.classList.add("nav-item", "aDropdown");

                //Creating button to actualize the hover and setting the attributes
                const dropdownButton = document.createElement("li");
                dropdownButton.classList="nav-link";
                dropdownButton.textContent = buttonNames[i];
                dropdownButton.id = idNames[i];

                //Creating the dropdown content wrapper
                const dropdownMenu = document.createElement("li");
                dropdownMenu.classList.add("aDropdownContent");

                //Creating and appending the group name row 
                const groupDropdownItem = document.createElement("li");
                const groupSpan = document.createElement("span");
                groupSpan.textContent = "Christopher Nottingham";
                groupDropdownItem.appendChild(groupSpan);

                //Creating appending the github drop down
                const githubDropdownItem = document.createElement("li");
                const gitLink = document.createElement("a");
                gitLink.href = "https://github.com/Christopher-Nottingham/COMP3512-Assignment_2";
                gitLink.textContent = "Github URL";
                //Open link in new tab
                gitLink.setAttribute("target", "_blank");
                githubDropdownItem.appendChild(gitLink);

                //Appending all rows to the drop down list
                dropdownMenu.appendChild(groupDropdownItem);
                dropdownMenu.appendChild(githubDropdownItem);

                //Appending the list to the drop down
                dropdown.appendChild(dropdownButton);
                dropdown.appendChild(dropdownMenu);

                //appending the button to the postiioning element
                li.appendChild(dropdown);
                //appedning the postioning element to the other buttons
                ul.appendChild(li);


            }
            //Appending the project name to the header
            divContainer.appendChild(logo);
            //Appending the buttons to the header
            divContainer.appendChild(ul);
            //Appending the header container
            nav.appendChild(divContainer);
            //Appending the nav to the header in the DOM
            document.querySelector("#header").appendChild(nav);

            playlistViewHandler();

        }
    }
    //Resets the form
    function clearButtonHandler() {
        document.querySelector("#clearButton").addEventListener("click", function () {
            document.querySelector("#genreFilter").disabled = false;
            document.querySelector("#titleFilter").disabled = false;
            document.querySelector("#artistFilter").disabled = false;
            document.querySelector("#genreSearch").hidden = true;
            document.querySelector("#artistSearch").hidden = true;
            document.querySelector("#titleSearch").hidden = true;
        });
    }
    //Hides everything but butotns and text box to ensure form is poroplery handled
    function titleRadioButtonHandler() {
        document.querySelector("#titleFilter").addEventListener("click", function () {
            document.querySelector("#genreFilter").disabled = true;
            document.querySelector("#titleFilter").disabled = false;
            document.querySelector("#artistFilter").disabled = true;
            document.querySelector("#genreSearch").hidden = true;
            document.querySelector("#artistSearch").hidden = true;
            document.querySelector("#titleSearch").hidden = false;
            document.querySelector("#titleSearch").textContent = "";
        });
    }

    //Hides all other buttons and inputs to ensure form is poroplery handled 
    function artistRadioButtonHandler() {
        document.querySelector("#artistFilter").addEventListener("click", function () {
            document.querySelector("#genreFilter").disabled = true;
            document.querySelector("#titleFilter").disabled = true;
            document.querySelector("#artistFilter").disabled = false;
            document.querySelector("#genreSearch").hidden = true;
            document.querySelector("#artistSearch").hidden = false;
            document.querySelector("#artistSearch").childNodes[0].selected = true;
            document.querySelector("#titleSearch").hidden = true;
        });

    }
    //Hides all other buttons and inputs to ensure form is poroplery handled 
    function genreRadioButtonHandler() {
        document.querySelector("#genreFilter").addEventListener("click", function () {
            document.querySelector("#genreFilter").disabled = false;
            document.querySelector("#titleFilter").disabled = true;
            document.querySelector("#artistFilter").disabled = true;
            document.querySelector("#genreSearch").hidden = false;
            document.querySelector("#genreSearch").childNodes[0].selected = true;
            document.querySelector("#artistSearch").hidden = true;
            document.querySelector("#titleSearch").hidden = true;
        });
    }

    function filterButtonHandler() {
        document.querySelector("#filterButton").addEventListener("click", function () {
            //Getting all the inputs from the search form that have the name value of Search Filter
            const radioButtons = document.querySelectorAll('input[name="searchFilter"]');
            //Looping through all the radio buttons
            for (let i = 0; i < radioButtons.length; i++) {
                //If it is checked then what value is it?
                if (radioButtons[i].disabled == false) {
                    // If it was the artist radio button then go in
                    // Same logic applies to others but diffrent values
                    if (radioButtons[i].value == "artist") {
                        //Getting all the options
                        const options = document.querySelectorAll("#artistSearch option");
                        for (o of options) {
                            //Getting found one and processing info
                            if (o.selected) {
                                //Getting the artist id and then searching for all songs that contain that id
                                const id = o.dataset.artist;
                                const selectedArtist = songs.filter(function (s) {
                                    return s.artist.id == id;
                                }
                                );

                                //Clearing and cheking the temp sort array
                                if (sortedSongs.length != 0) {
                                    clearSortedSongs();
                                    //Adding all the matched aritst to the temp sort table
                                    sortedSongs.push(...selectedArtist);
                                } else {
                                    sortedSongs.push(...selectedArtist);
                                }
                                //Removes all old table content
                                removeTable("songTable");
                                //Automattically sort the sorting array by the title
                                sortByTitle();
                                //Adds all songs from the sorting array to the table body rows
                                addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                                sorter();
                                songClickHandler();
                                addToPlaylistButtonHandler();
                            }
                        }
                    } else if (radioButtons[i].value == "genre") {
                        const options = document.querySelectorAll("#genreSearch option");
                        for (o of options) {
                            if (o.selected) {
                                const id = o.dataset.genre;
                                const selectedGenre = songs.filter(function (s) {
                                    return s.genre.id == id;
                                }
                                );
                                if (sortedSongs.length != 0) {
                                    clearSortedSongs();
                                    sortedSongs.push(...selectedGenre);
                                } else {
                                    sortedSongs.push(...selectedGenre);
                                }
                                removeTable("songTable");
                                sortByTitle();
                                addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                                sorter();
                                addToPlaylistButtonHandler();
                            }
                        }
                    } else {
                        let choosenValue = document.querySelector("#titleSearch").value;
                        const desiredSong = songs.find(item => item.title == choosenValue);
                        if (sortedSongs.length != 0) {
                            clearSortedSongs();
                            sortedSongs.push(desiredSong);
                        } else {
                            sortedSongs.push(desiredSong);
                        }
                        removeTable("songTable");
                        sortByTitle();
                        addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                        sorter();
                        addToPlaylistButtonHandler();
                    }
                }
            }

        }
        );
    }

    //Clears all songs in the temp sorting array
    function clearSortedSongs() {
        for (s of sortedSongs) {
            //Remove the last element
            sortedSongs.pop();
        }
        //Remvoe the first element
        sortedSongs.shift();
    }

    //Creating the table headers of from desired array
    function createTable(tableId) {
        const table = document.createElement("table");
        table.id = tableId.substring(1);
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
        tableHead.textContent = "";
        tableRow.appendChild(tableHead);
        tableMainHead.appendChild(tableRow);
        table.appendChild(tableMainHead);
        return table;
    }
    //Creating all the table body rows from an array
    function addNewSongContentToTable(desiredArray, buttonTextContent, buttonId, tableId) {
        
        let aId = tableId;
        let tableBody = document.createElement("tbody");
      
        for (let i = 0; i < desiredArray.length; i++) {
            tableRow = document.createElement('tr');
            tableRow.dataset.song = desiredArray[i].song_id;
            let tableColumn = document.createElement('td');
            tableColumn.textContent = desiredArray[i].title;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = desiredArray[i].artist.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = desiredArray[i].year;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = desiredArray[i].genre.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = desiredArray[i].details.popularity;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('button');
            tableColumn.textContent = buttonTextContent;
            tableColumn.id = buttonId
            tableRow.appendChild(tableColumn);
            tableBody.appendChild(tableRow);
        }

      

        //Adding a br to make space at bottom of table
        const br = document.createElement("br");



        //Adding the table to table body to the table id that was given in param
        document.querySelector("#" + tableId).append(tableBody);
      

    }

    //Function automattically removes all the table
    function removeTable(tableID) {
        const trs = document.querySelectorAll("#" + tableID + " tbody");
        if (trs != undefined) {
            //From stackoverflow 
            //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
            //reponse to a question 
            // code is from HuntsMan but modified to access my table ID
            document.querySelectorAll("#" + tableID + " tbody").forEach(function (e) { e.remove() });
        }
    }

    // function deals with sorting tables by their headers
    function sorter() {
        let id = "songTable";
        const tableHeaders = document.querySelectorAll("#" + id + " thead th");
        const sortValue = document.querySelector("#sortingIndicator");
        
        tableHeaders.forEach(column => {
            column.addEventListener('click', () => {

                if (column.textContent == "Title") {
                    removeTable(id);
                    sortByTitle();
                    addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                    sortValue.textContent = "Sorted by: Title";
                    sorter();
                    addToPlaylistButtonHandler();
                    songClickHandler();
                } else if (column.textContent == "Artist") {
                    removeTable(id);
                    sortByArtist();
                    sortValue.textContent = "Sorted by: Artist";
                    addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                    sorter();
                    addToPlaylistButtonHandler();
                    songClickHandler();
                } else if (column.textContent == "Genre") {
                    removeTable(id);
                    sortByGenre();
                    sortValue.textContent = "Sorted by: Genre";
                    addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                    sorter();
                    addToPlaylistButtonHandler();
                    songClickHandler();
                } else if (column.textContent == "Year") {
                    removeTable(id);
                    sortByYear();
                    sortValue.textContent = "Sorted by: Year";
                    addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                    sorter();
                    addToPlaylistButtonHandler();
                    songClickHandler();
                } else if (column.textContent == "Popularity") {
                    removeTable(id);
                    sortByPopularity();
                    sortValue.textContent = "Sorted by: Popularity";
                    addNewSongContentToTable(sortedSongs, "Add", "add", "songTable");
                    sorter();
                    addToPlaylistButtonHandler();
                    songClickHandler();
                } else {

                }
            });
        });
    }

    //Function makes add button in the search page add to the playlist
    function addToPlaylistButtonHandler() {
        //gets all the buttons
        const buttons = document.querySelectorAll("#add");
        //Looping through all the add buttons
        for (let i = 0; i < buttons.length; i++) {
            //When a button is clicked add the song to the play list
            buttons[i].addEventListener("click", () => {
                //Get the table data element of the add button  
                const clickedRow = buttons[i].parentNode;

                //Accessing the song id from the object above
                const clickedID = clickedRow.dataset.song;

                //Finding the song in the song array 
                const selectedSong = songs.find(s => s.song_id == clickedID);

                //Creating the bootstrap toast
                const toast = document.createElement("div");
                //Making the toast hidden at first and creating the container
                toast.classList.add("toast-container", "hide");
            
                //The toast header
                const header = document.createElement("div");
                header.classList = "toast-header";
                const strongTitle = document.createElement("strong");
                strongTitle.textContent = "Playlist Edited";
                header.appendChild(strongTitle);

                //The toast body
                const toastBody = document.createElement("div");
                toastBody.classList = "toast-body";
                // Making a p tag for displaying what song was added to the playlist and appending it to the toast body
                const p = document.createElement("p");
                p.textContent = "Added: " + selectedSong.title + " by " + selectedSong.artist.name;
                toastBody.appendChild(p);

                //Appeding everything requred to make the toast
                toast.appendChild(header);
                toast.appendChild(toastBody);
                
                //Appending the toast to the document
                //Had troubles placing it without it being at the bottom left of the screen
                document.querySelector("body").appendChild(toast);

                //Adding the chosen song to the playlist
                playlist.push(selectedSong);

                //Making the toast hidden after 5 seconds
                setTimeout(() => {
                    //Removing the toast from the DOM
                    toast.remove();
                }, 5000);

                
            });
        }
    }


    

    //Bellow is for the single song  

    //Creates the song header for the page
    createSingleSongSearch();
    function addSingleSongHeaders() {
        const songHeading = document.createElement("h2");
        songHeading.textContent = "Song Information";
        return songHeading;
    }

    //Function that loops through all the songs in the playist to get the average popularity
    function getAvgPopulatirty() {
        let count = 0;
        let sum = 0;
        for (let i = 0; i < playlist.length; i++) {
            count++;
            sum += playlist[i].details.popularity;
        }
        const avg = sum / playlist.length;
        return avg;
    }

    function removeSingleSongInfo() {
        const divs = document.querySelectorAll("#singleSongWrapper div");
        if (divs != undefined) {
            //From stackoverflow 
            //reponse to a question 
            // code is from HuntsMan but modified to access my table ID
            divs.forEach(function (e) { e.remove() });
        }
        document.querySelectorAll("#singleSongWrapper").hidden = false;
    }
    function addSingleSongInfo(song) {
        //Removing all song info
        removeSingleSongInfo();
        //Creating a br element for line brake
        const br = document.createElement("br");
        //creating the song info column
        const r1col1 = document.createElement("div");
        //adding the grid sizing
        r1col1.classList = "col-8";
        //The text wrapper
        const songInfo = document.createElement("div");
        songInfo.classList = "row"

        //creating the header for the text wrapper
        const header = addSingleSongHeaders();
        r1col1.appendChild(header);
        r1col1.appendChild(br);
        const info = addSingleSongDiv(song);
        r1col1.appendChild(info);
        r1col1.appendChild(br);

        //Creating and appending all the song analytics to the column
        const songtextContent = ["", "Danceability: " + song.analytics.danceability, "Liveness: " + song.analytics.liveness, "Energy: " + song.analytics.energy, "Speechiness: " + song.analytics.speechiness, "Acousticness: " + song.analytics.acousticness, "Valenace: " + song.analytics.valence, ""];
        const li = document.createElement("li");
        li.textContent = "Analysis Data:";

        //Making the text bold and
        li.style.fontWeight = "bold";
        
        //Looping trough the songtextContent and appeding the information to the lit
        let ul = document.createElement("ul");   
        li.appendChild(ul);
        for (s of songtextContent) {
            const ul = document.createElement("ul");
            ul.textContent = s;
            li.appendChild(ul);
        }


        //appending the list to the column
        r1col1.appendChild(li);

        //Creating the radar chart column
        const r1col2 = document.createElement("div");
        r1col2.classList = "col-4";
        const radarChartFiller = document.createElement("canvas");
        
        //Setting desired height and width of canvas element
        radarChartFiller.height = 500;
         radarChartFiller.width = 500;

         //
        radarChartFiller.id = "songChart";
        //making a random elemnt to make ensur the filler element will be appended to the page for later processing
        const smth = document.createElement("span");
        smth.textContent = "filler";
        radarChartFiller.appendChild(smth);

        //Appending the chart filler (procced later) to the column
        r1col2.append(radarChartFiller);

        //Appending to the everyting to the row
        songInfo.appendChild(r1col1);
        songInfo.appendChild(r1col2);

        //Creating and appending the row to the page 'view'
        const wrapper = document.createElement("div");
        wrapper.classList = "container";
        wrapper.appendChild(songInfo);

        //Appending the page 'view' to the DOM
        document.querySelector("#singleSongWrapper").appendChild(wrapper);

        //Adding the chart from the selected song info
        addRadarChart(song);
    }

    function addRadarChart(song) {
        //Getting the node for appending
        const radarChart = document.querySelector("#songChart");
        //Creating the chart object
        const chart = new Chart(radarChart, {
            type: 'radar',
            data: {
                labels: ['Danceability', 'Energy', 'Speachness', 'Accousticness', 'Livness', 'Valence'],

                datasets: [{
                    fontColor: 'white',
                    label: song.title,
                    data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence],
                    backgroundColor: 'rgba(125, 198, 206, 0.4)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                }],
            },
         
                
            
            options: {
                    responsive: false,
                    scale :{
                        gridLines : { circular: true}
                    },
            },
        });


    }
    //The creating the div that holds all info about the song
    function addSingleSongDiv(song) {
        const songInfoDiv = document.createElement("div");
        const duration = secondsToMinutes(song);
        const type = getArtistType(song);
        songInfoDiv.textContent = song.title + ",  " + song.artist.name + ", " + type + ", " + song.genre.name + ", " + song.year + ", " + duration;
        return songInfoDiv;
    }
    //Bellow is for the playlist page
    function playlistViewHandler() {
        const btn = document.querySelector("#playlistView");
        btn.addEventListener("click", () => {
            document.querySelector("#playlistWrapper").hidden = false;
            document.querySelector("#playlistView").hidden = true;
            document.querySelector("#singleSongWrapper").hidden = true;
            showPlayist();
            closePlaylistViewButtonHandler();
            clearAllPlaylist();
            playListSongClickHandler();
            removeSongFromPlaylist();
            
        });
    }

    function removePlaylistInfo() {
        //Querying all things in the playlist
        const divs = document.querySelectorAll("#playlistWrapper div");
        if (divs != undefined) {
            //From stackoverflow 
            //https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table
            //reponse to a question 
            // code is from HuntsMan but modified to access my table ID

            //Programatically going through all the nodes and
            //using the remove method which deletes the node 
            //from the DOM 
            divs.forEach(function (e) { e.remove() });
        }
    }

    //Adding a click event lisitner to all rows of the playlist table
    //to get more informationin the single song page
    function playListSongClickHandler() {
        const tableRows = document.querySelectorAll("#playlistTable tbody tr");
        for (let i = 0; i < tableRows.length; i++) {
            for (let j = 0; j < 5; j++) {
                tableRows[i].childNodes[j].addEventListener("click", function () {
                    const clickedRow = tableRows[i];
                    const clickedID = clickedRow.dataset.song;
                    const selectedSong = songs.find(s => s.song_id == clickedID);
                
                   
                     addSingleSongInfo(selectedSong);
                     addRadarChart(selectedSong);
               
                    document.querySelector("#basicSongWrapper").hidden = true;
                    document.querySelector("#playlistCloseView").hidden = true;
                    document.querySelector("#playlistView").hidden = true;
                    document.querySelector("#singleSongCloseView").hidden = false;
                    document.querySelector("#singleSongWrapper").hidden = false;
                    document.querySelector("#playlistWrapper").hidden = true;
                    document.querySelector("#basicSongSearchCloseView").hidden = true;
            
                });
            }
        }
        
    }
    //Creates the playlist 'view'
    function showPlayist() {

        //Deleting old playlist view page info
         removePlaylistInfo();

        //Creating the table body and table head
        const table = createPlayListTable();

        //Creating the table body rows
        const info = createPlaylistInfo();

        const container = document.createElement("div");
        container.classList="container";
        

        
        //Querying the node that the table will be appended to
        const appender = document.querySelector("#playlistWrapper");
        

        container.appendChild(info);
        container.appendChild(table);
     
        //Appending all to the wrapper class for the page
        appender.appendChild(container);
        

         playListSongClickHandler();
      
        
        //Removing access to the user to pages and buttons that break the logic
        document.querySelector("#basicSongWrapper").hidden = true;
        document.querySelector("#playlistView").hidden = true;
        document.querySelector("#playlistCloseView").hidden = false;
        document.querySelector("#singleSongCloseView").hidden = true;
        document.querySelector("#basicSongSearchCloseView").hidden = true;

        clearPlaylistHandler();

    }
    function clearAllPlaylist() {
        const btn = document.querySelector("#clearPlaylist");
        

        //Getting the clear all button

        //Adding all the event listnew and removes all data from the playlist
        btn.addEventListener("click", () => {
            for (s of playlist) {
                playlist.pop();
            }
         
        });
        showPlayist();



    }
    // displayPlayList();
    function createPlayListTable() {
        //Creating the playlist table element
        const songTable = document.createElement("div");
        //
        songTable.setAttribute("id", "playlistTable");
        songTable.style.placeSelf = "center";

        //Centering everything in the table
        songTable.className = "justify-content-center";
        const table = document.createElement("table");
        //Making the ID
        table.id = "playlistTable";

        //Creating the table head and appending to table
        let tableMainHead = document.createElement("thead");
        table.appendChild(tableMainHead);

        //Using let to allow object change and creating the table head columns
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
        //Empty Column with no text for remove buttons
        tableHead = document.createElement('th');
        tableHead.textContent = ""
        tableRow.appendChild(tableHead);

        //Appednign all all the created head rows to table head
        tableMainHead.appendChild(tableRow);
        //appending the table head to the table
        table.appendChild(tableMainHead);

        //Creating the table body
        let tableBody = document.createElement("tbody");
        //Adding all the body row info from the playlist
        for (let i = 0; i < playlist.length; i++) {
            tableRow = document.createElement('tr');
            tableRow.dataset.song = playlist[i].song_id;
            let tableColumn = document.createElement('td');
            tableColumn.textContent = playlist[i].title;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = playlist[i].artist.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = playlist[i].year;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = playlist[i].genre.name;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('td');
            tableColumn.textContent = playlist[i].details.popularity;
            tableRow.appendChild(tableColumn);
            tableColumn = document.createElement('button');
            tableColumn.textContent = "Remove";
            tableColumn.id = "remove"
            tableRow.appendChild(tableColumn);
            tableBody.appendChild(tableRow);
            table.appendChild(tableBody);
        }

        //Creating the postioning column for the table
        const col = document.createElement("div");
        col.className = "col-12";
        //Appendning the table to the postioning column
        col.appendChild(table);

        const row = document.createElement("div");
        row.classList="row";
        row.appendChild(col);

        //adds the sorting indicator to the page
        sorter();

        //Getting all the table body rows
        const tableRows = document.querySelectorAll("#playlist table tbody tr");

       

        // playListSongClickHandler();
        //Returning the table object
        return row;
    }


    //Creating the playlist info page 
    function createPlaylistInfo() {

        const header = document.createElement("h2");
        header.textContent = "Playlist Details";
        const col1 = document.createElement("div");
        col1.classList = "col-4";
        const col2 = document.createElement("div");
        col2.classList = "col-4";
        const col3 = document.createElement("div");
        col3.classList = "col-4";


        let count = playlist.length;
        let avg = getAvgPopulatirty();

        col1.appendChild(header);

        const playlistInfo = document.createElement("div");
        playlistInfo.textContent = "Numberof Songs: " + count + ". Average Popularity: " + avg + ". ";

        col2.append(playlistInfo);

        const clearButton = document.createElement("button");
        clearButton.id = "clearPlaylist";
        clearButton.textContent = "Clear Playlist"

        col3.appendChild(clearButton);

        const row = document.createElement("div");
        row.classList = "row";

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);

        return row;

    }

    // //The button that lets users see the playlist
    // function showPlayistHandler() {
    //     const button = document.querySelector("#playlistView");
    //     button.addEventListener("click", () => {
    //         //Removes all old info
    //         //  removePlaylistInfo();

    //         //Removes the single song from view
    //         document.querySelector("#singleSongWrapper").hidden = true;
    //         //Shows the playist view
    //         document.querySelector("#playlistWrapper").hidden = false;
    //         //Creates the new playlist page with new info 
    //         showPlayist();
    //     });
    // }

    //Clears the whole playlist
    function clearPlaylistHandler() {
        const button = document.querySelector("#clearPlaylist");
            button.addEventListener("click", () => {
            for (s of playlist){
                playlist.pop();
            }
            removePlaylistInfo();
            showPlayist();
            });
        }

    
    //Removes a specific song from the playlist
    function removeSongFromPlaylist() {
        //Querying all the table body rows
        const buttons = document.querySelectorAll("#remove");
        for (let i = 0; i < buttons.length; i++) {
            //Looping through all table body rows to add the event listner
            buttons[i].addEventListener("click", () => {
                //finding the JSON object of the desired removal song
                const selected = playlist.find(s => s.song_id == buttons[i].parentNode.dataset.song);
                //Loops trough every column but the remove column
                for (let j = 0; j < playlist.length; j++) {
                    if (playlist[j].song_id == selected.song_id) {
                        //Removes the song at index with only the one song deleted
                        playlist.splice(j, 1);
                        //Remoing all eveything including outdated playlist
                        removePlaylistInfo();
                        //Showing everything and the new table with the chosen song removed
                        showPlayist();
                    }
                }
               
            });
        }
    }
    

    //Closes the playlist page
    function closePlaylistViewButtonHandler() {
        const close = document.querySelector("#playlistCloseView");
        //If clicked it will go back to the search page
        close.addEventListener("click", function () {
            document.querySelector("#singleSongWrapper").hidden = true;
            document.querySelector("#playlistWrapper").hidden = true;
            document.querySelector("#basicSongWrapper").hidden = false;
            document.querySelector("#playlistView").hidden = false;
            document.querySelector("#playlistCloseView").hidden = true;
        });
    }



    //Below  is for the footer
    function createFooter() {
        const p = document.createElement("p");
        const span = document.createElement("span");
        const footerDiv = document.createElement("div");
        const footer = document.querySelector("#footer");
        footerDiv.classList = "container";
        footerDiv.classList = "bg-primary";
        p.innerHTML = "&copy COMP 3512 Assingment 2 - Christopher";
        footerDiv.appendChild(span);
        footerDiv.appendChild(p);
        footer.appendChild(footerDiv);
    }
});