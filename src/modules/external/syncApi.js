const axios = require("axios");

async function callExternalApi() {
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        { timeout: 3000 }
      );
      return response.data;
    } catch (err) {
      attempt++;
      if (attempt === MAX_RETRIES) throw err;
    }
  }
}

module.exports = { callExternalApi };
