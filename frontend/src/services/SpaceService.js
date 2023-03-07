export async function pingServer(data) {
    let res = [];
    await fetch('/api/v1/ping/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
        res = data
    });
    return res;
}