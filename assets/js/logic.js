$(document).ready(function() { 





var rappers = ["Tupac", "Outkast", "Nas", "Andre 3000", "Rick Ross", "Young Jeezy", "Jay-Z"];
var crntGif;
var ptGif;
var pauseGif;
var startGif;



//function to create new button
function createBtn(){
$('#newArtistbtn').empty();
for(var i = 0; i < rappers.length; i++){
    var rapBtn = $('<button>').text(rappers[i])
    .addClass('rapBtn').attr({'data-name': rappers[i]});
    $('#newArtistbtn').append(rapBtn);
}

//allows btn once pressed to populate with gifs on page.
$('.rapBtn').on('click', function(){
    $('.display').empty();

    var thisRapper = $(this).data('name');
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" +
        rappers + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
    crntGif = giphy.data;
    $.each(crntGif, function(index, value){
        animatedGif = value.images.original.url;
        pausedGif = value.images.original_still.url;
        var thisRating = value.rating;
        if(thisRating == ''){
            thisRating = 'unrated';
        }
        var rating = $('<h5>').html('Rated:'+thisRating).addClass('ratingStyle');
        stillGif = $('<img>').attr  
        ('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
        var fullGifDisplay = $("<button>").append(rating, stillGif);
            $('.display').append(fullGifDisplay)
            

    });    
    });
});
}


$(document).on('mouseover','.playOnHover', function(){
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave','.playOnHover', function(){
    $(this).attr('src', $(this).data('paused'));
});

//on click shows values.
$('#addShow').on('click', function(){
    var rapShow = $('#rapShowInput').val().trim();
    rappers.push(rapShow);
    createButtons();
    return false;
});

    createBtn();

});
    