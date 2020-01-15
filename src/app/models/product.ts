import { ProductInterface } from './product-interface';

export class Product implements ProductInterface{
    public product_name: string;
    public generic_name: string;
    public nova_groups: number;
    public image_url: string;
    public completeness: number;
    public nutrition_grade: string;
    public nutrition_grade_fr: string;
    public nutrition_grades_tags: string[];
    private nutriscore_data: any;
    public nutriscoreData: Map<string, any>;

    public get nutrition(): string {
        if (this.nutrition_grade) {
            return this.nutrition_grade;
        }
        if (this.nutrition_grade_fr) {
            return this.nutrition_grade_fr;
        }
        if (this.nutrition_grades_tags) {
            return this.nutrition_grades_tags[0];
        }
    }


    public deserialize(product: any): Product {
        Object.assign(this, product.product);

        this.nutriscoreData = new Map<string, any>();
        for (let attribute in this.nutriscore_data) {
            if (this.nutriscore_data.hasOwnProperty(attribute)){
                this.nutriscoreData.set(attribute, this.nutriscore_data[attribute]);
            }
        }
        return this;
    }
}
