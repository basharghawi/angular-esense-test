import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Name } from '../interfaces/name.interface';
import { dataNames } from '../data/dataNames';

@Injectable({
    providedIn: 'root',
})
export class NameService {
    private LOCAL_STORAGE_KEY = 'name-list';
    private nameListSubject = new BehaviorSubject<Name[]>([]);
    private idCounter = 1;

    constructor() {
        this.loadInitialData();
    }

    private loadInitialData(): void {
        const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        const parsedData = storedData ? (JSON.parse(storedData) as Name[]) : dataNames;
        this.nameListSubject.next(parsedData);
        this.saveToLocalStorage(parsedData)

        // Update idCounter based on the stored data
        if (parsedData.length > 0) {
            this.idCounter = Math.max(...parsedData.map((item) => item.id)) + 1;
        }
    }

    private saveToLocalStorage(data: Name[]): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
        this.nameListSubject.next(data);
    }

    getNameList(): Observable<Name[]> {
        return this.nameListSubject.asObservable();
    }

    addName(name: Partial<Name>): void {
        const newName: Name = { id: this.idCounter++, name: name.name!, description: name.description! };
        const updatedList = [...this.nameListSubject.value, newName];
        this.saveToLocalStorage(updatedList);
    }

    updateName(updatedName: Name): void {
        const updatedList = this.nameListSubject.value.map((item) =>
            item.id === updatedName.id ? updatedName : item
        );
        this.saveToLocalStorage(updatedList);
    }

    deleteName(id: number): void {
        const updatedList = this.nameListSubject.value.filter((item) => item.id !== id);
        this.saveToLocalStorage(updatedList);
    }
}
