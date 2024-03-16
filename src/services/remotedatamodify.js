import axios from "axios";
let baseURL = "https://tavata.ir";
const instance_normal = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});
const instance_formData = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
function PostData_normal(url, data, configs, callback) {
    if (configs) {
        instance_normal.post(url, data, configs).then((res) => {
            // console.log(res);
            callback(null, res);
        })
            .catch((error) => {
                // console.log(error);
                callback(error);
            })
    }
    else {
        instance_normal.post(url, data).then((res) => {
            // console.log(res);
            callback(null, res);
        })
            .catch((error) => {
                // console.log(error);
                callback(error);
            })
    }
}
function GetData_normal(url, configs, callback) {
    if (configs) {
        instance_normal.get(url, configs).then((res) => {
            callback(null, res);
        })
            .catch((error) => {
                callback(error);
            })
    }
    else {
        instance_normal.get(url).then((res) => {
            callback(null, res);
        })
            .catch((error) => {
                callback(error);
            })
    }
}
function PostData_formData(url, data, configs, callback) {
    if (configs) {
        instance_formData.post(url, data, configs).then((res) => {
            // console.log(res);
            callback(null, res);
        })
            .catch((error) => {
                // console.log(error);
                callback(error);
            })
    }
    else {
        instance_formData.post(url, data).then((res) => {
            // console.log(res);
            callback(null, res);
        })
            .catch((error) => {
                // console.log(error);
                callback(error);
            })
    }
}
function GetData_formData(url, configs, callback) {
    if (configs) {
        instance_formData.get(url, configs).then((res) => {
            callback(null, res);
        })
            .catch((error) => {
                callback(error);
            })
    }
    else {
        instance_formData.get(url).then((res) => {
            callback(null, res);
        })
            .catch((error) => {
                callback(error);
            })
    }
}
export { baseURL, instance_normal, instance_formData, PostData_normal, GetData_normal, PostData_formData, GetData_formData }