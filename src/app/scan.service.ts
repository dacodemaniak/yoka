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
    return new Promise<Product>((resolve) => {
      this.barcodeScanner.scan().then((barcodeResult: BarcodeScanResult) => {
        this.httpClient.get<ProductInterface>(
          `${this.api}${barcodeResult.text}.json`
        ).pipe(
          take(1)
        ).subscribe((result: ProductInterface) => {
          resolve(new Product().deserialize(result));
        });
      });      
    });
  }
}
