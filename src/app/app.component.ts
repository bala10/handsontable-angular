import { Component } from '@angular/core';
import * as Handsontable from 'handsontable-pro';
import { HotTableRegisterer } from '@handsontable-pro/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private hotId: string = 'FormulasTable';
  private originalData: any[];
  private cells?: (row?: number, col?: number, prop?: object) => {};
  private duplicateData: any[];
  private field: string;
  private newValue: any[];

  constructor(private hotRegisterer: HotTableRegisterer) {
    this.originalData =[{"col1":"ADD", "col2":"2", "col3":"3", "col4":"=IF(C1=\"\",\"\",SUM(C1+B1))"},
    {"col1":"SUB", "col2":"3", "col3":"4", "col4":"=IF(C2=\"\",\"\",SUM(C2-B2))"},
    {"col1":"MUL", "col2":"4", "col3":"5", "col4":"=IF(C3=\"\",\"\",SUM(C3*B3))"},
    {"col1":"DIV", "col2":"5", "col3":"6", "col4":"=IF(C4=\"\",\"\",SUM(C4/B4))"},];
    this.cells = (row, col, prop): any => {
      const cellProperties: any = {};

      if (col === 0) {
        cellProperties.readOnly = true;
      }
      if (col === 3) {
        cellProperties.readOnly = true;
      }
      return cellProperties;
    }
  }
  getData(){
    const hotInstance = this.hotRegisterer.getInstance(this.hotId);
    this.duplicateData=hotInstance.getSourceData();
    this.field="col4";
    this.newValue=hotInstance.getDataAtCol(3);
    this.update();
  }
  update(){
    console.log(this.newValue);
    for( var k = 0; k < this.duplicateData.length; ++k ) {
          this.duplicateData[k][this.field] =''+this.newValue[k]+'';
      }
    console.log(this.duplicateData)
    console.log(this.originalData)
  }
}
