import { Injectable } from '@angular/core';
import { WidgetConfigs } from '../interfaces/widget-configs/widget-configs.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  async getAllWidgetsAsync(): Promise<WidgetConfigs[]> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("widgets", "readwrite");
      const store = transaction.objectStore("widgets")

      const request = store.getAll();

      request.onsuccess = function () {
        resolve(<WidgetConfigs[]>request.result);
      };
    });
  }

  async addWidgetAsync(configs: WidgetConfigs): Promise<number> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("widgets", "readwrite");
      const store = transaction.objectStore("widgets")

      const request = store.add(configs);

      request.onsuccess = function () {
        resolve(<number>request.result);
      };
    });
  }

  async removeWidgetAsync(id: number): Promise<void> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("widgets", "readwrite");
      const store = transaction.objectStore("widgets")

      const request = store.delete(id);

      request.onsuccess = function () {
        resolve();
      };
    });
  }

  private setupDbConnectionAsync(): Promise<IDBDatabase> {
    return new Promise((resolve) => {
      const request = indexedDB.open("GarminAnalyticsDB", 1);

      request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
      };

      request.onupgradeneeded = function () {
        request.result.createObjectStore("widgets", { keyPath: "id", autoIncrement: true });
      };

      request.onsuccess = function () {
        resolve(request.result);
      };
    });
  }
}
