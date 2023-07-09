export default class PathUtils {
    static startPath = path.join(__dirname, '..');

    static userPath = process.env['USERPROFILE'];

    static userDocPath;

    static appdataPath = process.env['APPDATA'];

    static resolvePath = (dirPath) => {
        return path.join(PathUtils.startPath, dirPath || '.');
    };

    static resolveUserPath = (dirPath) => {
        return path.join(PathUtils.userPath, dirPath || '.');
    };

    static resolveUserDocPath = (dirPath) => {
        return new Promise((resolve, reject) => {
            getUserDoc().then((docPath) => {
                PathUtils.userDocPath = docPath;
                resolve(PathUtils.userDocPath);
            });
        });
    };
}