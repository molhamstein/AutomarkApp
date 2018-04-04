import * as moment from "moment";

export class CarModel {
    title: string;
    type: number;
    model: number;
    category: number;
    year: number;
    country: number;
    city: number;
    price: any;
    images: any[];
    createDate: string;
    endDate: any;
    user: number;
    case: any;
    passedKiloeters: any;
    transmission: any;
    fuel: any;
    carClass: any;
    supplier: any;
    cylindersNumber: any;
    specifications: any;

    constructor() {
        this.title = null;
        this.type = null;
        this.model = null;
        this.year = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.user = null;
        this.case = null;
        this.passedKiloeters = null;
        this.transmission = null;
        this.fuel = null;
        this.carClass = null;
        this.supplier = null;
        this.cylindersNumber = null;
        this.specifications = null;
        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 1;
        this.images = [];
    }

    public static mapModelToApiModel(carModel) {
        return {
            title_c: carModel.title,
            type_c: carModel.type,
            model_c: carModel.model,
            category_c: carModel.category,
            year_c: carModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: carModel.price,
            Country_c: carModel.country,
            city_c: carModel.city,
            features_c: 0,
            images_c: carModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: carModel.createDate,
            end_c: 0,
            id_user: carModel.user,
            act_c: 1,
            vzt_c: 1,
            cars_meta: [
                { "code_m": "case", "value_m": carModel.case },
                { "code_m": "kilometersconsumed", "value_m": `${carModel.passedKiloeters}` },
                { "code_m": "transmission", "value_m": `${carModel.transmission}` },
                { "code_m": "fuel", "value_m": `${carModel.fuel}` },
                { "code_m": "claas_car", "value_m": `${carModel.carClass}` },
                { "code_m": "supplier", "value_m": `${carModel.supplier}` },
                { "code_m": "numberselender", "value_m": `${carModel.cylindersNumber}` },
                { "code_m": "specifications", "value_m": `${carModel.specifications}` }
            ]
        }
    }
}

export class BikeModel {
    title: string;
    type: number;
    model: number;
    category: number;
    year: number;
    country: number;
    city: number;
    price: any;
    images: any[];
    createDate: string;
    endDate: any;
    user: number;
    bikeCase: any;
    passedKiloeters: any;
    fuel: any;
    cylindersNumber: any;
    specifications: any;
    enginePower: any;
    color: any;

    constructor() {
        this.title = null;
        this.year = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.user = null;
        this.bikeCase = null;
        this.passedKiloeters = null;
        this.fuel = null;
        this.cylindersNumber = null;
        this.specifications = null;
        this.enginePower = null;
        
        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 4;
        this.images = [];
    }

    public static mapModelToApiModel(bikeModel) {
        return {
            title_c: bikeModel.title,
            category_c: bikeModel.category,
            year_c: bikeModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: bikeModel.price,
            Country_c: bikeModel.country,
            city_c: bikeModel.city,
            features_c: 0,
            images_c: bikeModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: bikeModel.createDate,
            end_c: 0,
            id_user: bikeModel.user,
            act_c: 1,
            vzt_c: 1,
            cars_meta: [
                { "code_m": "bikecase", "value_m": bikeModel.case },
                { "code_m": "kilometersconsumed", "value_m": `${bikeModel.passedKiloeters}` },
                { "code_m": "fuel", "value_m": `${bikeModel.fuel}` },
                { "code_m": "color", "value_m": `${bikeModel.color}` },
                { "code_m": "enginepower", "value_m": `${bikeModel.enginePower}` },
                { "code_m": "numberselender", "value_m": `${bikeModel.cylindersNumber}` },
                { "code_m": "specifications", "value_m": `${bikeModel.specifications}` }
            ]
        }
    }
}
