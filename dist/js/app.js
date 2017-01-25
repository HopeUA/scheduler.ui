'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var newRow = function newRow() {
    var rowTpl = '\n        <tr class="event info" data-key="">\n            <td><a href="#" class="event-prop event-time"></a></td>\n            <td><a href="#" class="event-prop event-show"></a></td>\n            <td><a href="#" class="event-prop event-episode"></a></td>\n            <td><a href="#" class="event-prop event-code"></a></td>\n            <td>\n                <span class="btn-remove">×</span>\n            </td>\n        </tr>\n    ';

    return $(rowTpl);
};

/**
 * Button Add Row
 */
$(function () {
    var $btn = $('.btn-add');
    var $table = $('.table');

    $btn.click(function () {
        var $row = newRow();
        initEventRow($row);

        $row.appendTo($table);
    });
});

var r = {
    post: function post(url, data) {
        return new Promise(function (resolve, reject) {
            var request = $.ajax({
                url: url,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function beforeSend(xhr) {
                    var token = getAuthToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', token);
                    }
                }
            });

            request.done(function (result) {
                resolve(result);
            });
            request.fail(function (error) {
                reject(error.responseJSON);
            });
        });
    },

    put: function put(url, data) {
        return new Promise(function (resolve, reject) {
            var request = $.ajax({
                url: url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function beforeSend(xhr) {
                    var token = getAuthToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', token);
                    }
                }
            });

            request.done(function (result) {
                resolve(result);
            });
            request.fail(function (error) {
                reject(error.responseJSON);
            });
        });
    },

    patch: function patch(url, data) {
        return new Promise(function (resolve, reject) {
            var request = $.ajax({
                url: url,
                method: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function beforeSend(xhr) {
                    var token = getAuthToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', token);
                    }
                }
            });

            request.done(function (result) {
                resolve(result);
            });
            request.fail(function (error) {
                reject(error.responseJSON);
            });
        });
    },

    'delete': function _delete(url) {
        return new Promise(function (resolve, reject) {
            var request = $.ajax({
                url: url,
                method: 'DELETE',
                beforeSend: function beforeSend(xhr) {
                    var token = getAuthToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', token);
                    }
                }
            });

            request.done(function (result) {
                resolve(result);
            });
            request.fail(function (error) {
                reject(error.responseJSON);
            });
        });
    }

};

var Base64 = { _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', encode: function encode(e) {
        var t = '';var n, r, i, s, o, u, a;var f = 0;e = Base64._utf8_encode(e);while (f < e.length) {
            n = e.charCodeAt(f++);r = e.charCodeAt(f++);i = e.charCodeAt(f++);s = n >> 2;o = (n & 3) << 4 | r >> 4;u = (r & 15) << 2 | i >> 6;a = i & 63;if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }return t;
    }, decode: function decode(e) {
        var t = '';var n, r, i;var s, o, u, a;var f = 0;e = e.replace(/[^A-Za-z0-9+/=]/g, '');while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));o = this._keyStr.indexOf(e.charAt(f++));u = this._keyStr.indexOf(e.charAt(f++));a = this._keyStr.indexOf(e.charAt(f++));n = s << 2 | o >> 4;r = (o & 15) << 4 | u >> 2;i = (u & 3) << 6 | a;t = t + String.fromCharCode(n);if (u != 64) {
                t = t + String.fromCharCode(r);
            }if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }t = Base64._utf8_decode(t);return t;
    }, _utf8_encode: function _utf8_encode(e) {
        e = e.replace(/rn/g, 'n');var t = '';for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);t += String.fromCharCode(r >> 6 & 63 | 128);t += String.fromCharCode(r & 63 | 128);
            }
        }return t;
    }, _utf8_decode: function _utf8_decode(e) {
        var t = '';var n = 0;var r = c1 = c2 = 0;while (n < e.length) {
            r = e.charCodeAt(n);if (r < 128) {
                t += String.fromCharCode(r);n++;
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);t += String.fromCharCode((r & 31) << 6 | c2 & 63);n += 2;
            } else {
                c2 = e.charCodeAt(n + 1);c3 = e.charCodeAt(n + 2);t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);n += 3;
            }
        }return t;
    } };

function getAuthToken() {
    var token = localStorage.getItem('authToken');
    if (!token) {
        return null;
    }

    return 'Bearer ' + Base64.encode(token);
}

var SchedulerAPI = (function () {
    function SchedulerAPI() {
        _classCallCheck(this, SchedulerAPI);

        this.endpoint = AppConfig.api.scheduler.endpoint;
    }

    _createClass(SchedulerAPI, [{
        key: 'list',
        value: function list(date) {
            var url = this.endpoint + '/events';

            return new Promise(function (resolve, reject) {
                var request = $.get(url, { date: date });

                request.done(function (result) {
                    resolve(result);
                });
                request.fail(function (error) {
                    reject(error.responseJSON);
                });
            });
        }
    }, {
        key: 'removeList',
        value: function removeList(date) {
            var url = this.endpoint + '/events/?date=' + date;
            return r['delete'](url);
        }
    }, {
        key: 'create',
        value: function create(data) {
            var url = this.endpoint + '/events';
            return r.post(url, data);
        }
    }, {
        key: 'update',
        value: function update(id, data) {
            var url = this.endpoint + '/events/' + id;
            //return r.put(url, data);
            return r.patch(url, data);
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            var url = this.endpoint + '/events/' + id;
            return r['delete'](url);
        }
    }]);

    return SchedulerAPI;
})();

