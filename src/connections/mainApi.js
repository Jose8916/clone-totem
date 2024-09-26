const serverBaseURL = 'https://be.mitotem.com/api/v1';
const stagingBaseURL = 'https://qabe.mitotem.com/api/v1';
const devBaseURL = 'http://localhost:3001/api/v1';
const urls = [serverBaseURL, stagingBaseURL, devBaseURL];
let environmentURL = 2;
switch (import.meta.env.MODE) {
    case 'development':
        environmentURL = 2;
        break;
    case 'staging':
        environmentURL = 1;
        break;
    case 'production':
        environmentURL = 0;
        break;
    default:
        environmentURL = 2;
}
export const url = urls[environmentURL];