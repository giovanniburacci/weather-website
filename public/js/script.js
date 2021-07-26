console.log('Client side js is loaded!');

fetchData = async () => {
    const input = document.getElementById('addInput');
    const value = input.value.trim();
    if (value) {
        input.style.background = 'unset';
        const resp = await fetch('http://localhost:3000/weather?address=' + value);
        const data = await resp.json();
        document.getElementById('display').value = JSON.stringify(data);
    } else {
        input.style.background = 'red';
    }
}

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('formInput');
    const value = input.value.trim();
    if (value) {
        input.style.background = 'unset';
        const resp = await fetch('http://localhost:3000/weather?address=' + value);
        const data = await resp.json();
        document.getElementById('formDisplay').value = JSON.stringify(data);
    } else {
        input.style.background = 'red';
    }
})