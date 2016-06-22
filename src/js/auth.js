/**
 * Auth token
 */
$(() => {
    let $btn   = $('.btn-auth');
    let $input = $('#token');

    $input.val(localStorage.getItem('authToken'));

    $btn.click((e) => {
        e.preventDefault();
        localStorage.setItem('authToken', $input.val());
    });
});