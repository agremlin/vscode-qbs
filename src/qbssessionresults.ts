import * as vscode from 'vscode';

export class QbsSessionHelloResult {
    readonly _apiLevel: number = 0;
    readonly _apiCompatibilityLevel: number = 0;

    constructor(readonly response: any) {
        this._apiLevel = parseInt(response['api-level']);
        this._apiCompatibilityLevel = parseInt(response['api-compat-level']);
    }
}

export class QbsSessionProcessResult {
    readonly _executable: string;
    readonly _arguments: string[];
    readonly _workingDirectory: string;
    readonly _stdOutput: string[];
    readonly _stdError: string[];
    readonly _success: boolean;

    constructor(readonly response: any) {
        this._executable = response['executable-file-path'];
        this._workingDirectory = response['working-directory'];
        this._arguments = response['arguments'];
        this._stdOutput = response['stdout'];
        this._stdError = response['stderr'];
        this._success = JSON.parse(response['success']);
    }
}

export class QbsSessionTaskStartedResult {
    readonly _description: string;
    readonly _maxProgress: number;

    constructor(readonly response: any) {
        this._description = response['description'];
        this._maxProgress = parseInt(response['max-progress']);
    }
}

export class QbsSessionTaskProgressResult {
    readonly _progress: number;

    constructor(readonly response: any) {
        this._progress = parseInt(response['progress']);
    }
}

export class QbsSessionTaskMaxProgressResult {
    readonly _maxProgress: number;

    constructor(readonly response: any) {
        this._maxProgress = parseInt(response['max-progress']);
    }
}

export class QbsSessionMessageResult {
    readonly _description: string;

    constructor(readonly response: any) {
        this._description = response['message'];
    }
}

export class QbsSessionErrorInfoItemResult {
    readonly _description: string = '';
    readonly _filePath: string = '';
    readonly _line: number = -1;

    constructor(msg: string)
    constructor(readonly msg: any) {
        if (typeof msg === 'string') {
            this._description = msg;
        } else {
            this._description = msg['description'];
            const location = msg['location'];
            this._filePath = location['file-path'];
            this._line = parseInt(location['line']);
        }
    }

    toString(): string {
        let s: string = this._filePath;
        if (s.length > 0 && this._line != -1)
            s += ':' + this._line;
        if (s.length > 0)
            s += ':';
        s += this._description;
        return s;
    }
}

export class QbsSessionErrorInfoResult {
    readonly _entries: QbsSessionErrorInfoItemResult[] = [];

    constructor(readonly msg: any) {
        if (typeof msg === 'string') {
            const item = new QbsSessionErrorInfoItemResult(msg);
            this._entries.push(item);
        } else {
            const items = msg['items'] || [];
            for (const item of items) {
                const entry = new QbsSessionErrorInfoItemResult(item);
                this._entries.push(item);
            }
        }
    }

    hasError(): boolean {
        return this._entries.length > 0;
    }

    toString(): string {
        let list: string[] = [];
        for (const item of this._entries) {
            const s = item.toString();
            list.push(s);
        }
        return list.join('\n');
    }
}
