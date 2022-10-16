import Jimp from 'jimp';

type Map = number[][];
const MAP_SIZE = 512;

export const filePath = (name: string) =>
  `${__dirname}/../../raw/maps/${name.toUpperCase()}.MAP`;

export const parseMap = (buffer: Buffer): Map => {
  const map: number[][] = Array.from({ length: MAP_SIZE }, () =>
    Array.from({ length: MAP_SIZE }, () => 0)
  );
  for (let offset = 0; offset < MAP_SIZE * MAP_SIZE; offset++) {
    const num = buffer.readUIntBE(offset, 1);
    const y = Math.floor(offset / MAP_SIZE);
    const x = offset % MAP_SIZE;
    map[y][x] = num;
  }

  return map;
};

export const createImage = (map: Map): Jimp => {
  const image = new Jimp(512, 512);

  for (const [y, row] of map.entries()) {
    for (const [x, color] of row.entries()) {
      image.setPixelColor(color, x, y);
    }
  }

  return image;
};
