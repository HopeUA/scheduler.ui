var displayDate = (date) => {
    let $day     = $('.day-container');
    let $display = $('.day-current');

    loadEventList(date);

    $display.html(date.format('DD.MM.YYYY'));
    $day.data('date', date);
};

var currentDate = () => {
    let $day = $('.day-container');
    return $day.data('date');
};

/**
 * Date
 */
$(() => {
    let $day     = $('.day-container');
    let $prev    = $('.day-prev');
    let $next    = $('.day-next');

    let now = moment();
    displayDate(now);

    $prev.click(() => {
        let date = $day.data('date');
        date.subtract(1, 'day');
        displayDate(date);
    });
    $next.click(() => {
        let date = $day.data('date');
        date.add(1, 'day');
        displayDate(date);
    });
});
