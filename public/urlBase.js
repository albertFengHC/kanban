import axios from 'axios';

// const baseUrl = 'http://192.168.1.5:8080/safeScreen/';
const baseUrl = 'http://129.28.66.56:8088/safeScreen/';

export function getUrl(url ,parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'Screen/' + url,
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}

//进场人员监控
export function getUrlEP(url ,parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'ScreenPerson/' + url,
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}

export function getUrlHome(url ,parameter){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: baseUrl+'home/' + url,
            data: parameter,
        })
            .then(response => {
                resolve(response.data.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    })
}