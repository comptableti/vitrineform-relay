import express, { Router } from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.json({
        message: 'Welcome to the Proxy Server',
        status: 'Running'
    });
});

const relays = new Router();
relays.post("/vitrineform", async (req, res) => {

 const targetUrl = 'http://54.39.96.18:3003/emails/send/vitrineform';
  try {
    const proxyRes = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    const body = await proxyRes.text();
    res.status(proxyRes.status).send(body);
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }

});

app.use('/relays', relays);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Proxy listening on port', PORT);
});