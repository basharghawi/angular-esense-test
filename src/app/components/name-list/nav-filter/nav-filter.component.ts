import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: '.app-nav-filter',
    standalone: true,
    imports: [],
    templateUrl: './nav-filter.component.html',
    styleUrls: ['./nav-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavFilterComponent {
    @Output() filter = new EventEmitter<string>();

    onInput(event: Event) {
        const { value } = event.target as HTMLInputElement;
        this.filter.emit(value)
    }
}
