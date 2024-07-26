const messages = [];

async function handleRequest(request) {
    if (request.method === 'GET') {
        return new Response(JSON.stringify(messages), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (request.method === 'POST') {
        const { username, message } = await request.json();
        if (username && message) {
            messages.push({ username, message });
        }
        return new Response('Message received', { status: 201 });
    }

    return new Response('Method not allowed', { status: 405 });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
