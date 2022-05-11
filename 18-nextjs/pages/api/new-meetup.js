import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    // const { title, image, address, description } = data;
    const connectionString =
      'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';
    const client = await MongoClient.connect(connectionString);
    const db = client.db();
    const meetupCollections = db.collection('meetups');
    const result = await meetupCollections.insertOne(data);

    await client.close();

    res.status(201).json({
      message: 'Meetup inserted',
    });
  } else {
    res.status(405).json({
      message: 'Not allowed',
    });
  }
}

export default handler;
