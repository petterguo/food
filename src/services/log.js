import request from '../utils/request';

export function log(json) {
    console.log(json);
    
    return request('/api/users', {
        method: 'post',
        body: JSON.stringify(json)
    });
};

export function evals(json) {
    console.log(json);

    return request('/api/users', {
        method: 'post',
        body: JSON.stringify(json)
    });
}