# Ionic-React
A reminder for myself on how to setup an Ionic + React cross-platform Mobile & Desktop apps

### Installation and Setup

1. First, check that you have a connected device or an emulator for development and testing purposes.
2. Install ionic cli `npm uninstall -g ionic` and then `npm install -g @ionic/cli`.
3. To create an Ionic app run the command: `ionic start`. <br/>
Optionally, specify app arguments: `ionic start app_path blank --type react`.

### Native Platforms
Using [Capacitor](https://capacitorjs.com/docs), we add native-platform runtime for every platform supported by our project.
* Add platform: `ionic capacitor add <platform>`
* Copy web assets to native project: `ionic capacitor copy <platform>`

### Running the app
Before running the app, do the following:
* Build the app using `ionic capacitor build <platform>`. To avoid opening android studio: `ionic capacitor sync <platform>`.
* Add file `local.properties` in the `App/android` folder, with `sdk.dir=<path_to_android_sdk>`. Or --
* Run command `ionic capacitor open android` which will open android studio and add the above file automatically.

Then:
* Browser: `ionic serve`
* Live Reload server: `ionic capacitor run <platform> -l --external`
* More details on running through Capacitor [Here](https://capacitorjs.com/docs/cli/commands/run)

### Links for Extra Tools
* [Capacitor APIs for native platforms](https://capacitorjs.com/docs/plugins/workflow)
* [Ionic UI Components](https://ionicframework.com/docs/components)
