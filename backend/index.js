const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('HerbalChain backend running'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on port', port));
