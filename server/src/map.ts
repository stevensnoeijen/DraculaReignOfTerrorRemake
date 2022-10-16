import Jimp from 'jimp';

type Map = number[][];

export const filePath = (name: string) =>
  `${__dirname}/../../raw/maps/${name.toUpperCase()}.MAP`;

export const parseMap = (buffer: Buffer, size: number): Map => {
  const map: number[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
  for (let offset = 0; offset < size * size * 0.5; offset++) {
    const num = buffer.readUIntBE(offset, 1);
    const x = Math.floor(offset / size);
    const y = offset % size;
    if (y % 4 == 0) map[y / 4][x] = num;
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
