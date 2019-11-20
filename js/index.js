let ducky = document.getElementById('ducky-script')
let duckuino = document.getElementById('duckuino-code')

const topBaseDuckUinoCode = `
#include <Keyboard.h>
#define KEY_PAUSE (76+136)

void setup() {
  Keyboard.begin();`
/*
  delay(500);
  print(F("Hello bitches!"));
*/

const bottomBaseDuckUinoCode = `
  Keyboard.end();
}

void type(int key){
  Keyboard.press(key);
  delay(50);
  Keyboard.release(key);
}

void print(const __FlashStringHelper *value){
  Keyboard.print(value);
}`

duckuino.value = topBaseDuckUinoCode+bottomBaseDuckUinoCode

const duckyCommands = [
  'REM',
  'STRING',
  'DELAY',
  'WINDOWS',
  'GUI',
  'MENU',
  'SHIFT',
  'ALT',
  'CTRL',
  'CONTROL',
  'DOWNARROW',
  'DOWN',
  'UPARROW',
  'UP',
  'RIGHTARROW',
  'RIGHT',
  'LEFTARROW',
  'LEFT'
]

const possibleAltParameters = [
  'END',
  'ESC',
  'ESCAPE',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'SPACE',
  'TAB'
]

const possibleCtrlParameters = [
  'ESC',
  'ESCAPE',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'BREAK',
  'PAUSE'
]

