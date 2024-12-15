export {
    fetchJSON,
    postJSON,
}

async function fetchJSON(url: string): Promise<unknown> {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function postJSON(url: string, data: unknown) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}
