export class CommonUtil {
    static getFileExtension(fullFileName: string)  {
        return fullFileName.split('.').pop();
    };
}