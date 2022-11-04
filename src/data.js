const fs = require('fs').promises;

const { resolve } = require('path');

const readTalker = async () => {
  const json = await fs.readFile(resolve(__dirname, './talker.json'), 'utf-8');
  return JSON.parse(json);
};

module.exports = {
  readTalker,
};