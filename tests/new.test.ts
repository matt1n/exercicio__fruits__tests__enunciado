import app from "index";
import supertest from "supertest";

const api = supertest(app);

describe('GET /fruits', ()=> {
    it("Should respond with body and status 200", async ()=>{
        const result = await api.get("/fruits")
        expect(result.status).toBe(200)
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })
})

describe("GET /fruits/:id", ()=> {
    it("Should respond with status 404 if 'id' doesn't exist", async ()=>{
        const unexpectedId = 999
        const result = await api.get(`/fruits/${unexpectedId}`)
        console.log(result)
        expect(result.status).toBe(404)
    })
    it("Should respond with status 200 and body if 'id' exist", async ()=>{
        const expectedId = 1
        const result = await api.get(`/fruits/${expectedId}`)
        expect(result.status).toBe(200)
        expect(result.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
        )
    })
})

describe("POST /fruits", ()=> {
    it("Should respond with status 201 if the fruit is not in the database yet", async ()=>{
        await api.post("/fruits").send({
            name: "pêra",
            price: 5000
        }).expect(201)
    })
    it("Should respond with status 409 if fruit already is in the database", async ()=>{
        await api.post("/fruits").send({
            name: "maçã",
            price: 5000
        }).expect(409)
    })
})