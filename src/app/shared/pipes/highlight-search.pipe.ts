import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch',
  standalone: true
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string | null | undefined, searchTerm: string | null | undefined): SafeHtml {
    if (!text || !searchTerm?.trim()) {
      return text || '';
    }

    const searchWords = searchTerm
      .split(' ')
      .filter(word => word.trim().length > 0)
      .map(word => word.trim());

    if (searchWords.length === 0) {
      return text;
    }

    let highlightedText = text;

    searchWords.forEach(word => {
      const regex = new RegExp(`(${this.escapeRegExp(word)})`, 'gi');

      highlightedText = highlightedText.replace(regex,
        '<span class="search-highlight">$1</span>'
      );
    });

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
