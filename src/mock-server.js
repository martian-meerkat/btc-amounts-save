import { createServer, Model, Response } from 'miragejs';
import mockData from './assets/mock/data.json';
import mockUserData from './assets/mock/users.json';

export default function () {
  createServer({
    namespace: '/api',
    models: {
      operation: Model,
      user: Model,
    },
    seeds(server) {
      mockData.forEach((operation) => {
        server.create('operation', operation);
      });
      mockUserData.forEach((user) => {
        server.create('user', user);
      });
    },
    routes() {
      this.post('/login', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.users.find(body.username);
        if (user) {
          return {
            id: user.id,
            groupId: user.groupId,
            token: 'test_token' 
          };
        } else {
          return new Response(
            401,
            { 'Content-Type': 'application/json' },
            { message: 'User not found' },
          );
        }
      });
      this.get('/btc-operations', (schema) => {
        return schema.operations.all();
      });
      this.post('/btc-operations', (schema, request) => {
        let body = JSON.parse(request.requestBody);
        return schema.operations.create(body);
      });
    },
  });
}
