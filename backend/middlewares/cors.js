const allowedCors = [
  'http://gutmalina.mesto.front.nomoredomains.sbs',
  'https://gutmalina.mesto.front.nomoredomains.sbs',
  'http://gutmalina.mesto.backend.nomoredomains.sbs',
  'https://gutmalina.mesto.backend.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  // const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log('origin', origin)
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Credentials', true);
  }
  console.log('method', req.method)
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.status(200).send();
  }

  next();
};
