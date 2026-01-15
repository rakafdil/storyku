import request from "supertest";
import app from "../src/index.js";
import prisma from "../src/lib/prisma.js";
describe("Story Controller", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });
    it("GET /stories should return list of stories", async () => {
        const response = await request(app).get("/api/stories");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
//# sourceMappingURL=storyController.test.js.map