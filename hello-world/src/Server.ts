import * as http from 'http';
import * as express from "express";
import ORM from "./ORM";
import * as httpStatus from 'http-status';
import * as bodyParser from 'body-parser';

export default class Server {

    private portNumber: number;
    private app: express.Application;
    private instance: http.Server;

    constructor (port: number) {
        this.portNumber = port;
        this.app = express();
        this.app.use(bodyParser.text());
    }

    public async initialize (): Promise<void> {
        const connection = await ORM.getConnection();
        const indexRouter = express.Router();
        indexRouter.get('/', async (req: express.Request, res: express.Response) => {
            const messages = await connection.manager.find(ORM.entities.Message);
            res.status(httpStatus.OK).json(messages);
        });
        indexRouter.get('/:id', async (req: express.Request, res: express.Response) => {
            const message = await connection.manager.findOne(ORM.entities.Message, req.params.id);
            res.status(httpStatus.OK).json(message);
        });
        indexRouter.post('/', async (req: express.Request, res: express.Response) => {
            let message = new ORM.entities.Message();
            message.content = req.body;
            await connection.manager.save(message);
            res.status(httpStatus.CREATED).json(message);
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