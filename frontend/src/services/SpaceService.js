export async function joinSpace(data, token) {
    let res = [];
    await fetch(`/api/v1/join/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
        body: JSON.stringify({code: data})
    })
    .then(response => response.json())
    .then(data => {
        res = data
    });
    return res;
}