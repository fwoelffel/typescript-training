import Server from './Server';

const bootstrap = async () => {
    const server = new Server(3000);
    await server.initialize();
    await server.start();
};

bootstrap();