$(document).ready(function() {
    const text = $('#about-html').text();
    $('#about-html').html($.parseHTML(text));
});