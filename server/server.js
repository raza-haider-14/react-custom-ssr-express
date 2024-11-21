import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server"; // Correct import for SSR
import App from "../src/App";

const PORT = 8000;
const app = express();

// Function to render HTML with SSR and inject data
const renderHTML = (req, res, htmlData) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    const context = {}; // Create context for StaticRouter to manage redirects or 404

    // Render app to string with SSR
    const appHtml = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App data={htmlData} />
      </StaticRouter>
    );

    // Replace <div id="root"></div> with the rendered HTML from SSR
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      )
    );
  });
};

// Route to render the homepage
app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return renderHTML(req, res, products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to load products");
  }
});

// Route to render individual product pages
app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return renderHTML(req, res, product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to load product");
  }
});

// Serve static assets (JavaScript, CSS, images, etc.)
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Start the server
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
