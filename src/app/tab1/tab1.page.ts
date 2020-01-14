import { Component } from '@angular/core';
import { ScanService } from './../scan.service';
import { take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductInterface } from './../models/product-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public interactiveAnimationOption = {
    loop: true,
    prerender: false,
    autoplay: true,
    autoloadSegments: false,
    path: 'assets/animations/8502-scan-receipt.json'
  };

  public animation;

  public product: Product;

  public gaugeInfos: Map<string, any> = new Map<string, any>();

  constructor(private scanService: ScanService) {
    this.product = null;
  }

  public handleAnimation(animation): void {
    this.animation = animation;
  }

  public scanAction(): void {
    this.scanService.scan().then((product: Product) => {
        // Make gauge infos
        const nutrition: any = {
          value: this.nutritionValue(product.nutrition),
          label: 'Nutriscore',
          appendText: product.nutrition
        };
        this.gaugeInfos.set('nutrition', nutrition);

        const nova: any = {
          value: product.nova_groups * 25,
          label: 'Nova',
          appendText: product.nova_groups
        };

        this.gaugeInfos.set('nova', nova);

        this.product = product;
    });
  }

  public getGaugeInfo(key: string): any {
    return this.gaugeInfos.get(key);
  }

  private nutritionValue(nutritionGrade: string): number {
    let value: number;
    switch (nutritionGrade) {
      case 'a':
        value = 20;
      break;
      case 'b':
        value = 40;
      break;
      case 'c':
        value = 60;
      break;
      case 'd':
        value = 80;
      break;
      case 'e':
        value = 100;
      break;
    }

    return value;
  }
}
