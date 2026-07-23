export interface SearchDocument {
    id: string;
    [key: string]: any;
}

export class MultiColumnIndex {
    private index: Map<string, Map<string, string[]>> = new Map();

    buildIndex(documents: SearchDocument[], columns: string[]) {
        for (const doc of documents) {
            for (const col of columns) {
                if (doc[col]) {
                    const term = String(doc[col]).toLowerCase();
                    if (!this.index.has(col)) this.index.set(col, new Map());
                    const colIndex = this.index.get(col)!;
                    
                    if (!colIndex.has(term)) colIndex.set(term, []);
                    colIndex.get(term)!.push(doc.id);
                }
            }
        }
    }

    search(column: string, term: string): string[] {
        const colIndex = this.index.get(column);
        return colIndex?.get(term.toLowerCase()) || [];
    }
}

export function fuzzyMatch(source: string, target: string): boolean {
    const s = source.toLowerCase();
    const t = target.toLowerCase();
    if (s === t) return true;
    if (s.includes(t) || t.includes(s)) return true;
    return false;
}

export const IndustryMatchers = {
    matchesTech: (industry: string) => fuzzyMatch(industry, 'software') || fuzzyMatch(industry, 'technology'),
    matchesHealthcare: (industry: string) => fuzzyMatch(industry, 'health') || fuzzyMatch(industry, 'medical'),
    matchesFinance: (industry: string) => fuzzyMatch(industry, 'finance') || fuzzyMatch(industry, 'fintech')
};

export const LocationMatchers = {
    isNorthAmerica: (location: string) => fuzzyMatch(location, 'us') || fuzzyMatch(location, 'canada') || fuzzyMatch(location, 'north america'),
    isEurope: (location: string) => fuzzyMatch(location, 'uk') || fuzzyMatch(location, 'europe') || fuzzyMatch(location, 'germany')
};

export interface SavedSearch {
    id: string;
    userId: string;
    criteria: Record<string, any>;
}

export function evaluateSavedSearch(search: SavedSearch, newDocument: SearchDocument): boolean {
    for (const [key, value] of Object.entries(search.criteria)) {
        if (newDocument[key] !== value) return false;
    }
    return true;
}
