# QBS: Debug and run

QBS debugging relies on the debug engines supported in VS Code. All debugger
configurations must be described in the file `launch.json'. The format of this
file and the list of supported debuggers can be found on the official VS Code
[documentation](https://code.visualstudio.com/docs/cpp/launch-json-reference).

## Configure debuggers

First you need to create the 'launch.json' file and place it in the current
project workspace folder, along the path `<path/to/your/project/.vscode/launch.json>`.

For example, the minimum debugger configuration for `MSVC` and `GCC`
toolchains might look like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C++ Debugger (MSVC)",
            "type": "cppvsdbg",
            "request": "launch",
            "externalConsole": false
        },
        {
            "name": "C++ Debugger (GDB)",
            "type": "cppdbg",
            "request": "launch",
            "MIMode": "gdb",
            "externalConsole": false
        }
    ]
}
```

Use `"externalConsole": false` if you want to see the trace output of
your product in the VS Code debug output pane.

The user can specify any other location for the `launch.json` file by changing
the `qbs.launchFilePath` variable in the plugin settings.

## Run with debugging

You should choose the desired debugger for debugging.

* From the command palette in VS Code, run the **QBS: Select Launch Configuration**
command, or press the **Click to Select the Launch Configuration** button in right
of the status bar.

* From the command palette in VS Code, run the **QBS: Debug**
command, or press the **Debug** button in the status bar.

Make sure that the product being debugged is preselected in the
**Click to Select the Product to Debug or Run** button.

## Run without debugging

* From the command palette in VS Code, run the **QBS: Run**
command, or press the **Run** button in the status bar.

Make sure that the product being debugged is preselected in the
**Click to Select the Product to Debug or Run** button.

The output of the running product will be shown in an integrated terminal.

## Command values for launch.json and task.json

Sometime running an application natively via this extenion is not desired
(for example when using
[Cortex-Debug](https://marketplace.visualstudio.com/items?itemName=marus25.cortex-debug)).
For that case the QBS extensions provides the following [command variables](https://code.visualstudio.com/docs/editor/variables-reference#_command-variables):
*  `qbs.getSelectedProductPath`
*  `qbs.getBuildDirectory`

For example, set the path to an `.elf`-file when using the cortex-debug extension
can be done with:

```json
{
    "version": "0.2.0",
    "configurations": [
		{
			"cwd": "${workspaceRoot}",
			"executable": "${command:qbs.getBuildDirectory}/install-root/usr/local/bin/firmware.elf",
			"name": "Debug Microcontroller",
			"request": "launch",
			"type": "cortex-debug",
			"showDevDebugOutput": false,
			"servertype": "jlink"
		}
    ]
}
```
(assuming that you set the `qbs.installDir` for `firmware.elf` to `bin`)

## Next steps

- Explore the [QBS documentation](README.md)
