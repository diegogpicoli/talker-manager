const fs = require('fs').promises;
const crypto = require('crypto');

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

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readTalker,
  readTalkerId,
  generateToken,
};