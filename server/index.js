const express = require("express");
const cors = require("cors");


const PORT = 8080;
const inventoryBoardId = 18400257085;
const inventoryBoardColumns = {
  status: 'status',
  store: 'multi_selecti0j9cnxp',
  carType: 'single_selectdn7oazf',
  titleOrPayoff: 'single_select1h3ilkm',
  titleStatus: 'single_selecteuuhmw9',
  payoffAmount: 'numberi3tr3ou7',
  goodTillDate: 'datexdlnpy7n',
  lienHolder: 'short_textx0819yu8',
  perDiam: 'number9da8ds1t',
  notes: 'long_texthgdlm5pj',
  attachments: 'file30p9d1mi',
  priority: 'color_mm1rnnyt'
};


const app = express();
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

  try {
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
      console.log("Token", accessToken);
      res.redirect("https://bad76-service-32093452-c0a7fb28.us.monday.app")
  } catch (err) {
    console.log("OAUTH ERROR", err);
  }
});

app.get('/', (req, res) => {
    res.send("Monday Integration");
});

app.get('/test', apiMiddleware, async (req, res) => {
try {
    const response = await req.fetchToApi({
        'query': `query { boards (ids: ${inventoryBoardId}) { name } }`
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send('API Error');
  }
});

app.get('/get-items', apiMiddleware, async (req, res) => {
    const columnIds = Object.values(inventoryBoardColumns).map(id => `"${id.toString()}"`).join(',');
    try {
        const response = await req.fetchToApi({
            'query': `query { 
                boards (ids: ${inventoryBoardId}) {
                    items_page(limit: 500) {
                        cursor
                        items {
                            id
                            name
                            column_values(ids: [${columnIds}]) {
                                id
                                text
                                value
                            }
                        }
                    }
                }
            }`
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

app.get('/update-prio', apiMiddleware, async (req, res) => {
  const { itemId, newValue } = req.query
  const val = JSON.stringify({ index: Number(newValue) })
  try {
        const response = await req.fetchToApi({
            'query': `mutation {
              change_column_value (
                board_id: ${inventoryBoardId},
                item_id: ${Number(itemId)},
                column_id: "color_mm1rnnyt",
                value: "${val.replace(/"/g, '\\"')}"
              ){
                id
              }
            }`
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});