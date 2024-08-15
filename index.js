const express = require('express');
const path = require('node:path');
const app = express();
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

// POST
app.post('/api/user', express.json(), async (req, res) => {
  const db = client.db('my-app');
  const date = req.body.date;
  const ttl = req.body.ttl;
  const memo = req.body.memo;
  
  await db.collection('schedule').insertOne({date: date, ttl: ttl, memo: memo});
  res.status(200).send('Created');
})

// 起動
async function main(){
  await client.connect();

  const db = client.db('my-app');

  // GET '/'(トップ) アクセス時の挙動
  app.get(
    '/',
    async(req, res) => {
      try{
        const content = await db.collection('schedule').find().toArray();
        const container = content.map((schedule) => {
          return [schedule.date, schedule.ttl, schedule.memo]
        });
        res.render(
          path.join(__dirname, 'views', 'index.ejs'),
          {a: container}
        )
      } catch(e){
        console.error(e);
        res.status(500).send('Internal Server Error');
      }
    }
  )

  app.listen(3000, () => {
    console.log('start listening');
  })
}

main();