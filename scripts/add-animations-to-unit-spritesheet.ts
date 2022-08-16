import * as fs from 'fs';

const FILE = __dirname + '/../public/assets/unit-spritesheet.json';
const ANIMATION_FRAME_REGEX = /_(\d{1,})$/;

const spritesheet = JSON.parse(fs.readFileSync(FILE).toString());
spritesheet.animations = {};

const animationFrames = Object.keys(spritesheet.frames).filter(
  (frameKey: string) => frameKey.search(ANIMATION_FRAME_REGEX) >= 0
);

for (const animationFrame of animationFrames) {
  const [animationName, animationNumber] = animationFrame.split(
    ANIMATION_FRAME_REGEX
  );

  if (spritesheet.animations[animationName] == null) {
    spritesheet.animations[animationName] = [];
  }
  spritesheet.animations[animationName][Number(animationNumber) - 1] =
    animationFrame;
}

fs.writeFileSync(FILE, JSON.stringify(spritesheet, null, 2));
