const divMainMenu = document.querySelector('#main-menu');
const divLearn = document.querySelector('#learn');
const divPlay = document.querySelector('#play');
const divGallery = document.querySelector('#gallery');

// Load content of div tags
const dynamicDivs = document.getElementsByClassName('data-source');
console.log("Loading data-source...");
Array.prototype.forEach.call(dynamicDivs, function (el) {
    const div = $('#' + el.id)
    div.load(div.attr('data-source'));

    console.log("Loaded " + div.attr('data-source'));
});
