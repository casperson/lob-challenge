const express = require('express');
const bodyParser = require('body-parser');
const Lob = require('lob')('test_5e6068be79d5cd581bf7cf3f38cb1b2bc0a');

const app = express();

app.set('port', (process.env.API_PORT || 3001));
app.use(bodyParser.text());

app.post('/api/letter', (req, res) => {
  let governor = JSON.parse(req.body)[1];
  let sender = JSON.parse(req.body)[0];
  let govName = governor.name.toString();
  governor.name = governor.name.replace(/"/g, "'");

  Lob.letters.create({
    description: 'Letter to the Governor',
    to: {
      name: governor.name,
      address_line1: governor.address[0].line1,
      address_city: governor.address[0].city,
      address_state: governor.address[0].state,
      address_zip: governor.address[0].zip,
      address_country: 'US',
    },
    from: {
      name: sender.name,
      address_line1: sender.address1,
      address_line2: sender.address2,
      address_city: sender.city,
      address_state: sender.state,
      address_zip: sender.zipcode,
      address_country: sender.country,
    },
    file: '<html style="padding-top: 3in; margin: .5in;"><div>Dear {{governorName}},</div><br/><div>{{message}}</div><br/><div>Sincerely, <br/>{{senderName}}</div></html>',
    data: {
      governorName: governor.name,
      senderName: sender.name,
      message: sender.message
    },
    color: true
  }, function (err, response) {
    if (err){
      res.status(err.status_code).send(err.message)
    } else { res.send(response); }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
