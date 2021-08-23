function apiCall() {
  fetch('http://localhost:3000/api/videos')
    .then(response => response.json())
    .then(data => console.log(data));
}