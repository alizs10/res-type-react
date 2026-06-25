export function jsonToTypescript(
    json: string,
    rootName = "Root",
    definitionStyle = "interface",
    includeExport = true
): string {
    const data = JSON.parse(json);

    const interfaces = new Map<string, string>();

    function resolveType(value: unknown, name: string): string {
        if (value === null) {
            return "null";
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return "unknown[]";
            }

            const itemType = resolveType(value[0], `${name}Item`);
            return `${itemType}[]`;
        }

        switch (typeof value) {
            case "string":
                return "string";

            case "number":
                return "number";

            case "boolean":
                return "boolean";

            case "object": {
                const interfaceName = capitalize(name);

                if (!interfaces.has(interfaceName)) {
                    const fields = Object.entries(
                        value as Record<string, unknown>
                    )
                        .map(
                            ([key, val]) =>
                                `  ${key}: ${resolveType(
                                    val,
                                    `${interfaceName}${capitalize(key)}`
                                )};`
                        )
                        .join("\n");

                    interfaces.set(
                        interfaceName,
                        `${includeExport ? "export " : ""}${definitionStyle} ${interfaceName}${definitionStyle === 'type' ? " =" : ""} {\n${fields}\n}`
                    );
                }

                return interfaceName;
            }

            default:
                return "unknown";
        }
    }

    resolveType(data, rootName);

    return [...interfaces.values()].reverse().join("\n\n");
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatJson(json: string): string {
    try {
        const parsed = JSON.parse(json);

        return JSON.stringify(parsed, null, 2);
    } catch {
        return json;
    }
}