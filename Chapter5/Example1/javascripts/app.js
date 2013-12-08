var main = function () {
    "use strict";

    $.getJSON("cards/aceOfSpades.json", function (card) {
        // create an element to hold the card
        var $cardParagraph = $("<p>");

        // create the 
        $cardParagraph.text(card.rank + " of " + card.suit);

        // append the card paragraph to main
        $("main").append($cardParagraph);
    });

    $.getJSON("cards/hand.json", function (hand) {
        var $list = $("<ul>");

        // hand is an array, so we can iterate over it
        hand.forEach(function (card) {
            // create a list item to hold the card
            // and append it to the list
            var $card = $("<li>");
            $card.text(card.rank + " of " + card.suit);
            $list.append($card);
        });

        // append the list to main
        $("main").append($list);
    });
};

$(document).ready(main);
