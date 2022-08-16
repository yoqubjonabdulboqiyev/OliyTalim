"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const config_1 = require("../common/config");
const connection_1 = require("../common/db/connection");
const app = (0, express_1.default)();
async function start() {
    try {
        await (0, connection_1.connectDB)();
        console.log(config_1.ADMIN_PORt);
        app.listen({ port: config_1.ADMIN_PORt, host: config_1.HOST });
        console.log("server successfull");
    }
    catch (e) {
        console.log("server not successful", e);
    }
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FkbWluL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBNEM7QUFDNUMsNkNBQW9EO0FBQ3BELHdEQUFvRDtBQUdwRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixLQUFLLFVBQVUsS0FBSztJQUNoQixJQUFJO1FBQ0EsTUFBTSxJQUFBLHNCQUFTLEdBQUUsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFVLENBQUMsQ0FBQTtRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFVLEVBQUUsSUFBSSxFQUFFLGFBQUksRUFBRSxDQUFDLENBQUE7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0tBQ3BDO0lBQ0QsT0FBTyxDQUFDLEVBQUU7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQzFDO0FBQ0wsQ0FBQztBQUVELEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgcmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBBRE1JTl9QT1J0LCBIT1NUIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWdcIjtcclxuaW1wb3J0IHsgY29ubmVjdERCIH0gZnJvbSBcIi4uL2NvbW1vbi9kYi9jb25uZWN0aW9uXCI7XHJcblxyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNvbm5lY3REQigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEFETUlOX1BPUnQpXHJcbiAgICAgICAgYXBwLmxpc3Rlbih7IHBvcnQ6IEFETUlOX1BPUnQsIGhvc3Q6IEhPU1QgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZlciBzdWNjZXNzZnVsbFwiKVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZlciBub3Qgc3VjY2Vzc2Z1bFwiLCBlKVxyXG4gICAgfVxyXG59XHJcblxyXG5zdGFydCgpOyJdfQ==