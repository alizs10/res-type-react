export function isValidJson(str: string): boolean {
    if (typeof str !== "string") {
        return false;
    }

    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

