let arrFoods = ['pizza', 'pie', 'cheese', 'hamburger', 'fries', 'soda', 'coffee', 'steak', 'salad', 'soup'];
function renderPage(arr) {
    for (let i = 0; i < arr.length; i++) {
        prependButton(arr[i]);
    }
}
renderPage(arrFoods);

function prependButton(inputString) {
    let button = $('<button>');
    button.attr('class', 'btn btn-primary m-1');
    button.attr('data-searchterm', inputString);
    inputString = inputString.charAt(0).toUpperCase() + inputString.substring(1, inputString.length);
    button.html(inputString);
    $('#containerButtons').prepend(button);
    button.on('click', retreiveGifFirstTime);
}










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










function retreiveGifFirstTime(e) {
    $('#containerGifs').empty();

    let food = $(this).attr("data-searchterm");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    let offset = 10;
    if (offset != 0) {
        queryURL += '&offset=' + offset;
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;

        for (let i = 0; i < results.length; i++) {
            console.log(results[i]);
            let card = $('<div>');
            card.attr('class', 'col-12 col-sm-6 py-3 cardItem');
            
            let img = $('<img>');

            let fixedHeightGif = results[i].images.fixed_height.url;
            let fixedHeightStill = results[i].images.fixed_height_still.url
            img.attr('src', fixedHeightStill);
            img.attr('class', 'img-fluid');

            img.on('mouseenter', function() {
                img.attr('src', fixedHeightGif);
            });
            img.on('mouseleave', function() {
                img.attr('src', fixedHeightStill);
            });
            card.append(img);


            let pRating = $('<p></p>');
            pRating.html("<b>Rating:</b> " + results[i].rating);
            card.append(pRating);

            let pTitle = $('<p></p>');
            pTitle.html("<b>Title:</b> " + results[i].title);
            card.append(pTitle);



            $('#containerGifs').append(card);
        }
    });

}

