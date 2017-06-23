# SeeFood - A Custom Vision Service Demo

## Try it out!
To try it on your own computer:
1. Clone the repo and `cd` into its directory
2. Run `npm install` to grab all of the necessary packages
3. Run `npm run build` to compile all of the JavaScript
4. Run `npm start` to start a simple file server
5. Visit `localhost:8080` on your browser

Note that in order for the camera functionality to work correctly in modern browsers, the browser must be either connected to `localhost` or receiving files over HTTPS.

## How It Works
This demo uses Microsoft's [Custom Vision](https://customvision.ai), which is a part of the Cognitive Services. It provides an easy-to-use interface for creating a custom computer vision model; in this demo, the service is used to detect a hot dog in an image.

The app itself is a simple, statically-served web app written in ES2015 and compiled using Webpack and Babel.
