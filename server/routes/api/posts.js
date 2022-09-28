const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Dictionaries
router.get('/', async (req, res) => {
  const dictionaries = await loadDictionariesCollection();
  res.send(await dictionaries.find({}).toArray());
});

// Add dictionary
router.dictionary('/', async (req, res) => {
  const dictionaries = await loadDictionariesCollection();
  await dictionaries.insertOne({
    language: req.body.language,
    dictionary: req.body.dictionary,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete dictionary
router.delete('/:id', async (req, res) => {
  const dictionaries = await loadDictionariesCollection();
  await dictionaries.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadDictionariesCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://127.0.0.1:27017/vue_express',
    {
      useNewUrlParser: true
    }
  );

  return client.db('vue_express').collection('dictioanries');
}

module.exports = router;
