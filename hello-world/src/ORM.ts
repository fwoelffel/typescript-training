import 'reflect-metadata';
import { createConnection, Connection } from "typeorm";
import Message from './entity/Message';

export default class ORM {

    private static connection: Connection;

    private constructor () {}

    static async getConnection () {
        if (!ORM.connection) {
            ORM.connection = await createConnection(
                {
                    "type": "postgres",
                    "host": "db",
                    "username": "user",
                    "password": "password",
                    "database": "db",
                    "synchronize": true,
                    "logging": false,
                    "entities": [
                        Message
                    ]
                }
            );
        }
        return ORM.connection;
    }

    static get entities () {
        return {
            Message
        };
    }

}