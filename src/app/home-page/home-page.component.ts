import { Component, OnInit } from '@angular/core';
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
  inputCode: string = Sample1;
  targetEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: '16px',
    renderValidationDecorations: 'off',
  };
  outputCode: string = Sample1;

  translators = {
    // typescript:
  }
  constructor() {}

  ngOnInit(): void {}

  changeSampleCode(e) {
    console.log(e);
  }

  changeTargetLanguage(e) {
    console.log(e);
  }
}
