import * as PropertySymbol from '../PropertySymbol.js';
import Storage from './Storage.js';

/**
 * Dataset factory.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/storage
 */
export default class StorageFactory {
	/**
	 * Creates a new storage.
	 */
	public static createStorage(): Storage {
		// Documentation for Proxy:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
		return new Proxy(new Storage(), {
			get(storage: Storage, key: string): string {
				if (Storage.prototype.hasOwnProperty(key)) {
					return storage[key];
				}
				return storage[PropertySymbol.data][key];
			},
			set(storage: Storage, key: string, value: string): boolean {
				if (Storage.prototype.hasOwnProperty(key)) {
					return true;
				}
				storage[PropertySymbol.data][key] = String(value);
				return true;
			},
			deleteProperty(storage: Storage, key: string): boolean {
				if (Storage.prototype.hasOwnProperty(key)) {
					return false;
				}
				return delete storage[PropertySymbol.data][key];
			},
			ownKeys(storage: Storage): string[] {
				return Object.keys(storage[PropertySymbol.data]);
			},
			has(storage: Storage, key: string): boolean {
				return storage[PropertySymbol.data][key] !== undefined;
			},
			defineProperty(storage: Storage, key: string, descriptor: PropertyDescriptor): boolean {
				if (Storage.prototype.hasOwnProperty(key) || descriptor.value === undefined) {
					return false;
				}
				storage[PropertySymbol.data][key] = String(descriptor.value);
				return true;
			},
			getOwnPropertyDescriptor(storage: Storage, key: string): PropertyDescriptor {
				if (
					Storage.prototype.hasOwnProperty(key) ||
					storage[PropertySymbol.data][key] === undefined
				) {
					return;
				}
				return {
					value: storage[PropertySymbol.data][key],
					writable: true,
					enumerable: true,
					configurable: false
				};
			}
		});
	}
}
