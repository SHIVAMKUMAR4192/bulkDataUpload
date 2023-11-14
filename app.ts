// import express from 'express';
// import uploadRoute from './routes/uploadRoute';
// import http from 'http';
// import fileUpload from 'express-fileupload';
// const bodyParser = require('body-parser');


// const app = express();
// const port = process.env.PORT || 3002;
// app.use(express.json());
// app.use(bodyParser.text({ type: 'application/xml' }));

// app.use(fileUpload()); 
// app.use(uploadRoute);
// const server = http.createServer(app);


// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



// app.ts

import express from 'express';
import { json } from 'body-parser';
import singleUploadRoutes from './routes/singleUploadRoute';
import multipleUploadRoutes from './routes/multipleUploadRoute'

const app = express();
const port = 3000;

app.use(json());

app.use(singleUploadRoutes);
app.use(multipleUploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
