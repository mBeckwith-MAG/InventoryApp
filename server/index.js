const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

const apiMiddleware = (req, res, next) => {
  const BASE_URL = 'https://api.monday.com/v2';
  const FIXED_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': process.env.API_TOKEN,
    'API-Version': '2023-04'
  };

  req.fetchToApi = async (dynamicBody) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: FIXED_HEADERS,
      body: JSON.stringify(dynamicBody)
    });
    return response.json();
  };

  next();
};

app.get('/auth', (req, res) => {
  res.redirect(
    `https://auth.monday.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`
  );
});

app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;

  const response = await fetch('https://auth.monday.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code
    })
  });

  const data = await response.json();
  const accessToken = data.access_token;
  res.send(`Access Token: ${accessToken}`)
});

app.get('/', (req, res) => {
    res.send("Hola...");
});

app.get('/test', apiMiddleware, async (req, res) => {
try {
    const apiResult = await req.fetchToApi({
        'query': 'query { boards (ids: 18400257085) { name } }'
    });
    res.status(200).json(apiResult);
  } catch (error) {
    res.status(500).send('API Error');
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});