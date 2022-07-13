const allowedCors = [
  'http://gutmalina.mesto.front.nomoredomains.sbs',
  'https://gutmalina.mesto.front.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
<<<<<<< HEAD
=======

>>>>>>> 5358819e6e8fdb368bdf7ad976027f5a6a69d084
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
<<<<<<< HEAD
=======

>>>>>>> 5358819e6e8fdb368bdf7ad976027f5a6a69d084
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.send();
  }

  next();
};
