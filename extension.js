// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');
const path = require("path");

const terminal = vscode.window.createTerminal(`Build JAR`);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jar-builder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.buildjar', function () {
		// The code you place here will be executed every time your command is executed

		let javaFile = vscode.window.activeTextEditor.document.fileName;
		let javaFilePath = path.dirname(javaFile);
		let filePath = vscode.workspace.rootPath;
		let buildPath = filePath + "/build-jar";
		let editorFile = path.basename(javaFile, path.extname(javaFile));
		let jarFile = buildPath + `/${editorFile}.jar`;

		let command = `rm -rf ${buildPath} && mkdir ${buildPath} && javac -d ${buildPath} ${javaFilePath}/* && jar cvf ${jarFile} ${buildPath} *`;

		// exec(command, (err, stdout, stderr) => {
		// 	console.log('stdout: ' + stdout);
		// 	console.log('stderr: ' + stderr);
		// 	if (err) {
		// 		console.log('error: ' + err);
		// 	}
		// });

		terminal.sendText(command);
		terminal.show();

		// Display a message box to the user
		terminal.processId.then((processId) => {
			vscode.window.showInformationMessage('JAR Successfully built');
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
