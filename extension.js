// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
	
	var symbolProvider = {
		provideDocumentSymbols: function(document, token) {
			var symInfos = [];
			
			// parse the document for functions
			for(var i = 0; i < document.lineCount; ++i) {
				var line = document.lineAt(i);
				var regex = /::([^\(]+)\(([^\)]+)\)?[\s\{]*$/gm;
				var arr = regex.exec(line.text);
				if(arr == null) continue;
				var commentIdx = line.text.indexOf('//');
				if(commentIdx > -1 && commentIdx < line.text.indexOf('::')) continue;
				var symInfo = new vscode.SymbolInformation(arr[1], vscode.SymbolKind.Function, new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)));
				symInfos.push(symInfo);
			}
			return symInfos;
		}
	};
	vscode.languages.registerDocumentSymbolProvider('cpp', symbolProvider);
}
exports.activate = activate;