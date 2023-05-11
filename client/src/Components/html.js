export const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>MathQuill in Webview Example</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.css" />
  </head>
  <body>
  
    <style>
      * {
      user-select: none;
      }

      body {
        margin: 0; 
        padding: 0;
      }

      .container {
        position: relative;
        width: 100%; 
        height: 100vh;
        overflow: hidden;
      }

      .input-field-container {
        max-width: 100%; 
        display: flex; 
        justify-content:center
      }

      .input-field {
        text-align: center;
        font-size: 32px; 
        margin-top:12px; 
        width: 90%; 
        border: none; 
        box-shadow: 2px 2px 5px #888888;
      }

      .invisibility {
        visibility: hidden;
      }

      @keyframes fadeIn {
        from { opacity: 0; } /* Start at 0 opacity */
        to { opacity: 1; } /* End at 1 opacity */
      }

      .control-container {
        width: 100%; 
        display: flex;
        flex-wrap: wrap; 
        position: absolute; 
        bottom: 0;
        animation-name: fadeIn;
        animation-duration: 1200ms;
      }

      .math-button {
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100%/7); 
        height: 64px; 
        border: 0.5px solid #fff; 
        font-size: 20px; 
        color: white;
        font-weight: 500;
        background-color: #B762FD;
      }

      .numeric {
        background-color: #AE4EFC;
      }

      .control {
        background-color: #FC453B;
      }
      
      .active {
        opacity: 0.8;
      }

      .ON-OFF {
        display: none;
        margin: auto;
        border-radius: 8px;
        align-items: center;
        justify-content: center;  
        width: 90%;
        min-height: 48px;
        background-color: #AE4EFC;
        font-size: 24px;
        font-weight: 600;
        color: white;
        animation-name: fadeIn;
        animation-duration: 1200ms;
      }
      
    </style>

    <div class='container'>
        <div class='input-field-container'>
          <div
            class="input-field"
            id="mathquill-editor"
            contenteditable="true">
          </div>
        </div>
        <p class='invisibility'>LaTeX of what you typed: <span id="latex"></span></p>
        <div id ='open' class='ON-OFF'>
          Keyboard
        </div>
        <div id='keyboard' class='control-container'>
          <button class='math-button' id="int">∫</button>
          <button class='math-button' id="sqrt">√</button>
          <button class='math-button' id="sin">sin</button>
          <button class='math-button numeric' id="one">1</button>
          <button class='math-button numeric' id="two">2</button>
          <button class='math-button numeric' id="three">3</button>
          <button class='math-button numeric' id="plus">+</button>
          <button class='math-button' id="cos">cos</button>
          <button class='math-button' id="x">x</button>
          <button class='math-button' id="frac"><div style='transform: rotate(90deg);'>□|□</div></button>
          <button class='math-button numeric' id="four">4</button>
          <button class='math-button numeric' id="five">5</button>
          <button class='math-button numeric' id="six">6</button>
          <button class='math-button numeric' id="minus">-</button>
          <button class='math-button' id="power">x▘</button>
          <button class='math-button' id="deri"><sup>d</sup>/<sub>dx</sub></button>
          <button class='math-button' id="log">log</button>
          <button class='math-button numeric' id="seven">7</button>
          <button class='math-button numeric' id="eight">8</button>
          <button class='math-button numeric' id="nine">9</button>
          <button class='math-button numeric' id="mul">*</button>
          <button class='math-button' id="exp">e▘</button>
          <button class='math-button' style='font-weight: 1000; font-size: 38px;' id="left"><div style='transform: translateY(-15%);'>←</div></button>
          <button class='math-button' style='font-weight: 1000; font-size: 38px;' id="right"><div style='transform: translateY(-15%);'>→</div></button>
          <button class='math-button numeric' id="zero">0</button>
          <button class='math-button numeric' id="equal">=</button>
          <button class='math-button control' id="delete">⌫</button>
          <button class='math-button control' id="myButton">GO</button>
        <div>
    </div>
 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.min.js"></script>
    <script>
      var myButton = document.getElementById('myButton');
      var latexSpan = document.getElementById('latex');
      var edit = document.getElementById('mathquill-editor');
      var open = document.getElementById('open');

      var data = [
        {
          fe: 'int',
          be: '\\\\left(\\\\int_{}^{}\\\\left(  \\\\right)\\\\right)'
        },
        {
          fe: 'sqrt',
          be: '\\\\sqrt{}'
        },
        {
          fe: 'sin',
          be: '\\\\sin()'
        },
        {
          fe: 'cos',
          be: '\\\\cos()'
        },
        {
          fe: 'power',
          be: '^{}'
        },
        {
          fe: 'frac',
          be: '\\\\frac{}{}'
        },
        {
          fe: 'log',
          be: '\\\\log()'
        },
        {
          fe: 'exp',
          be: 'e^{}'
        },
        {
          fe: 'x',
          be: 'x'
        },
        {
          fe: 'plus',
          be: '+'
        },
        {
          fe: 'minus',
          be: '-'
        },
        {
          fe: 'mul',
          be: '*'
        },
      
        {
          fe: 'equal',
          be: '='
        },
        {
          fe: 'deri',
          be: '\\\\frac{d}{dx}'
        },
        {
          fe: 'zero',
          be: '0'
        },
        {
          fe: 'one',
          be: '1'
        },
        {
          fe: 'two',
          be: '2'
        },
        {
          fe: 'three',
          be: '3'
        },
        {
          fe: 'four',
          be: '4'
        },
        {
          fe: 'five',
          be: '5'
        },
        {
          fe: 'six',
          be: '6'
        },
        {
          fe: 'seven',
          be: '7'
        },
        {
          fe: 'eight',
          be: '8'
        },
        {
          fe: 'nine',
          be: '9'
        },
      ]

      $(document).ready(function () {
        var MQ = MathQuill.getInterface(2);
        var mathField = MQ.MathField($('#mathquill-editor')[0], {
          spaceBehavesLikeTab: true,
          handlers: {
            edit: function () {
              window.postMessage(
                {
                  type: 'latex',
                  data: mathField.latex(),
                },
                '*',
              );
              latexSpan.textContent = mathField.latex();
            },
          },
        });

        document.getElementById('left').addEventListener('click', function() {
          mathField.keystroke('Left')
          document.getElementById('left').classList.add('active')
          setTimeout(()=>document.getElementById("left").classList.remove("active"), 200);
        });
    
        document.getElementById('right').addEventListener('click', function() {
          mathField.keystroke('Right')
          document.getElementById('right').classList.add('active')
          setTimeout(()=>document.getElementById("right").classList.remove("active"), 200);
        });

        document.getElementById('delete').addEventListener('click', function() {
          mathField.keystroke('Backspace')
          document.getElementById('delete').classList.add('active')
          setTimeout(()=>document.getElementById("delete").classList.remove("active"), 200);
        });

        document.getElementById('mathquill-editor').addEventListener('click', function() {
          document.getElementById("keyboard").style.display = 'none';
          document.getElementById("open").style.display = 'flex';
        });

        document.getElementById('open').addEventListener('click', function() {
          document.getElementById("keyboard").style.display = 'flex';
          document.getElementById("open").style.display = 'none';

        });

        myButton.addEventListener('click', function () {
          window.ReactNativeWebView.postMessage(latexSpan.innerHTML);
          document.getElementById('myButton').classList.add('active')
          setTimeout(()=>document.getElementById("myButton").classList.remove("active"), 200);
        });  
        
        data.forEach(el => document.getElementById(el.fe).addEventListener('click', function() {
          mathField.write(el.be);
          document.getElementById(el.fe).classList.add('active')
          setTimeout(()=>document.getElementById(el.fe).classList.remove("active"), 200);
         
        }))
        
      });

    </script>
  </body>
</html>

     `;
