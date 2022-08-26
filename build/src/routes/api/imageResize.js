"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var data_1 = __importDefault(require("../../../data/data"));
var fs = __importStar(require("fs"));
var checkImageExistance_1 = require("./checkImageExistance");
var resizeImage_1 = require("./resizeImage");
var image_routes = (0, express_1.Router)();
image_routes.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, width, Width, height, Height, check, edited_image, error_1, locationOfImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = req.query.filename;
                width = req.query.width;
                height = req.query.height;
                check = data_1.default.includes(fileName);
                //CHECK IF FILE OF EDITED IMAGES IS CREATED OR NOT
                fs.access('./images/edited-images', function (err) {
                    if (err) {
                        fs.mkdirSync('./images/edited-images');
                    }
                });
                //VALIDATIONS OF THE INPUT
                if (typeof width == 'string' && typeof height == 'string') {
                    Width = parseInt(width);
                    Height = parseInt(height);
                }
                if (typeof fileName != 'string') {
                    return [2 /*return*/, res.status(404).send('please, Enter name of the image as a string')];
                }
                if (Width === undefined || Height === undefined || fileName === undefined) {
                    return [2 /*return*/, res
                            .status(404)
                            .send('please, Enter name, width and height of the image')];
                }
                if (!check) {
                    return [2 /*return*/, res.status(404).send("This image doesn't exist")];
                }
                if (Width <= 0 || Height <= 0) {
                    return [2 /*return*/, res
                            .status(404)
                            .send('Please, Enter height or width that is non negative and not equal to zero')];
                }
                if (isNaN(Width) || isNaN(Height)) {
                    return [2 /*return*/, res.status(404).send('height or width are missing')];
                }
                //CHECK IF THE IMAGE EXISTS OR NOT
                if ((0, checkImageExistance_1.checkImageExistance)(fileName, Width, Height)) {
                    return [2 /*return*/, res.sendFile(path_1.default.resolve('./') +
                            "/images/edited-images/".concat(fileName, "_").concat(Width, "_").concat(Height, ".jpg"))];
                }
                edited_image = fileName + '_' + Width + '_' + Height + '.jpg';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, resizeImage_1.resizeImage)(fileName, Width, Height, edited_image)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4:
                locationOfImage = path_1.default.resolve('./') +
                    "/images/edited-images/".concat(fileName, "_").concat(Width, "_").concat(Height, ".jpg");
                //SEND THE PATH AS A RESPONSE
                res.sendFile(locationOfImage);
                return [2 /*return*/];
        }
    });
}); });
exports.default = image_routes;