/**
 * Auth token
 */
$(function () {
    var $btn = $('.btn-auth');
    var $input = $('#token');

    $input.val(localStorage.getItem('authToken'));

    $btn.click(function (e) {
        e.preventDefault();
        localStorage.setItem('authToken', $input.val());
    });
});
/* Global Config */
var AppConfig = {
    api: {
        scheduler: {
            endpoint: 'https://scheduler.s.hope.ua/v1'
            // endpoint: 'http://localhost:3000/v1'
        }
    },
    timezone: '+02:00'
};

var displayDate = function displayDate(date) {
    var $day = $('.day-container');
    var $display = $('.day-current');

    loadEventList(date);

    $display.html(date.format('DD.MM.YYYY'));
    $day.data('date', date);
};

var currentDate = function currentDate() {
    var $day = $('.day-container');
    return $day.data('date');
};

/**
 * Date
 */
$(function () {
    var $day = $('.day-container');
    var $prev = $('.day-prev');
    var $next = $('.day-next');

    var now = moment().utcOffset(AppConfig.timezone);
    displayDate(now);

    $prev.click(function () {
        var date = $day.data('date');
        date.subtract(1, 'day');
        displayDate(date);
    });
    $next.click(function () {
        var date = $day.data('date');
        date.add(1, 'day');
        displayDate(date);
    });
});

var initEventRow = function initEventRow($event) {
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
        validate: function validate(value) {
            if (!/^[A-Z]{4}\d+$/.test(value)) {
                return 'Неверный формат кода';
            }
        }
    });

    var saveHandler = function saveHandler() {
        setTimeout(function () {
            saveEvent($event);
        }, 10);
    };
    $event.find('.event-prop').on('save', saveHandler);

    $event.find('.btn-remove').click(function () {
        var id = $event.data('id');
        if (id) {
            var api = new SchedulerAPI();
            api.remove(id);
        }
        $event.remove();
    });
};

var transform = function transform(data) {
    var date = null;
    if (data.time) {
        var _data$time$split = data.time.split(':');

        var _data$time$split2 = _slicedToArray(_data$time$split, 2);

        var hour = _data$time$split2[0];
        var min = _data$time$split2[1];

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

var getEventData = function getEventData($event) {
    return $event.find('.event-prop').editable('getValue');
};

var saveEvent = function saveEvent($event) {
    var api = new SchedulerAPI();
    var id = $event.data('id');

    var data = getEventData($event);
    data = transform(data);

    if (!data.date) {
        return;
    }

    // Inject position
    data.position = $('.event').index($event);

    if (id) {
        api.update(id, data).then(function (result) {
            updateEvent($event, result);
        }, function (result) {
            console.error(result);
        });
    } else {
        api.create(data).then(function (result) {
            updateEvent($event, result);
        }, function (result) {
            console.error(result);
        });
    }
};

var setState = function setState($event, state) {
    var elClass = '';
    switch (state) {
        case 'free':
            elClass = 'warning';break;
        case 'linked':
            elClass = '';break;
        case 'sync':
            elClass = 'info';break;
    }

    $event.removeClass('warning info').addClass(elClass);
};

var updateEvent = function updateEvent($event, data) {
    var date = moment(data.date).utcOffset(AppConfig.timezone);

    setState($event, data.state);
    $event.data('id', data.id);
    $event.find('.event-time').editable('setValue', date);
    $event.find('.event-show').editable('setValue', data.show.title);
    $event.find('.event-episode').editable('setValue', data.episode.title);
    $event.find('.event-code').editable('setValue', data.episode.code);
};

var loadEventList = function loadEventList(date) {
    var $table = $('.table');
    var api = new SchedulerAPI();

    // Clean table
    $table.find('tbody > tr').remove();

    api.list(date.format('YYYY-MM-DD')).then(function (result) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = result.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _event = _step.value;

                var $row = newRow();
                initEventRow($row);
                updateEvent($row, _event);

                $row.appendTo($table);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }, function (result) {
        console.error(result.error);
    });
};

var codeReg = /^[A-Z]{4}\d+$/;
var timeReg = /^\d{2}:\d{2}$/;

/**
 * TXT file import
 */
$(function () {

    $('.fileinput').on('change.bs.fileinput', function (e) {
        var files = $(e.target).find('input[type="file"]')[0].files;

        if (!files.length) {
            return;
        }

        var file = files[0];

        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var text = e.target.result;
                var events = text.split('\n').map(function (row, index) {
                    var _row$split = row.split('\t');

                    var _row$split2 = _slicedToArray(_row$split, 2);

                    var time = _row$split2[0];
                    var code = _row$split2[1];

                    if (!time || !code) {
                        return {
                            error: {
                                message: 'Не удалось обработать строку',
                                line: index
                            }
                        };
                    }

                    time = time.trim();
                    code = code.trim();

                    var errors = {};
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
                    };
                });

                // Clear event for day
                var api = new SchedulerAPI();
                var $table = $('.table');
                $table.find('tbody > tr').remove();

                api.removeList(currentDate().format('YYYY-MM-DD')).then(function () {
                    // Display events

                    events.forEach(function (event) {
                        if (event.error) {
                            return;
                        }

                        var $event = newRow();
                        initEventRow($event);
                        updateEvent($event, transform(event));

                        $event.appendTo($table);

                        // Save event
                        saveEvent($event);
                    });
                }, function (result) {
                    console.log(result);
                });
            };
        })(file);
        reader.readAsText(file);
    });
});
//# sourceMappingURL=app.js.map