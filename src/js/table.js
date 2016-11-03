var initEventRow = ($event) => {
    $event.find('.event-time').editable({
        name: 'time',
        type: 'combodate',
        format: 'HH:mm',
        template: 'HH:mm',
        send: 'always',
        combodate: {
            minuteStep: 1
        }
    });
    $event.find('.event-show').editable({
        name: 'show',
        type: 'text',
        placeholder: 'Название программы'
    });
    $event.find('.event-episode').editable({
        name: 'episode',
        type: 'text',
        placeholder: 'Название выпуска'
    });
    $event.find('.event-code').editable({
        name: 'code',
        type: 'text',
        placeholder: 'JKLU00514',
        validate: (value) => {
            if (!/^[A-Z]{4}\d+$/.test(value)) {
                return 'Неверный формат кода';
            }
        }
    });

    let saveHandler = () => {
        setTimeout(() => {
            saveEvent($event);
        }, 10);
    };
    $event.find('.event-prop').on('save', saveHandler);

    $event.find('.btn-remove').click(() => {
        let id = $event.data('id');
        if (id) {
            let api = new SchedulerAPI();
            api.remove(id);
        }
        $event.remove();
    });
};

var transform = (data) => {
    let date = null;
    if (data.time) {
        let [hour, min] = data.time.split(':');
        date = currentDate().hour(hour).minute(min).second(0).millisecond(0);
        date = date.toISOString();
    }

    return {
        date: date,
        show: {
            code: data.code.substring(0, 4),
            title: data.show
        },
        episode: {
            code: data.code,
            title: data.episode
        }
    };
};

var getEventData = ($event) => {
    return $event.find('.event-prop').editable('getValue');
};

var saveEvent = ($event) => {
    let api = new SchedulerAPI();
    let id  = $event.data('id');

    let data = getEventData($event);
    data = transform(data);

    if (!data.date) {
        return;
    }

    // Inject position
    data.position = $('.event').index($event);

    if (id) {
        api.update(id, data).then(
            (result) => {
                updateEvent($event, result);
            },
            (result) => {
                console.error(result);
            }
        );
    } else {
        api.create(data).then(
            (result) => {
                updateEvent($event, result);
            },
            (result) => {
                console.error(result);
            }
        );
    }
};

var setState = ($event, state) => {
    let elClass = '';
    switch (state) {
        case 'free': elClass = 'warning'; break;
        case 'linked': elClass = ''; break;
        case 'sync': elClass = 'info'; break;
    }

    $event.removeClass('warning info').addClass(elClass);
};

var updateEvent = ($event, data) => {
    let date = moment(data.date).utcOffset(AppConfig.timezone);

    setState($event, data.state);
    $event.data('id', data.id);
    $event.find('.event-time').editable('setValue', date);
    $event.find('.event-show').editable('setValue', data.show.title);
    $event.find('.event-episode').editable('setValue', data.episode.title);
    $event.find('.event-code').editable('setValue', data.episode.code);
};

var loadEventList = (date) => {
    let $table = $('.table');
    let api    = new SchedulerAPI();

    // Clean table
    $table.find('tbody > tr').remove();

    api.list(date.format('YYYY-MM-DD')).then(
        (result) => {
            for (let event of result.data) {

                let $row = newRow();
                initEventRow($row);
                updateEvent($row, event);

                $row.appendTo($table);
            }
        },
        (result) => {
            console.error(result.error);
        }
    );
};
