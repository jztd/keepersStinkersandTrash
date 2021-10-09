import express from 'express'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
app.use(express.static(path.join(__dirname, 'fst/build')));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/recipes', (req, res) => {
    res.send("SPAGHETTI IS GOOD IF FRIED");
});
  
app.post('/api/world', (req, res) => {
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/fst/build/index.html'));
  });

const port = process.env.PORT || 5000;
app.listen(port);