# ANGULAR ERRORS
## npm ERR! code UNABLE_TO_GET_ISSUER_CERT_LOCALLY
### Solution
* execute commands:
npm config set strict-ssl=false
npm config set registry http://registry.npmjs.or
npm cache clean --force

## npm ERR! code ERESOLVE -AND- npm ERR! ERESOLVE unable to resolve dependency tree
### Solution
* execute command: npm install --legacy-peer-deps

* npm i npm@6.14.8 --force

## ng: File C:\Users\admin\AppData\Roaming\npm\ng.ps1 cannot be loaded because running scripts is disabled on this system
### Solution
* set-ExecutionPolicy RemoteSigned -Scope CurrentUser 

## Unable to resolve "unable to get local issuer certificate" using git on Windows with self-signed certificate
### Solution
* git config --global http.sslbackend schannel

## ERROR in node_modules/@firebase/firestore/dist/index.d.ts(27,28): error TS1005: ']' expected
### Solution
* I solved it myself as follows:
- I used @angular/fire 6.1.5 and firebase 8.10.0
- I deleted node_modules.
- I manually added package in package.json.
- Then I reinstalled with npm install

## ERROR in node_modules/@angular/fire/angularfire2.d.ts(37,49): error TS2344: Type 'T[K]' does not satisfy the constraint '(...args: any) => any'
### Solution
* Add this to your tsconfig.json :

compilerOptions: {
    "skipLibCheck": true
  }

## How to fix: "@angular/fire"' has no exported member 'AngularFireModule'.ts(2305) ionic, firebase, angular
### Solution
* @angular/fire ^7.0.4 does not match this one dependency: firebase ^7.24.0.

- Either you depend on firebase 9.0.2 - or downgrade to @angular/fire ^6.1.5.

- Just see the documentation which I've linked, it clearly states that.

"@angular/fire": "~7.0.4",
"firebase": "~9.0.2",

## Error: Could not find the '@angular-devkit/build-angular:dev-server' builder's node package
### Solution
* npm install --save-dev @angular-devkit/build-angular

## npm ERR! code EPERM
### Solution 
* Run npm config edit (You will get notepad editor)
- Change prefix variable to C:\Users\<User Name>\AppData\Roaming\npm
- Then npm start works in a normal console.

## Error: Cannot find module 'typescript'
### Solution
* npm install -g typescript --save

## gyp ERR! configure error
### Solution
* npm install -g --unsafe-perm node-sass --save

## npm ERR! code ELIFECYCLE
### Solution
- npm cache clean --force

## ERROR in node_modules/sweetalert/typings/sweetalert.d.ts:4:9 - error TS2403: Subsequent variable declarations must have the same type
### Solution
* I think this line have to removed:
sweetalert/src/sweetalert.d.ts
 const swal: SweetAlert; 

