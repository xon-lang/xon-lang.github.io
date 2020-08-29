import { Component, NgZone, OnInit } from '@angular/core';
import { translateProgram as translatePython } from '@xon/translator-py';
import { translateProgram as translateTypescript } from '@xon/translator-ts';
import { Sample1 } from './samples/1';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  xonEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: '16px',
    renderValidationDecorations: 'off',
  };
  targetEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: '16px',
    renderValidationDecorations: 'off',
  };

  codeSamples = {
    hello: `console.log('Hello world!')`,
    sample1: Sample1,
  };

  currentTranslator = translateTypescript;
  translators = {
    typescript: translateTypescript,
    python: translatePython,
  };

  inputCode: string = this.codeSamples.hello;
  outputCode: string = this.currentTranslator(this.inputCode);

  error = '';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    console.error = (x) => {
      console.log(x);
      setTimeout(() => (this.error += (this.error ? '\n' : '') + x.toString()));
    };
  }

  changeSampleCode(e: any) {
    this.inputCode = this.codeSamples[e.value];
    this.translate();
  }

  changeTargetLanguage(e) {
    this.currentTranslator = this.translators[e.value];
    this.translate();
  }

  translate(code?) {
    try {
      this.error = '';
      this.outputCode = this.currentTranslator(code || this.inputCode);
    } catch (error) {
      this.error = error.toString();
    }
  }
}
