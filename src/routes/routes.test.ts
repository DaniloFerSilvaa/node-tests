import request  from "supertest";
import app from '../app';
import { User } from "../models/name-db";

describe('Testing api routes', () => {
     
     let email = 'test@jest.com'
     let password = '14545'

     beforeAll(async () => {
          await User.sync({ force: true });
});

     it('should homepage', (done) => {
          request(app)
               .get('/')
               .then(response => {
                    expect(response.body.home).toBeTruthy();
                    return done();
               });
     });

     it('should ping pong', (done) => {
          request(app)
               .get('/ping')
               .then(response => {
                    expect(response.body.pong).toBeTruthy();
                    return done();
               });
     });

     //REGISTER
     it('should register a new user', (done) => {
          request(app)
               .post('/register')
               .send(`email=${email}&password=${password}`)
               .then(response => {
                    expect(response.body.error).toBeUndefined();
                    expect(response.body).toHaveProperty('id');
                    return done();
               });
     });

     it('should not allow to register with existing email', (done) => {
          request(app)
               .post('/register')
               .send(`email=${email}&password=${password}`)
               .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                    return done();
               });
     });

     it('should not allow to register without password', (done) => {
          request(app)
               .post('/register')
               .send(`email=${email}`)
               .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                    return done();
               });
     });

     it('should not allow to register without email', (done) => {
          request(app)
               .post('/register')
               .send(`password=${password}`)
               .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                    return done();
               });
          });
     
     it('should not allow to register without any data', (done) => {
          request(app)
               .post('/register')
               .send(``)
               .then(response => {
                    expect(response.body.error).not.toBeUndefined();
                   return done();
               });
     });

     //LOGIN
     it('should login correctly', (done) => {
          request(app)
               .post('/login')
               .send(`email=${email}&password=${password}`)
               .then(response => {
                    expect(response.body.error).toBeUndefined();
                    expect(response.body.status).toBeTruthy();
                    return done();
               });
     });

     it('should login with incorrect data', (done) => {
          request(app)
               .post('/login')
               .send(`email=${email}&password=invalid`)
               .then(response => {
                    expect(response.body.status).toBeFalsy();
                    return done();
               });
     });

     //LIST
     it('should list users', (done) => {
          request(app)
               .get('/list')
               .then(response => {
                    expect(response.body.error).toBeUndefined();
                    expect(response.body.list.length).toBeGreaterThan(0);
                    expect(response.body.list).toContain(email);
                    return done();
               });
     });

});