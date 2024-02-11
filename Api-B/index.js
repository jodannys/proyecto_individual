const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  const PORT=3001
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`); // eslint-disable-line no-console
  });
});
