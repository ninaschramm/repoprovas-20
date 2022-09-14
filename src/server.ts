import dotenv from 'dotenv';
import server from './index.js';
dotenv.config();

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})