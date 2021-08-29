function apiCall() {
  fetch('http://localhost:3000/api/videos')
    .then(response => response.json())
    .then(data => console.log(data));
}

function postCreateVideo() {
  const data = {
    link: document.getElementById('link')
  }
  fetch('https://localhost:3000/api/videos', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}