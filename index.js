// const path = require('node:path');
// const fsPromises = require('node:fs/promises');
//
// const createFolderStructure = async () => {
//     const baseFolder = path.join(__dirname, 'baseFolder');
//
//     await fsPromises.mkdir(baseFolder, { recursive: true });
//
//     const folder1Path = path.join(baseFolder, 'folder1');
//     await fsPromises.mkdir(folder1Path);
//     await fsPromises.writeFile(path.join(folder1Path, 'file1.txt'), 'Content for file1');
//     await fsPromises.writeFile(path.join(folder1Path, 'file2.txt'), 'Content for file2');
//     await fsPromises.writeFile(path.join(folder1Path, 'file3.txt'), 'Content for file3');
//     await fsPromises.writeFile(path.join(folder1Path, 'file4.txt'), 'Content for file4');
//     await fsPromises.writeFile(path.join(folder1Path, 'file5.txt'), 'Content for file5');
//
//     const folder2Path = path.join(baseFolder, 'folder2');
//     await fsPromises.mkdir(folder2Path);
//     await fsPromises.writeFile(path.join(folder2Path, 'file1.txt'), 'Content for file1');
//     await fsPromises.writeFile(path.join(folder2Path, 'file2.txt'), 'Content for file2');
//     await fsPromises.writeFile(path.join(folder2Path, 'file3.txt'), 'Content for file3');
//     await fsPromises.writeFile(path.join(folder2Path, 'file4.txt'), 'Content for file4');
//     await fsPromises.writeFile(path.join(folder2Path, 'file5.txt'), 'Content for file5');
//
//     const folder3Path = path.join(baseFolder, 'folder3');
//     await fsPromises.mkdir(folder3Path);
//     await fsPromises.writeFile(path.join(folder3Path, 'file1.txt'), 'Content for file1');
//     await fsPromises.writeFile(path.join(folder3Path, 'file2.txt'), 'Content for file2');
//     await fsPromises.writeFile(path.join(folder3Path, 'file3.txt'), 'Content for file3');
//     await fsPromises.writeFile(path.join(folder3Path, 'file4.txt'), 'Content for file4');
//     await fsPromises.writeFile(path.join(folder3Path, 'file5.txt'), 'Content for file5');
//
//     const folder4Path = path.join(baseFolder, 'folder4');
//     await fsPromises.mkdir(folder4Path);
//     await fsPromises.writeFile(path.join(folder4Path, 'file1.txt'), 'Content for file1');
//     await fsPromises.writeFile(path.join(folder4Path, 'file2.txt'), 'Content for file2');
//     await fsPromises.writeFile(path.join(folder4Path, 'file3.txt'), 'Content for file3');
//     await fsPromises.writeFile(path.join(folder4Path, 'file4.txt'), 'Content for file4');
//     await fsPromises.writeFile(path.join(folder4Path, 'file5.txt'), 'Content for file5');
//
//     const folder5Path = path.join(baseFolder, 'folder5');
//     await fsPromises.mkdir(folder5Path);
//     await fsPromises.writeFile(path.join(folder5Path, 'file1.txt'), 'Content for file1');
//     await fsPromises.writeFile(path.join(folder5Path, 'file2.txt'), 'Content for file2');
//     await fsPromises.writeFile(path.join(folder5Path, 'file3.txt'), 'Content for file3');
//     await fsPromises.writeFile(path.join(folder5Path, 'file4.txt'), 'Content for file4');
//     await fsPromises.writeFile(path.join(folder5Path, 'file5.txt'), 'Content for file5');
//
//     console.log('Created folders and files:');
//     console.log('Directory:', baseFolder);
//     console.log('Directory:', folder1Path);
//     console.log('File:', path.join(folder1Path, 'file1.txt'));
//     console.log('File:', path.join(folder1Path, 'file2.txt'));
//     console.log('File:', path.join(folder1Path, 'file3.txt'));
//     console.log('File:', path.join(folder1Path, 'file4.txt'));
//     console.log('File:', path.join(folder1Path, 'file5.txt'));
//
//     console.log('Directory:', folder2Path);
//     console.log('File:', path.join(folder2Path, 'file1.txt'));
//     console.log('File:', path.join(folder2Path, 'file2.txt'));
//     console.log('File:', path.join(folder2Path, 'file3.txt'));
//     console.log('File:', path.join(folder2Path, 'file4.txt'));
//     console.log('File:', path.join(folder2Path, 'file5.txt'));
//
//     console.log('Directory:', folder3Path);
//     console.log('File:', path.join(folder3Path, 'file1.txt'));
//     console.log('File:', path.join(folder3Path, 'file2.txt'));
//     console.log('File:', path.join(folder3Path, 'file3.txt'));
//     console.log('File:', path.join(folder3Path, 'file4.txt'));
//     console.log('File:', path.join(folder3Path, 'file5.txt'));
//
//     console.log('Directory:', folder4Path);
//     console.log('File:', path.join(folder4Path, 'file1.txt'));
//     console.log('File:', path.join(folder4Path, 'file2.txt'));
//     console.log('File:', path.join(folder4Path, 'file3.txt'));
//     console.log('File:', path.join(folder4Path, 'file4.txt'));
//     console.log('File:', path.join(folder4Path, 'file5.txt'));
//
//     console.log('Directory:', folder5Path);
//     console.log('File:', path.join(folder5Path, 'file1.txt'));
//     console.log('File:', path.join(folder5Path, 'file2.txt'));
//     console.log('File:', path.join(folder5Path, 'file3.txt'));
//     console.log('File:', path.join(folder5Path, 'file4.txt'));
//     console.log('File:', path.join(folder5Path, 'file5.txt'));
// };
//
// createFolderStructure().catch(console.error);

