import { Component } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
interface TextItem{
  title: string;
  body: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent {
searchTerm: string= '';

texts: TextItem[] = [
    {
      title:'Angular Introduction',
      body:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature'
    },
    {
      title:'Random text generator',
      body:'In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or.'
    }
  ];

  get filteredText(): TextItem[]{
    if(!this.searchTerm?.trim()) return [];

    const words = this.searchTerm.trim().split(/\s+/)
                        .map(w => w.toLocaleLowerCase());

                        return this.texts.filter(item =>
                          words.some(word => 
                            item.title.toLocaleLowerCase().split(/\W+/).includes(word) ||
                            item.body.toLocaleLowerCase().split(/\W+/).includes(word)
                          )
                        );
                      
  }
  constructor(private sanitizer: DomSanitizer){}
  highlight(text: string): SafeHtml{
    if (!this.searchTerm.trim()) return text;
    const escapedTerm = this.searchTerm.trim().split(/\s+/)
    .map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'));

    const regex = new RegExp(`(${escapedTerm.join('|')})`,'gi');
    const highlighted = text.replace(regex, `<span class="highlight">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }


}
