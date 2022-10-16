import Jimp from 'jimp';

type Map = number[][];
const MAP_SIZE = 512;

export const filePath = (name: string) =>
  `${__dirname}/../../raw/maps/${name.toUpperCase()}.MAP`;

export const parseMap = (buffer: Buffer): Map => {
  const map: number[][] = Array.from({ length: 128 }, () =>
    Array.from({ length: 128 }, () => 0)
  );

  for (let offset = 0; offset < MAP_SIZE * MAP_SIZE * 0.5; offset += 4) {
    const num = buffer.readUIntBE(offset, 1);
    const x = Math.floor(offset / MAP_SIZE);
    const y = offset % MAP_SIZE;

    if (x < 128) map[y / 4][x] = num;
  }

  return map;
};

export const createImage = (map: Map): Jimp => {
  const image = new Jimp(map[0].length, map.length);

  for (const [y, row] of map.entries()) {
    for (const [x, color] of row.entries()) {
      image.setPixelColor(color, x, y);
    }
  }

  return image;
};
