import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { parseMap, createImage, filePath } from './map';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.get('/mappreview.png', async (req, res) => {
  const name = req.query['name'] as string | null;
  if (name == null) return res.status(400).send();

  const path = filePath(name);
  if (!fs.existsSync(path)) return res.status(404).send();

  const buffer = fs.readFileSync(path);
  const map = parseMap(buffer);
  const image = createImage(map);

  const imageBuffer = await image.getBufferAsync('image/png');

  res.status(200).type('png').send(imageBuffer);
});

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
