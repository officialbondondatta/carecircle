/** Missing resources may be returned as 404, 410, null, or an empty body by the API. */
export async function readOptionalResource<T>(response: Response): Promise<T | null> {
    if (response.status === 404 || response.status === 410) return null;
    if (!response.ok) throw new Error(`Unable to load resource (HTTP ${response.status}).`);
    const body = await response.text();
    if (!body.trim()) return null;
    return JSON.parse(body) as T | null;
}

export function isEventId(id: string): boolean {
    return /^[a-f\d]{24}$/i.test(id);
}
