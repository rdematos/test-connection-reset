const axios = require('axios');
const Bluebird = require('bluebird');
const HttpAgent = require('agentkeepalive');
const d_t = new Date();


const keepAliveOption = {
  freeSocketKeepAliveTimeout: 30 * 1000, // Should be less than server keep alive timeout
  socketActiveTTL: 50 * 1000 // Should be less than dns ttl
};
const httpAgent = new HttpAgent(keepAliveOption);

let host = 'http://internal-ricardo-bitbucket-alb-1918077600.us-east-2.elb.amazonaws.com:8000';
let path = '/';

const httpClient = axios.create({
  baseURL: host,
  timeout: 5000,
});

const sendRequest = () =>
  httpClient.request({
    url: path,
    httpAgent,
  })
    .then(res => {
      let year = d_t.getFullYear();
      let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
      let day = ("0" + d_t.getDate()).slice(-2);
      let hour = d_t.getHours();
      let minute = d_t.getMinutes();
      let seconds = d_t.getSeconds();
      console.log('Received response', res.status, ' - ', year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds);
    })
    .catch(e => {
      let year = d_t.getFullYear();
      let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
      let day = ("0" + d_t.getDate()).slice(-2);
      let hour = d_t.getHours();
      let minute = d_t.getMinutes();
      let seconds = d_t.getSeconds();
      console.error('Error occurred', e.message, ' - ', year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds);
    });

let delay=350000;
const start = () =>
  sendRequest()
    .then(() => delay -= 1)
    .then(() => delay > 500 ? Bluebird.delay(delay).then(start) : 'Done')

start();