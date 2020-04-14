const vscode = require('vscode');
const { execSync, exec } = require('child_process');
const path = require("path");
const fs = require("fs");

const terminal = vscode.window.createTerminal(`Build JAR`);

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "jar-builder" is now active!');

	let disposable = vscode.commands.registerCommand('extension.buildjar', function () {

		let javaFile = vscode.window.activeTextEditor.document.fileName;
		let javaFilePath = path.dirname(javaFile);
		let filePath = vscode.workspace.rootPath;
		let buildPath = path.join(filePath, "build-jar");
		let editorFile = path.basename(javaFile, path.extname(javaFile));
		let jarFile = path.join(buildPath, `${editorFile}.jar`);

		let commandLinux = `rm -rf ${buildPath} && mkdir ${buildPath} && javac -d ${buildPath} ${javaFilePath}/* && jar cvf ${jarFile} ${buildPath} *`;
		let commandWindows = `rmdir  /s /q ${buildPath} | mkdir ${buildPath} | javac -d ${buildPath} ${javaFilePath}/* | jar cvf ${jarFile} ${buildPath} *`;

		let commands = [
			`${process.platform == 'win32' ? 'rmdir  /s /q' : 'rm -rf'} ${buildPath}`,
			`mkdir ${buildPath}`,
			`javac -d ${buildPath} ${javaFilePath}/*`,
			`jar cvf ${jarFile} ${buildPath} *`
		]

		// vscode.window.setStatusBarMessage('$(loading~spin) Cleaning workspace..');

		// exec(`${process.platform == 'win32' ? 'rmdir  /s /q' : 'rm -rf'} ${buildPath}`, (errRm, stdoutRm, stderrRm) => {
		// 	fs.mkdir(buildPath, (errDir) => {
		// 		if (!errDir) {
		// 			vscode.window.setStatusBarMessage('$(loading~spin) Building Java files..');
		// 			exec(`javac -d ${buildPath} ${javaFilePath}/*`, (errJavac, stdoutJavac, stderrJavac) => {
		// 				if (!errJavac) {
		// 					vscode.window.setStatusBarMessage('$(loading~spin) Generating JAR file..');
		// 					exec(`jar cvf ${jarFile} ${buildPath} *`, (errJar, stdoutJar, stderrJar) => {
		// 						if (!errJar) {
		// 							vscode.window.setStatusBarMessage('JAR built is successful!');
		// 							vscode.window.showInformationMessage('JAR file is Successfully built!');
		// 						}
		// 						else {
		// 							// Error jar
		// 							vscode.window.setStatusBarMessage('JAR built is failed!');
		// 							vscode.window.showInformationMessage(errJar.message);
		// 						}
		// 					});
		// 				}
		// 				else {
		// 					// Error javac
		// 					vscode.window.setStatusBarMessage('Building Java files is failed!');
		// 					vscode.window.showErrorMessage(errJavac.message);
		// 				}
		// 			});
		// 		}
		// 		else {
		// 			// Error mkdir
		// 			vscode.window.setStatusBarMessage('Cleaning workspace is failed!');
		// 			vscode.window.showErrorMessage(errDir.message);
		// 		}
		// 	});
		// });

		// if (fs.existsSync(buildPath)) {
		// 	try {
		// 		deleteFolderRecursive(buildPath);
		// 	} catch (e) {
		// 		isError = true;
		// 		vscode.window.showErrorMessage(e.message);
		// 	}
		// }

		// if(isError) return;

		// fs.mkdirSync(buildPath);

		// vscode.window.setStatusBarMessage('$(loading~spin) Bulding Java files..');

		// try {
		// 	execSync(`javac -d ${buildPath} ${javaFilePath}/*`);
		// } catch (err) {
		// 	isError = true;
		// 	vscode.window.showErrorMessage(err.message);
		// }

		// if (isError) return;

		// vscode.window.setStatusBarMessage('$(loading~spin) Generating JAR file..');

		// try {
		// 	execSync(`jar cvf ${jarFile} ${buildPath} *`);
		// } catch (err) {
		// 	isError = true;
		// 	vscode.window.showErrorMessage(err.message);
		// }

		// if (isError) return;

		// vscode.window.showInformationMessage('JAR file is Successfully built');

		// vscode.window.setStatusBarMessage('JAR file is Successfully built');

		commands.forEach(command => terminal.sendText(command));
		terminal.show();

		// Display a message box to the user
		terminal.processId.then((processId) => {
			vscode.window.showInformationMessage('JAR Successfully built');
		});
	});

	context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}