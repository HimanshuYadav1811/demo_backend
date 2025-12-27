import {app} from './app.js';
import { connectDB } from './db/database.js';



//<<<<------------database connection start ---------
connectDB();
//------------database connection End ------------>>>>




//------------server start ------------//

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});