var r = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            let request = $.ajax({
                url: url,
                method: 'POST',
                contentType:'application/json',
                data: JSON.stringify(data),
                dataType:'json'
            });

            request.done((result) => {
                resolve(result);
            });
            request.fail((error) => {
                reject(error.responseJSON);
            })
        });
    },

    put: (url, data) => {
        return new Promise((resolve, reject) => {
            let request = $.ajax({
                url: url,
                method: 'PUT',
                contentType:'application/json',
                data: JSON.stringify(data),
                dataType:'json'
            });

            request.done((result) => {
                resolve(result);
            });
            request.fail((error) => {
                reject(error.responseJSON);
            })
        });
    },

    patch: (url, data) => {
        return new Promise((resolve, reject) => {
            let request = $.ajax({
                url: url,
                method: 'PATCH',
                contentType:'application/json',
                data: JSON.stringify(data),
                dataType:'json'
            });

            request.done((result) => {
                resolve(result);
            });
            request.fail((error) => {
                reject(error.responseJSON);
            })
        });
    },

    delete: (url) => {
        return new Promise((resolve, reject) => {
            let request = $.ajax({
                url: url,
                method: 'DELETE'
            });

            request.done((result) => {
                resolve(result);
            });
            request.fail((error) => {
                reject(error.responseJSON);
            })
        });
    }

};

class SchedulerAPI {
    constructor() {
        this.endpoint = AppConfig.api.scheduler.endpoint;
    }

    list(date) {
        let url = this.endpoint + '/events';

        return new Promise((resolve, reject) => {
            let request = $.get(url, { date: date });

            request.done((result) => {
                resolve(result);
            });
            request.fail((error) => {
                reject(error.responseJSON);
            })
        });
    }

    removeList(date) {
        let url = this.endpoint + '/events/?date=' + date;
        return r.delete(url);
    }

    create(data) {
        let url = this.endpoint + '/events';
        return r.post(url, data);
    }

    update(id, data) {
        let url = this.endpoint + '/events/' + id;
        //return r.put(url, data);
        return r.patch(url, data);
    }

    remove(id) {
        let url = this.endpoint + '/events/' + id;
        return r.delete(url);
    }
}