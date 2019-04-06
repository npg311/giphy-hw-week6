function displayGifs() {
 	$("#your-mood-gifs").empty();
	var gifs = {};
	var rating='', gifURLstill='', gifScore=0, i;
    var mood = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=97SO4uqyeNoZXQ9F6uqIYk9V3i0MY54J&limit=10";
            // Creating an AJAX call for the specific gif button being clicked
           //console.log(mood,queryURL);
          $.ajax({
               "url": queryURL,
               "method": "get"
			})
			.done(function (response) {
				responseX=JSON.stringify(response.data);		
				gifs=JSON.parse(responseX);	
				for (var i = 0; i < gifs.length; i++){
					rating= gifs[i].rating;
					gifURLstill = gifs[i].images.fixed_height_still.url;
					gifURLanimate=gifs[i].images.fixed_height.url;
					gifScore = gifs[i]._score;
					gifTitle = gifs[i].title;
                    var gifDiv = $("<div class= \"gipheee\">");
                    var ratingHTML = $("<p>").text("Giphy Rating: " + rating);
					var scoreHTML = $("<p>").text("Giphy Score: " + gifScore);
					var titleHTML = $("<p>").text(gifTitle);
					var image = $("<img>");
                    image.attr("src", gifURLstill);
                    image.attr("data-still", gifURLstill);
                    image.attr("data-animate", gifURLanimate);
					image.attr("data-state", "still");
					image.addClass("giphy");
                   	gifDiv.append(image);
					gifDiv.append(titleHTML);
                   	gifDiv.append(ratingHTML);
                   	gifDiv.append(scoreHTML);
                   $("#your-mood-gifs").append(gifDiv);				
				}
			return gifs;
		});
}

function renderButton() {
 	$("#your-mood-gifs").empty();
   for (var i = 0; i < moods.length; i++) {
        var j = $("<button>");
        	j.addClass("gif-btn");
            j.attr("data-name", moods[i]);
            j.text(moods[i]);
         $("#moodButtons").append(j);
      }
 }
 
function addMoodButton(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-name", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

 }
   
 //play pause
function animate() {
     var state = $(this).attr("data-state");
     if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
     }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
     }
}

$("#add-mood").on("click", function(event) {
    event.preventDefault();
    var newMood = $("input").val();
    moods.push(newMood);
    addMoodButton(moods, "gif-btn", "#moodButtons");
 });
 
var moods = ["happy", "sad", "wild", "tired", "frusterated", "scared", "joyful", "focused", "nervous", "silly"];

$(document).on("click", ".gif-btn", displayGifs); 
$(document).on("click", ".giphy", animate);

$(document).ready(function() {
	renderButton();
});