import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolder,faFolderOpen,faCaretRight,faCaretDown, faFileCode, faFileImage } from '@fortawesome/free-solid-svg-icons';
import {faJava, faHtml5, faJs} from '@fortawesome/free-brands-svg-icons'
import { NgxFileComponent } from './ngx-file/ngx-file.component';
import { NgxFileExplorerComponent } from './ngx-file-explorer.component';

library.add(
    faFolder,
    faFolderOpen,
    faCaretRight,
    faCaretDown,
    faJava,
    faHtml5, 
    faJs, 
    faFileCode, 
    faFileImage
  );
@NgModule({
    imports: [CommonModule,FontAwesomeModule],
    declarations: [
      NgxFileComponent,
      NgxFileExplorerComponent
    ],
    exports: [
      NgxFileComponent,
      NgxFileExplorerComponent
    ]
  })
export class NgxFileExplorerModule{}