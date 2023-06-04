const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running http://localhost:${port}`);
});
