import TokenService from '../TokenService';
/*
  GoFetch is called in
  PinPad
  OrderEntry
  OrderPanel
  OpenOrders
*/

export default async function GoFetch(fetchMethod, url, needToken, bodyObj) {

  if(process.env.NODE_ENV === 'development') {
    // var fetchURL = 'http://localhost:3002' + url;
    var fetchURL = 'http://192.168.1.6:6001' + url;
  }

  let fetchHeaders = {
    'content-type': 'application/json',
    secretHandshake: process.env.REACT_APP_SECRET
  }

  if(needToken) {
    // const token = TokenService.read()
    fetchHeaders.Authorization = `Bearer ${process.env.REACT_APP_DEV_TOKEN}`
  }

  let fetchOptions = {
    headers: fetchHeaders,
    method: fetchMethod
  }

  if(bodyObj !== undefined) {
    fetchOptions.body = JSON.stringify( bodyObj );
  }

  let serverResponse;

  await fetch(fetchURL, fetchOptions)
  .then(response => response.json())
    .then(async reply => {
      serverResponse = await reply;
    })
    .catch(async error => {
      serverResponse = await { error };
    })

return serverResponse;

}
