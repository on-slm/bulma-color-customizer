# [Bulma](https://bulma.io/) Color Customizer

### Unfortunately, it's still ongoing.

### Created mainly by the following tools:

* [Nodej.js](https://nodejs.org/en/) - the JavaScript runtime built on fast Chrome's V8 JavaScript engine.
* [Express.js](https://expressjs.com/) - fast, unopinionated, minimalist web framework for Node.js. The heart of this framework lies in its routing capabilities. Beside that, you can extend it basically by anything because Express.js provides simple and functioning middleware interface.
* [Pug templating language](https://pugjs.org/api/getting-started.html) - high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.
* [Sass](https://sass-lang.com/) - aka CSS with superpowers. To be precise, I use its [Node-sass](https://github.com/sass/node-sass) implementation.

The main objective of this software is to provide extension on top of the Bulma CSS framework. 

**The project has to extend Bulma qith a separate UI** where users can **change default Bulma's colors**. 

The input should be complete CSS/Sass file not minified Bulma CSS stylesheet, after conversion the output should be almost the same - **apart from default colors**.

The changes can be made either by directly **inputting RGB values into text input fields (while seeing changes in real time on few pages full of Bulma's elements) or by sliders**.
