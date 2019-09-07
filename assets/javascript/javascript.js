let arrFoods = ['pizza', 'pie', 'cheese', 'hamburger', 'fries', 'soda', 'coffee', 'steak', 'salad', 'soup'];

//generate a base set of buttons from the arrFoods array
renderPage(arrFoods);
function renderPage(arr) {
    for (let i = 0; i < arr.length; i++) {
        prependButton(arr[i]);
    }
}

//click event for creating new buttons
$('#formButtonSubmit').on('click', submitFunction);
function submitFunction(e) {
    e.preventDefault();

    let inputString = $('#formInputFood').val().trim();
    $('#formInputFood').val('');

    //prevent button creation if text input is empty
    if (inputString.length != 0) {
        inputString = inputString.toLowerCase();

        //prevent multiples of the same button
        if (!arrFoods.toString().includes(inputString)) {
            arrFoods.push(inputString);
            prependButton(inputString);
        }
    }
}

// helper function to add new buttons to the button set
function prependButton(inputString) {
    let button = $('<button>');
    button.attr('class', 'btn btn-primary m-1');
    button.attr('data-searchterm', inputString);
    inputString = inputString.charAt(0).toUpperCase() + inputString.substring(1, inputString.length);
    button.html(inputString);
    $('#containerButtons').prepend(button);
    button.on('click', retrieveGifFirstTime);
}







//variable used for "show more" functionality
let offset = 0;

//function for first iteration of retrieving gifs
function retrieveGifFirstTime(e) {
    offset = 0;
    $('#containerGifs').empty();
    let food = $(this).attr("data-searchterm");

    retrieveGifAjax(food);
}

//helper function to allow offset query functionality
function retrieveGifAjax(food) {

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    if (offset != 0) {
        queryURL += '&offset=' + offset;
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            let card = $('<div>');
            card.attr('class', 'col-12 col-sm-6 py-3 cardItem');

            //code for img
            let img = $('<img>');
            let fixedHeightGif = results[i].images.fixed_height.url;
            let fixedHeightStill = results[i].images.fixed_height_still.url
            img.attr('src', fixedHeightStill);
            img.attr('class', 'img-fluid mb-3');

            img.on('mouseenter', function () {
                img.attr('src', fixedHeightGif);
            });
            img.on('mouseover', function () {
                img.attr('src', fixedHeightGif);
            });
            img.on('mouseleave', function () {
                img.attr('src', fixedHeightStill);
            });
            card.append(img);

            //code for saving gif
            let saveButton = $('<button>');
            saveButton.attr('class', 'btn btn-success mb-3 d-block');
            saveButton.text('SAVE');
            let save = false;

            saveButton.on('click', function () {
                save = !save;
                if (save) {
                    saveButton.text('REMOVE');
                    saveButton.attr('class', 'btn btn-danger mb-3 d-block');
                    $(this).parent().detach();
                    $('#containerSavedGifs').append($(this).parent());
                    $(this).parent().attr('class', 'col-6 col-sm-12 py-3 cardItem');
                } else {
                    $(this).parent().remove();
                }
            });
            card.append(saveButton);

            //code for meta data text
            let pRating = $('<p>');
            pRating.html("<b>Rating:</b> " + results[i].rating);
            card.append(pRating);

            let pTitle = $('<p>');
            pTitle.html("<b>Title:</b> " + results[i].title);
            card.append(pTitle);

            //code for link to source site
            let buttonSource = $('<a>');
            buttonSource.attr('class', 'btn btn-secondary mt-3');
            buttonSource.attr('href', results[i].bitly_url);
            buttonSource.attr('target', '_blank');
            buttonSource.html("Source");
            card.append(buttonSource);

            //attaching the gif card to the page
            $('#containerGifs').append(card);
        }

        //code for show more button
        let buttonShowMore = $('<button>');
        buttonShowMore.attr('class', 'btn btn-link position-relative col-12');
        buttonShowMore.attr('style', 'left: 50%; transform: translateX(-50%);');
        buttonShowMore.text('Show More');
        buttonShowMore.on('click', function() {
            buttonShowMore.remove();
            offset += 10;
            retrieveGifAjax(food);
        });
        $('#containerGifs').append(buttonShowMore);
    });
}
