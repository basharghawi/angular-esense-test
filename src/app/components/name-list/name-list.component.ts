import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Name } from 'src/app/interfaces/name.interface';
import { NameService } from 'src/app/services/name.service';
import { NavFilterComponent } from "./nav-filter/nav-filter.component";

@Component({
    selector: '.app-name-list',
    standalone: true,
    imports: [NgFor, NgIf, ReactiveFormsModule, NavFilterComponent],
    templateUrl: './name-list.component.html',
    styleUrls: ['./name-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameListComponent {
    form: FormGroup;
    $namesList = this.nameService.getNameList();
    selectedPopup: 'add' | 'edit' = 'add';
    popupData!: Name;
    isEditMode = false;
    names: Name[] = [];
    filteredNames: Name[] = [];
    

    constructor(private nameService: NameService, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        });

        this.nameService.getNameList().subscribe((data) => {
            this.names = data;
            this.filteredNames = data;
        });
    }

    onDelete(id: number) {
        this.nameService.deleteName(id);
    }

    onPopup(type: 'add' | 'edit', popupData?: Name) {
        const dialogEle = document.querySelector('#popup_dialog') as HTMLDialogElement;
        this.selectedPopup = type;
        if (popupData) {
            this.popupData = popupData;
        }
        dialogEle.showModal();
    }

    onDialogclose() {
        const dialogEle = document.querySelector('#popup_dialog') as HTMLDialogElement;
        dialogEle.close();
    }

    onSubmit() {
        if (!this.form.valid) return;
        
        if (this.selectedPopup === 'add') {
            this.nameService.addName(this.form.value)
            this.form.reset();
        } else if (this.selectedPopup === 'edit') {
            this.popupData.name = this.form.value.name
            this.popupData.description = this.form.value.description
            this.nameService.updateName(this.popupData)
            this.form.reset();
        }
        this.onDialogclose();
    }

    onFilter(keyword: string): void {
        this.filteredNames = this.names.filter((item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }
}
