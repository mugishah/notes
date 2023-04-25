import app from './app'
import env from './util/validateEnv'
import mongoose from 'mongoose';

const port = env.PORT;
const db = env.MONGODB_CONNECTION_STRING;

mongoose.connect(db)
  .then(() => {
    app.listen(port, () => {
      console.log('connected succesfully to the DB');
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to the DB', err);
    process.exit(1);
  });
