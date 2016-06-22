var newRow = () => {
    let rowTpl = `
        <tr class="event info" data-key="">
            <td><a href="#" class="event-prop event-time"></a></td>
            <td><a href="#" class="event-prop event-show"></a></td>
            <td><a href="#" class="event-prop event-episode"></a></td>
            <td><a href="#" class="event-prop event-code"></a></td>
            <td>
                <span class="btn-remove">×</span>
            </td>
        </tr>
    `;

    return $(rowTpl);
};

/**
 * Button Add Row
 */
$(() => {
    let $btn   = $('.btn-add');
    let $table = $('.table');

    $btn.click(() => {
        let $row = newRow();
        initEventRow($row);

        $row.appendTo($table);
    });
});