//
// const path = require('node:path');
// const fsPromises = require('node:fs/promises');
//
// const createFolderStructure = async () => {
//     const baseFolder = path.join(__dirname, 'baseFolder');
//
//     await fsPromises.mkdir(baseFolder, { recursive: true });
//
//     const createFolderAndFiles = async (folderName) => {
//         const folderPath = path.join(baseFolder, folderName);
//         await fsPromises.mkdir(folderPath);
//
//         const folderStat = await fsPromises.stat(folderPath);
//         console.log(`Path: ${folderPath}, isDirectory: ${folderStat.isDirectory()}`);
//
//         for (let i = 1; i <= 5; i++) {
//             const filePath = path.join(folderPath, `file${i}.txt`);
//             await fsPromises.writeFile(filePath, `Content for ${folderName} file${i}`);
//
//             const fileStat = await fsPromises.stat(filePath);
//             console.log(`Path: ${filePath}, isFile: ${fileStat.isFile()}`);
//         }
//     };
//
//     await createFolderAndFiles('folder1');
//     await createFolderAndFiles('folder2');
//     await createFolderAndFiles('folder3');
//     await createFolderAndFiles('folder4');
//     await createFolderAndFiles('folder5');
//
//     const baseFolderStat = await fsPromises.stat(baseFolder);
//     console.log(`Path: ${baseFolder}, isDirectory: ${baseFolderStat.isDirectory()}`);
// };
//
// createFolderStructure().catch(console.error);


const fs = require('fs');
const path = require('path');

const baseFolder = path.join(__dirname, 'baseFolder');

function createFolderStructure() {
    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder);
    }

    for (let i = 1; i <= 5; i++) {
        const folderPath = path.join(baseFolder, `folder${i}`);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        for (let j = 1; j <= 5; j++) {
            const filePath = path.join(folderPath, `file${j}.txt`);
            fs.writeFileSync(filePath, `This is file ${j} in folder ${i}`);
        }
    }
}

function printFolderContents(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            console.log(`${itemPath} - folder`);
            printFolderContents(itemPath);
        } else if (stats.isFile()) {
            console.log(`${itemPath} - file`);
        }
    });
}

createFolderStructure();

printFolderContents(baseFolder);
