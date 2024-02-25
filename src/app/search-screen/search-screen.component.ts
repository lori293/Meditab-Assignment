import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef; 

  searchFields: any[] = [
    { displayName: 'First Name', symbol: '/', value: '' },
    { displayName: 'Last Name', symbol: '@', value: '' },
    { displayName: 'Chart No', symbol: '#', value: '' },
    { displayName: 'Address 1', symbol: '$', value: '' }
  ];

  searchText: string = '';
  resultColumns: string[] = ['First Name', 'Last Name', 'Chart No', 'Address 1'];
  searchResults: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleFieldChange(event: any, field: any) {
    this.updateSearchText();
  }
  
  handleSearchInputChange(event: any) {
      const inputValue = event.target.value.trim();
      const inputs = inputValue.split(/(?=[/@#$])/);
      inputs.forEach((input: string) => {
        const symbol = input.charAt(0);
        const value = input.substring(1);
        const field = this.searchFields.find(f => f.symbol === symbol);
        if (field) {
          field.value = value;
        }
      });
  }

  handleEnterKey(event: any) {
    this.updateSearchText();
  }

  updateSearchText() {
    this.searchText = '';
    this.searchFields.forEach(field => {
    if (field.value) {
      this.searchText += `${field.symbol}${field.value}`;
    }
    });
  }

  clearSearch() {
    this.searchText = '';
    this.searchFields.forEach(field => {
      field.value = '';
    });
    this.searchResults = [];
    this.searchInput.nativeElement.value = ''; 
  }
}
