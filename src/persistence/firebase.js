import Firebase from 'firebase';

const firebase = new Firebase(process.env.FIREBASE_DATABASE_URL);

export default firebase;
