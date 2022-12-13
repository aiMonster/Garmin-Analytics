import { Injectable } from '@angular/core';
import { IActivity } from '../interfaces/activity.interface';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { WidgetConfigs } from '../interfaces/widget-configs/widget-configs.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  userProfile: IUserProfile;

  async insertActivitiesAsync(activities: IActivity[]): Promise<void> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("activities", "readwrite");
      const store = transaction.objectStore("activities")

      activities.forEach(activity => store.add(activity));

      resolve();
    });
  }

  async getActivitiesAsync(): Promise<IActivity[]> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("activities", "readwrite");
      const request = transaction.objectStore("activities").getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

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

  async udpateWidgetAsync(configs: WidgetConfigs): Promise<void> {
    const dbConnection = await this.setupDbConnectionAsync();

    return new Promise((resolve) => {
      const transaction = dbConnection.transaction("widgets", "readwrite");
      const store = transaction.objectStore("widgets")

      const request = store.put(configs);

      request.onsuccess = function () {
        resolve();
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
        request.result.createObjectStore("activities", { keyPath: "startTimeLocal" });
      };

      request.onsuccess = function () {
        resolve(request.result);
      };
    });
  }
}
