// global variables //
var topics = ["dogs", "cats", "birds", "lizards", "monkeys", "bears", "lions", "tigers", "sharks", "whales", "badgers", "rats", "snakes"];

var button;
var newTopic = "";

    // function to create button and add to list //
    var buttonGenerator = function () {

        $("#buttonArea").empty();

        for (i = 0; i < topics.length; i++) {
            button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning animalBtn").attr("data", topics[i]);
            $("#buttonArea").append(button);
        };
    }
    // function for clicking buttons and applying gifs to those buttons from the api //
    $(document).on("click", ".animalBtn", function () {
        var thing = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=uciWbXgRdXhHHLBACDDFhG8tMx86qk66&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function (response) {
            // console.log(response);//

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var topicDiv = $("<div>");

                var p = $("<p>");
                p.text(results[i].rating);
                var p = $("<p>").text("Rating: " + results[i].rating);


                var topicImage = $("<img>").addClass("btnBorder");


                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url)
                topicImage.attr("data-state", "still")
                topicImage.addClass("gif");


                topicDiv.append(topicImage);

                topicDiv.append(p);

                $("#gifArea").prepend(topicDiv);
            }
        })
    })
    // Gif starts off static and once clicked, it animates //
    $("#gifArea").on("click", ".gif", function (event) {
        event.preventDefault();

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })
    // Function to add button to list //
    $("#submit-btn").on('click', function(event){
        event.preventDefault();
        console.log($("#topic-input").val());
        topics.push($("#topic-input").val());
        buttonGenerator();   
    })
    // Calling the buttonGenerator function //
    buttonGenerator();
