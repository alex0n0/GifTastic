let arrAnimals = ['giraffe', 'chicken', 'tiger'];
function renderPage(arr) {
    for (let i = 0; i < arr.length; i++) {
        prependButton(arr[i]);
    }
}
renderPage(arrAnimals);



$('#formButtonSubmit').on('click', submitFunction);

function submitFunction(e) {
    e.preventDefault();
    
    let inputString = $('#formInputAnimal').val().trim();
    $('#formInputAnimal').val('');

    //prevent button creation if text input is empty
    if (inputString.length != 0) {
        inputString = inputString.toLowerCase();

        //prevent multiples of the same button
        if (!arrAnimals.toString().includes(inputString)) {
            arrAnimals.push(inputString);
            prependButton(inputString);
        }
    }
}

function prependButton(inputString) {


    let button = $('<button>');
    button.attr('class', 'btn btn-primary m-1');
    button.attr('data-searchterm', inputString);
    inputString = inputString.charAt(0).toUpperCase() + inputString.substring(1, inputString.length);
    button.html(inputString);
    $('#containerButtons').prepend(button);
    button.on('click', retreiveGif);
}

function retreiveGif(e) {
    $('#containerGifs').empty();


    var animal = $(this).attr("data-searchterm");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let results = response.data;
        console.log(response.data);


        for (let i = 0; i < results.length; i++) {
            let card = $('<div>');
            card.attr('class', 'col-6 border border-danger');
            let p = $('<p></p>');
            p.text("Rating: " + results[i].rating);
            card.prepend(p);
            let img = $('<img>');
            img.attr('src', results[i].images.fixed_height.url);
            img.attr('class', 'img-fluid');
            card.prepend(img);
            $('#containerGifs').prepend(card);
        }

    });
}

