/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                entry: './a',
                output: {
                    path: __dirname + '/binary',
                    filename: 'promise.js',
                },
            });
        }, 5000);
    });
};