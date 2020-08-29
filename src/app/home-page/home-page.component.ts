import { Component, NgZone, OnInit } from '@angular/core';
import { translateProgram as translatePython } from '@xon/translator-py';
import { translateProgram as translateTypescript } from '@xon/translator-ts';
import { Sample1 } from './samples/1';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  targetEditorEnabled = true;

  xonEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: '16px',
    renderValidationDecorations: 'off',
  };
  targetEditorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
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

  constructor(private activatedRoute: ActivatedRoute) {
    // activatedRoute.params.subscribe(x=>{

    // })
  }

  ngOnInit(): void {}

  changeSampleCode(e: any) {
    this.inputCode = this.codeSamples[e.value];
    this.translate();
  }

  changeTargetLanguage(e) {
    this.currentTranslator = this.translators[e.value];
    this.targetEditorEnabled = false;
    this.targetEditorOptions.language = e.value;
    setTimeout(() => (this.targetEditorEnabled = true));
    this.translate();
  }

  translate(code?) {
    try {
      const prevConsoleError = console.error;
      console.error = (x) => {
        console.log(x);
        setTimeout(
          () => (this.error += (this.error ? '\n' : '') + x.toString())
        );
      };
      this.error = '';
      this.outputCode = this.currentTranslator(code || this.inputCode);
      console.error = prevConsoleError;
    } catch (error) {
      this.error = error.toString();
    }
  }
}
