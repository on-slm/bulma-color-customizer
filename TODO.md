# TODOs

## MUSTHAVEs

- [ ] FIX Fix template customize.pug or start over (in FF it renders badly)
- [ ] TODO Rewrite all the messy code - make it resembling code written according to the BP
- [ ] TODO Restructure all files in the Views directory - reduce number of files, make them simpler, etc (rule of thumb: max only 2-3 pug files needed for presenting one page of the web)
- [ ] TODO Insert some mock data into collection `sasslabel`
- [ ] TODO Or rather completely de novo setup DB's mock data (inspiration - file `populatedb.js`)
- [ ] TODO Delete all unnecessary files and folders
- [ ] TODO Remove all unnecessary comments
- [ ] TODO Add debug, morgan [viz here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
- [ ] TODO Proper [error handling](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#Handling_errors) everywhere
- [ ] TODO Upgrade to much better devstack/compiler etc (aka make us of the Webpack)
- [ ] TODO Make use of ES6 syntax everywhere

## IDEAS AND PROPOSALS FOR FUTURE CONSIDERATION

### Rewrite app's views by utilizing any of popular frontend framework: Angular2 / React / Vuejs / (maybe even Elm)

### Ideas on what to learn/reinforce next (by utilizing/including it somewhere into the project)

- for ... of statements (possibly with iterables) ([viz MDN page(especially examples)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of))

### Backlog of ideas for things I should/could learn

- Find out what in the TS the question mark in property name means. Like on line 18 or 19 in this definition file ~/.cache/typescript/3.1/node_modules/@types/express-session/index.d.ts, ie. (shortened):

```typescript
declare global {
  namespace Express {
    interface Request {
      session?: Session;    // here
      sessionID?: string;   // and here...
    }
  }
}
```

- [MongoDB syntax weirdness](http://devblog.me/wtf-mongo)
- Weird Mongoose Query.sort(...) syntax `.sort([['repo', 'asc']])` - [probably smthing to do with "internal property"](https://stackoverflow.com/questions/17174786/what-is-the-significance-of-the-double-brackets-for-the-prototype-property-i)
