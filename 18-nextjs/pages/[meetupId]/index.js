import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function DetailMeetup(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </>
  );
}

export async function getStaticPaths() {
  const connectionString =
    'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  await client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const connectionString =
    'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupCollections = db.collection('meetups');
  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });
  await client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
  };
}
