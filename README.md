# NodeJS + ExpressJS + Mongoose

## Step start when clone
```js
npm install
npm run dev
```

## Initial initialization steps

```js
npm init -y
npm i express dotenv
npm i -D typescript @types/express @types/node
npx tsc --init
npm i -D nodemon ts-node
```

### Modify config
```js
// tsconfig.json | add "outDir" path
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}
//package.json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}
```