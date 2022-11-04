const fs = require('fs').promises;

const { resolve } = require('path');

const readTalker = async () => {
  const json = await fs.readFile(resolve(__dirname, './talker.json'), 'utf-8');
  return JSON.parse(json);
};

const readTalkerId = async (id) => {
  const json = await readTalker();
  const filterJson = json.find((item) => Number(item.id) === Number(id));
  return filterJson;
};

module.exports = {
  readTalker,
  readTalkerId,
};