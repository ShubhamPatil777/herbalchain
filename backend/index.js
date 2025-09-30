const express = require('express');
const bodyParser = require('body-parser');
const { getContract } = require('./fabricClient');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('HerbalChain backend running'));

app.post('/createBatch', async (req, res) => {
  try {
    const { batchId, herbName, collectorId, latitude, longitude, timestamp, metadata } = req.body;
    const { gateway, contract } = await getContract();
    const tx = await contract.submitTransaction('createBatch', batchId, herbName, collectorId, String(latitude), String(longitude), String(timestamp), metadata || '');
    await gateway.disconnect();
    res.json({ success: true, result: JSON.parse(tx.toString()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/addEvent', async (req, res) => {
  try {
    const { batchId, eventType, details, timestamp } = req.body;
    const { gateway, contract } = await getContract();
    const tx = await contract.submitTransaction('addProcessingEvent', batchId, eventType, details || '', String(timestamp));
    await gateway.disconnect();
    res.json({ success: true, result: JSON.parse(tx.toString()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/queryBatch/:batchId', async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const { gateway, contract } = await getContract();
    const tx = await contract.evaluateTransaction('queryBatch', batchId);
    await gateway.disconnect();
    res.json({ success: true, result: JSON.parse(tx.toString()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on port', port));
