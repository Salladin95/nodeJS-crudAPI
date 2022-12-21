declare const getFileNameAndDirname: (url: string) => {
    filename: string;
    dirname: string;
};
declare const getDirname: (url: string) => string;
export { getDirname, getFileNameAndDirname };
