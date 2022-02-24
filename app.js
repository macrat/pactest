import { JSHINT } from 'jshint'
window.JSHINT = JSHINT;

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/javascript-lint.js';
import 'codemirror/addon/scroll/simplescrollbars.js';
import 'codemirror/addon/scroll/simplescrollbars.css';

import { testPacFile } from 'pac-file-tester';

import './app.css';


window.addEventListener('DOMContentLoaded', () => {
  const editor = new CodeMirror(document.getElementById('editor'), {
    mode: 'javascript',
    indentUnit: 2,
    tabSize: 2,
    autofocus: true,
    lint: { options: { esversion: 2015 } },
    scrollbarStyle: 'simple',
    value: `// Paste PAC file here.

function FindProxyForURL(url, host) {
  return "DIRECT";
}
`,
  })
  editor.setSize('100%', '100%');
  editor.setOption('extraKeys', {
    Tab: (cm) => {
      cm.replaceSelection('  ');
    },
  });

  const testURL = document.getElementById('test-url-input');
  const clientIP = document.getElementById('client-ip-input');
  const result = document.getElementById('result-output');

  const runTest = () => {
    testPacFile(editor.getValue(), testURL.value, { ip: clientIP.value })
      .then((x) => {
        result.innerText = x;
        result.classList.remove('error');
      })
      .catch((err) => {
        result.innerText = err;
        result.classList.add('error');
      })
  };

  testURL.addEventListener('input', runTest);
  clientIP.addEventListener('input', runTest);
  editor.on('change', runTest);
});


// vim: ts=2 sw=2 et
