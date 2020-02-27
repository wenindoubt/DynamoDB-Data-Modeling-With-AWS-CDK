"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var dynamodb_1 = require("aws-sdk/clients/dynamodb");
var axios_1 = __importDefault(require("axios"));
var DynamoDbRepository = /** @class */ (function () {
    function DynamoDbRepository(ddb) {
        this.ddb = ddb;
    }
    DynamoDbRepository.prototype.saveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var params, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'DynamoDB-TableCD117FA1-1J8NIQIVEG2H4',
                            Item: {
                                pk: "ORG#" + data.orgId,
                                sk: "ORG#EMP#" + data.empId,
                                name: data.name,
                                email: data.email,
                                project: data.project
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ddb.put(params).promise()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DynamoDbRepository;
}());
exports.DynamoDbRepository = DynamoDbRepository;
function generateRandomUser() {
    return __awaiter(this, void 0, void 0, function () {
        var randomUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get('https://randomuser.me/api/')];
                case 1:
                    randomUser = (_a.sent()).data.results;
                    return [2 /*return*/, {
                            orgId: 'fff19cfc-bfb8-4e24-87c6-7f93ed23bee2',
                            empId: randomUser[0].login.uuid,
                            name: randomUser[0].name.first + " " + randomUser[0].name.last,
                            email: randomUser[0].email,
                            project: 'Project Gamma'
                        }];
            }
        });
    });
}
function createRandomUser() {
    return __awaiter(this, void 0, void 0, function () {
        var saveData, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = new DynamoDbRepository(new dynamodb_1.DocumentClient({ region: 'us-west-2' }))).saveData;
                    return [4 /*yield*/, generateRandomUser()];
                case 1:
                    saveData = _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, saveData];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
createRandomUser().then(function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(data);
        return [2 /*return*/];
    });
}); });
