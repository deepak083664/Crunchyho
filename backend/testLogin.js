const testLogin = async () => {
    try {
        const res = await fetch('https://crunchyho-3kbk.onrender.com/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@crunchyho.com', password: 'bipul123@' })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (e) {
        console.error(e);
    }
}
testLogin();
