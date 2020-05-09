const electron = require("electron");
const url = require("url");
const path = require("path");

const{app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;
//Listen for app to be ready
app.on('ready', function() {
    //create new window
    mainWindow = new BrowserWindow({});
    //Load html file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMemuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){
 //create new window
 addWindow = new BrowserWindow({
     width: 200,
     height:300,
     title:'Add Shopping List Item'
 });
 //Load html file into window
 addWindow.loadURL(url.format({
     pathname: path.join(__dirname, 'addWindow.html'),
     protocol: 'file',
     slashes: true
 }));
}

//Create menu template

const mainMemuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

/* //If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add dev tools if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle Dev Tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}; */