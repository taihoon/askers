import { Pipe, PipeTransform } from '@angular/core';
declare var showdown: any;

@Pipe({
  name: 'showdown'
})
export class ShowdownPipe implements PipeTransform {
  private converter: any;

  constructor() {
    this.converter = new showdown.Converter({
      'noHeaderId': true,
      'headerLevelStart': 3,
      'simplifiedAutoLink': true,
      'excludeTrailingPunctuationFromURLs': true,
      'literalMidWordUnderscores': true,
      'literalMidWordAsterisks': true,
      'strikethrough': true,
      'tables': true,
      'tasklists': true,
      'simpleLineBreaks': true,
      'backslashEscapesHTMLTags': true,
      'emoji': true,
      'extensions': ['htmlescape']
    } as any);
    this.converter.setFlavor('github');
  }

  transform(value: any, args?: any): any {
    return this.converter.makeHtml(value);
  }

}
