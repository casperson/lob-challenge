/* eslint-disable no-undef */
function generate(letter, cb) {
  let letterBody = JSON.stringify(letter);
  return fetch("api/letter",
      {
          method: "POST",
          body: letterBody
      })
      .then(checkStatus)
      .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return response.text();
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { generate };
export default Client;
