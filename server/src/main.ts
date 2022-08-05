import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.post('/:file*', (req, res) => {
  fs.writeFileSync(
    __dirname + '/../../public/' + req.params['file'] + req.params[0],
    JSON.stringify(req.body, undefined, 2)
  );
  res.status(202).send();
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
