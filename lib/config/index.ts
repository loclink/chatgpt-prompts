import ProjectInfo from '../../package.json'
// import { readJSONSync } from 'fs-extra'
// import { resolve } from 'path'
// console.log(readJSONSync(resolve(__dirname, '../package.json')))
const __VERSION__ = ProjectInfo.version;

export { __VERSION__ };
