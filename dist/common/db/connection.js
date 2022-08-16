"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = require("../config");
async function connectDB() {
    try {
        mongoose_1.default.set("debug", true);
        await mongoose_1.default.connect(config_1.DB_URL);
        console.log("connected db");
    }
    catch (e) {
        console.log(e);
    }
}
exports.connectDB = connectDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZGIvY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0VBQWdDO0FBQ2hDLHNDQUE2QztBQUV0QyxLQUFLLFVBQVUsU0FBUztJQUMzQixJQUFHO1FBQ0Msa0JBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLE1BQU0sa0JBQVEsQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUM5QjtJQUNELE9BQU0sQ0FBQyxFQUFDO1FBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNqQjtBQUVMLENBQUM7QUFWRCw4QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuaW1wb3J0IHtBRE1JTl9QT1J0LCBEQl9VUkx9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbW9uZ29vc2Uuc2V0KFwiZGVidWdcIix0cnVlKTtcclxuICAgICAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0KERCX1VSTCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWQgZGJcIilcclxuICAgIH1cclxuICAgIGNhdGNoKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9XHJcblxyXG59Il19