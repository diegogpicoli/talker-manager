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

const addTalker = async (talker) => {
  const json = await readTalker();
  console.log(json[-1]);
  json.push({
    id: json[json.length - 1].id + 1,
    ...talker,
  });
  console.log(json);
  const newJson = JSON.stringify(json, null, 2);
  await fs.writeFile(resolve(__dirname, './talker.json'), newJson);
  return json[json.length - 1];
};

module.exports = {
  readTalker,
  readTalkerId,
  generateToken,
  addTalker,
};