ducky.onkeyup = () => {
    console.log("HEL")
    //duckuino.value = ducky.value

    let lines = ducky.value.split('\n')
    let finalLine = "\n"
    console.log(lines)
    lines.forEach(line => {
      let command = line.split(' ') // pos 0 should be a duckyCommand
      const commandType = command[0]
      command.shift()
      command = command.join(' ')
      if (duckyCommands.includes(commandType)) {
        switch (commandType) {
          case 'REM':
            finalLine += "  //" + command + "\n"
            break
          case 'STRING':
            finalLine += '  print(F("' + command + '"));\n'
            break
          case 'DELAY':
            finalLine += "  delay(" + command + ");\n"
            break
          case 'WINDOWS':
            finalLine += "  type(KEY_LEFT_GUI);\n"
            break
          case 'GUI':
            finalLine += '  Keyboard.press(KEY_LEFT_GUI);\n  Keyboard.press("' + command + '");\n  Keyboard.releaseAll();\n'
            finalLine += '  Keyboard.press(KEY_LEFT_GUI);\n  Keyboard.press("'+command+'");\n  Keyboard.releaseAll();\n'
            break
          case 'MENU':
            finalLine += '  type(KEY_MENU);\n'
            break
          case 'SHIFT':
            finalLine += '  Keyboard.press(KEY_LEFT_SHIFT);\n'
            let optionalParameter = ""
            if(command){
              switch(command){
                case 'DELETE':
                  optionalParameter = "KEY_DELETE"
                  break
                case 'HOME':
                  optionalParameter = "KEY_HOME"
                  break
                case 'INSERT':
                  optionalParameter = "KEY_INSERT"
                  break
                case 'PAGEUP':
                  optionalParameter = "KEY_PAGE_UP"
                  break
                case 'PAGEDOWN':
                  optionalParameter = "KEY_PAGE_DOWN"
                  break
                case 'WINDOWS':
                case 'GUI':
                  optionalParameter = "KEY_LEFT_GUI"
                  break
                case 'UPARROW':
                  optionalParameter = "KEY_UP_ARROW"
                  break
                case 'DOWNARROW':
                  optionalParameter = "KEY_DOWN_ARROW"
                  break
                case 'LEFTARROW':
                  optionalParameter = "KEY_LEFT_ARROW"
                  break
                case 'RIGHTARROW':
                  optionalParameter = "KEY_RIGHT_ARROW"
                  break
                case 'TAB':
                  optionalParameter = "KEY_TAB"
              }
              finalLine += '  Keyboard.press('+optionalParameter+');\n  Keyboard.releaseAll();\n'
            }// Keyboard.press("' + command + '");\n  Keyboard.releaseAll();\n'
            break
          case 'ALT':
            finalLine += '  Keyboard.press(KEY_LEFT_ALT);\n'
            if (command) {
              if(possibleAltParameters.includes(command)){
                let optionalParameter = ""
                switch (command) {
                  case 'END':
                    optionalParameter = "KEY_END"
                    break
                  case 'ESC':
                  case 'ESCAPE':
                    optionalParameter = "KEY_ESC"
                    break
                  case 'F1':
                    optionalParameter = "KEY_F1"
                    break
                  case 'F2':
                    optionalParameter = "KEY_F2"
                    break
                  case 'F3':
                    optionalParameter = "KEY_F3"
                    break
                  case 'F4':
                    optionalParameter = "KEY_F4"
                    break
                  case 'F5':
                    optionalParameter = "KEY_F5"
                    break
                  case 'F6':
                    optionalParameter = "KEY_F6"
                    break
                  case 'F7':
                    optionalParameter = "KEY_F7"
                    break
                  case 'F8':
                    optionalParameter = "KEY_F8"
                    break
                  case 'F9':
                    optionalParameter = "KEY_F9"
                    break
                  case 'F10':
                    optionalParameter = "KEY_F10"
                    break
                  case 'F11':
                    optionalParameter = "KEY_F11"
                    break
                  case 'F12':
                    optionalParameter = "KEY_F12"
                    break
                  case 'TAB':
                    optionalParameter = "KEY_TAB"
                    break
                }
                finalLine += '  Keyboard.press(' + optionalParameter + ');\n  Keyboard.releaseAll();\n'
              } else {
                if(command === 'SPACE'){
                  command = ' '
                }
                finalLine += '  print(F("' + command + '"));\n'
              }
              
            }
            break
          case 'CONTROL':
          case 'CTRL':
            finalLine += '  Keyboard.press(KEY_LEFT_CTRL);\n'
            if (command) {
              if (possibleAltParameters.includes(command)) {
                let optionalParameter = ""
                switch (command) {
                  /*case 'BREAK':
                    optionalParameter = "KEY_BREAK"
                    break  
                    
                    NEED TO SEARCH FOR THIS KEY CODE
                    
                    */
                  case 'ESC':
                  case 'ESCAPE':
                    optionalParameter = "KEY_ESC"
                    break
                  case 'F1':
                    optionalParameter = "KEY_F1"
                    break
                  case 'F2':
                    optionalParameter = "KEY_F2"
                    break
                  case 'F3':
                    optionalParameter = "KEY_F3"
                    break
                  case 'F4':
                    optionalParameter = "KEY_F4"
                    break
                  case 'F5':
                    optionalParameter = "KEY_F5"
                    break
                  case 'F6':
                    optionalParameter = "KEY_F6"
                    break
                  case 'F7':
                    optionalParameter = "KEY_F7"
                    break
                  case 'F8':
                    optionalParameter = "KEY_F8"
                    break
                  case 'F9':
                    optionalParameter = "KEY_F9"
                    break
                  case 'F10':
                    optionalParameter = "KEY_F10"
                    break
                  case 'F11':
                    optionalParameter = "KEY_F11"
                    break
                  case 'F12':
                    optionalParameter = "KEY_F12"
                    break
                  case 'PAUSE':
                    optionalParameter = "KEY_PAUSE"
                    break
                }
                finalLine += '  Keyboard.press(' + optionalParameter + ');\n  Keyboard.releaseAll();\n'
              } else {
                finalLine += '  print(F("' + command + '"));\n'
              }

            }
            break
          case 'DOWNARROW':
          case 'DOWN':
            finalLine += "  type(KEY_DOWN_ARROW);\n"
            break
            
          case 'UPARROW':
          case 'UP':
            finalLine += "  type(KEY_UP_ARROW);\n"
            break
            
          case 'RIGHTARROW':
          case 'RIGHT':
            finalLine += "  type(KEY_RIGHT_ARROW);\n"
            break
            
          case 'LEFTARROW':
          case 'LEFT':
            finalLine += "  type(KEY_LEFT_ARROW);\n"
            break
        }   
      }

    })

    const duckUinoCompiled = topBaseDuckUinoCode+finalLine+bottomBaseDuckUinoCode

    duckuino.value = duckUinoCompiled

}

document.getElementById('download-btn').onclick = () => {
  download(duckuino.value)
}

function download(text) {
  let filename = "duckuino_script.ino"
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}