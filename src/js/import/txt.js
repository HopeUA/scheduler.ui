var codeReg = /^[A-Z]{4}\d+$/;
var timeReg = /^\d{2}:\d{2}$/;

/**
 * TXT file import
 */
$(() => {

    $('.fileinput').on('change.bs.fileinput', (e) => {
        let files = $(e.target).find('input[type="file"]')[0].files;

        if (!files.length) {
            return;
        }

        let file = files[0];

        let reader = new FileReader();
        reader.onload = ((theFile) => {
            return (e) => {
                let text   = e.target.result;
                let events = text.split("\n").map((row, index) => {
                    let [time, code] = row.split("\t");

                    if (!time || !code) {
                        return {
                            error: {
                                message: 'Не удалось обработать строку',
                                line: index
                            }
                        }
                    }

                    time = time.trim();
                    code = code.trim();

                    let errors = {};
                    if (!timeReg.test(time)) {
                        errors.time = time;
                    } else if (!codeReg.test(code)) {
                        errors.code = code;
                    }

                    if (errors.length) {
                        return {
                            error: {
                                message: errors,
                                line: index
                            }
                        };
                    }

                    return {
                        time: time,
                        code: code
                    }
                });

                // Clear event for day
                let api = new SchedulerAPI();
                let $table = $('.table');
                $table.find('tbody > tr').remove();

                api.removeList(currentDate().format('YYYY-MM-DD')).then(
                    () => {
                        // Display events

                        events.forEach((event) => {
                            if (event.error) {
                                return;
                            }

                            let $event = newRow();
                            initEventRow($event);
                            updateEvent($event, transform(event));

                            $event.appendTo($table);

                            // Save event
                            saveEvent($event);
                        });
                    },
                    (result) => {
                        console.log(result);
                    }
                );

            };
        })(file);
        reader.readAsText(file);
    })
});