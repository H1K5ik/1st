import {describe} from "node:test";
import request from 'supertest';
import {app, HTTP_STATUSES} from "../../src";
describe('.course',() => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })
    it('should create course with correct input data', async ()=>{
        await request(app)
            .post('/videos')
            .send({
                "title": "string",
                "author": "string",
                "availableResolutions": [
                    "P144"
                ]})
            .expect(HTTP_STATUSES.CREATED_201)
    })
})