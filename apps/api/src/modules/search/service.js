"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const repository_1 = require("./repository");
const repo = new repository_1.SearchRepository();
class SearchService {
    async globalSearch(params) {
        return repo.searchAcrossAll(params.q, params.category);
    }
}
exports.SearchService = SearchService;
