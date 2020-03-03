import nodemon from 'nodemon'
// import node from 'node'

export function startServer() {
  return nodemon({
    script: './serv/main.js',
    ext: 'js json'
  });
}