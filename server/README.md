# bbydino's BẦU CUA - server

brought to you by bbydino

## overview

Back in the Việt Nam...

fun game. https://en.wikipedia.org/wiki/B%E1%BA%A7u_cua_t%C3%B4m_c%C3%A1

## npm scripts

### `npm run build`

Builds the web application for production using `tsc` in the `build` directory.

### `npm run production`

Builds the web application for production using `tsc` in the `build` directory, and starts up the server.

### `npm run start`

Starts local dev server.

### `npm run dev`

Starts local dev server using `nodemon`, which restarts the server when changes are made.

### `npm run clean`

Removes the `build` directory (output from `npm run build`).

## using typescript with express and node.js

Bruh, getting this shiza to work lowkey sucked. I did hella research to get this to work and understand this. Give me a raise!!! I kid, I kid.

But basically, to set up Node.js/Express with Typescript, I had to:

1. Install typescript, express, and ts-node in the project. Technically, `@types/express`, `ts-node`, and `typescript` can be devDependencies, but whateva.
   ```
   npm install typescript express @types/express ts-node
   ```
2. Use a particular `tsconfig.json`. Setting these configs allow for `import` statements to be used, unless you would rather `require()` everything (BLECH). Specifically, these configs must be set:
   ```
   "compilerOptions": {
    "esModuleInterop": true,
    "module": "ESNext", // i think anything but `CommonJS` works
   }
   ```
3. Use `tsc` to build app the for production.
   - NOTE: In order to build the typescript, make sure to have these configs in `tsconfig.json`:
     ```
     "compilerOptions": {
         "noEmit": false,
     }
     ```
4. Running the server:
   - To run the server locally, use `ts-node` instead of regular `node`.
     ```
     ts-node --esm ./src/server.ts
     ```
   - To run the server locally with refresh on changes, use `nodemon` with `ts-node` instead of regular `nodemon` or `node`.
     ```
     nodemon --exec ts-node --esm ./src/server.ts
     ```
