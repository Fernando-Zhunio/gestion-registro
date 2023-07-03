export function patchValues(
    values: { [key: string]: any },
    patch: { [key: string]: any } | null | undefined
) {
    if (!patch) return values;
    Object.keys(values).map((key) => {
        if (patch[key]) {
            values[key] = patch[key];
        }
    });
    return values;
}
