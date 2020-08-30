import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { translateProgram as translatePython } from '@xon/translator-py';
import { translateProgram as translateTypescript } from '@xon/translator-ts';
import * as Split from 'split.js';
import { Sample1 } from './samples/1';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  inputEditorEnabled = true;
  outputEditorEnabled = true;

  inputEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: '16px',
    minimap: {
      enabled: false,
    },
    renderValidationDecorations: 'off',
  };
  outputEditorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    fontSize: '16px',
    minimap: {
      enabled: false,
    },
    renderValidationDecorations: 'off',
  };

  customCode = '';
  codeExamples = {
    custom: this.customCode,
    hello: `console.log('Hello world!')`,
    sample1: Sample1,
  };

  currentTranslator = translateTypescript;
  translators = {
    typescript: translateTypescript,
    python: translatePython,
  };

  inputCode: string = this.codeExamples.hello;
  outputCode: string = this.currentTranslator(this.inputCode);
  exampleValue = 'hello';
  targetValue = 'typescript';

  error = '';

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {
    activatedRoute.queryParams.subscribe((x) => {
      if (x.code) {
        this.inputCode = this.customCode = x.code;
        this.exampleValue = 'custom';
        this.translate();
      }
      if (x.target && x.target != this.targetValue) {
        this.changeTargetLanguage({ value: x.target });
      }
    });
  }

  ngOnInit(): void {
    const sizesString = localStorage.getItem('split-sizes');
    let sizes = [50, 50];
    if (sizes) {
      sizes = JSON.parse(sizesString);
    }
    (Split as any).default(['#input', '#output'], {
      gutterSize: 5,
      sizes,
      onDragEnd: (sizes) => {
        localStorage.setItem('split-sizes', JSON.stringify(sizes));
        this.inputEditorEnabled = false;
        this.outputEditorEnabled = false;
        setTimeout(() => {
          this.inputEditorEnabled = true;
          this.outputEditorEnabled = true;
        });
      },
    });
  }

  changeSampleCode(e: any) {
    this.inputCode = this.codeExamples[e.value];
    this.translate();
  }

  changeTargetLanguage(e) {
    this.targetValue = e.value;
    this.currentTranslator = this.translators[e.value];
    this.outputEditorEnabled = false;
    this.outputEditorOptions.language = e.value;
    setTimeout(() => (this.outputEditorEnabled = true));
    this.translate();
    this.router.navigate([], {
      queryParams: { target: e.value },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  translate(code?) {
    try {
      const prevConsoleError = console.error;
      console.error = (x) => {
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

  updateEditor = debounce((code) => {
    this.router.navigate([], {
      queryParams: { code: code || undefined },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  });
}

function debounce(func) {
  let timeout;
  return (x) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(x), 500);
  };
}
