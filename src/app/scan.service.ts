import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductInterface } from './models/product-interface';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private readonly api: string = 'https://world.openfoodfacts.org/api/v0/product/';

  constructor(
    private httpClient: HttpClient,
    private barcodeScanner: BarcodeScanner
  ) { }

  public scan(): Promise<Product> {
    console.log('Hello barcode scanner');
    return new Promise<Product>((resolve) => {
      this.barcodeScanner.scan().then((barcodeResult: BarcodeScanResult) => {
        // My stuff here...
        console.log(`Barcode says ${barcodeResult.text}`);
        this.httpClient.get<ProductInterface>(
          `${this.api}${barcodeResult.text}.json`
        ).pipe(
          take(1)
        ).subscribe((result: ProductInterface) => {
          resolve(new Product().deserialize(result));
        });
      });      
    })

  }
}
