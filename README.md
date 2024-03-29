// Setup

npm init -y

npm i express dotenv

npm i -D typescript @types/express @types/node

npx tsc --init

//Add "outDir"
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}

npm i -D nodemon ts-node

{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}