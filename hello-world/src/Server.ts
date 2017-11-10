import * as http from 'http';
import * as express from "express";

export default class Server {

    private portNumber: number;
    private app: express.Application;
    private instance: http.Server;

    constructor (port: number) {
        this.portNumber = port;
        this.app = express();
    }

    public initialize (): void {
        const indexRouter = express.Router();
        indexRouter.get('/', (req: express.Request, res: express.Response) => {
            res.send('Hello world!');
        });
        this.app.use('/', indexRouter);
    }

    public start (): void {
        this.instance = this.app.listen(this.portNumber);
    }

    public stop (): void {
        this.instance.close();
    }

}