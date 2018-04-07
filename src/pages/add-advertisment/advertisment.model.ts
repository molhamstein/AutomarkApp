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

export class TruckModel {
    title: string;
    category: number;
    year: number;
    country: number;
    city: number;
    price: any;
    images: any[];
    createDate: string;
    endDate: any;
    user: number;
    truckCase: any;
    passedKiloeters: any;
    fuel: any;
    cylindersNumber: any;
    specifications: any;
    enginePower: any;
    color: any;
    loadQuantity: any;
    transmission: any;

    constructor() {
        this.title = null;
        this.year = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.user = null;
        this.truckCase = null;
        this.passedKiloeters = null;
        this.fuel = null;
        this.cylindersNumber = null;
        this.specifications = null;
        this.enginePower = null;
        this.loadQuantity = null;
        this.transmission = null;

        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 6;
        this.images = [];

    }

    public static mapModelToApiModel(truckModel) {
        return {
            title_c: truckModel.title,
            category_c: truckModel.category,
            year_c: truckModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: truckModel.price,
            Country_c: truckModel.country,
            city_c: truckModel.city,
            features_c: 0,
            images_c: truckModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: truckModel.createDate,
            end_c: 0,
            id_user: truckModel.user,
            act_c: 1,
            vzt_c: 1,
            cars_meta: [
                { "code_m": "thecaseofthetruck", "value_m": truckModel.truckCase },
                { "code_m": "kilometersconsumed", "value_m": `${truckModel.passedKiloeters}` },
                { "code_m": "fuel", "value_m": `${truckModel.fuel}` },
                { "code_m": "color", "value_m": `${truckModel.color}` },
                { "code_m": "enginepower", "value_m": `${truckModel.enginePower}` },
                { "code_m": "numberselender", "value_m": `${truckModel.cylindersNumber}` },
                { "code_m": "specifications", "value_m": `${truckModel.specifications}` },
                { "code_m": "howmuchload", "value_m": `${truckModel.loadQuantity}` },
                { "code_m": "transmission", "value_m": `${truckModel.transmission}` },
            ]
        }
    }
}

export class BoatModel {
    title: string;
    category: number;
    year: number;
    country: number;
    city: number;
    price: any;
    images: any[];
    createDate: string;
    endDate: any;
    user: number;
    boatCase: any;
    passedKiloeters: any;
    fuel: any;
    specifications: any;
    enginePower: any;
    color: any;
    loadQuantity: any;
    boatLength: any;
    engineSpeed: any;

    constructor() {
        this.title = null;
        this.year = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.user = null;
        this.boatCase = null;
        this.passedKiloeters = null;
        this.fuel = null;
        this.specifications = null;
        this.enginePower = null;
        this.loadQuantity = null;
        this.engineSpeed = null;
        this.boatLength = null;

        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 5;
        this.images = [];
    }

    public static mapModelToApiModel(boatModel) {
        return {
            title_c: boatModel.title,
            category_c: boatModel.category,
            year_c: boatModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: boatModel.price,
            Country_c: boatModel.country,
            city_c: boatModel.city,
            features_c: 0,
            images_c: boatModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: boatModel.createDate,
            end_c: 0,
            id_user: boatModel.user,
            act_c: 1,
            vzt_c: 1,
            cars_meta: [
                { "code_m": "thecaseoftheboat", "value_m": boatModel.boatCase },
                { "code_m": "kilometersconsumed", "value_m": `${boatModel.passedKiloeters}` },
                { "code_m": "fuel", "value_m": `${boatModel.fuel}` },
                { "code_m": "color", "value_m": `${boatModel.color}` },
                { "code_m": "enginepower", "value_m": `${boatModel.enginePower}` },
                { "code_m": "numberselender", "value_m": `${boatModel.cylindersNumber}` },
                { "code_m": "specifications", "value_m": `${boatModel.specifications}` },
                { "code_m": "howmuchload", "value_m": `${boatModel.loadQuantity}` },
                { "code_m": "enginespeed", "value_m": `${boatModel.engineSpeed}` },
                { "code_m": "lengthoftheboat", "value_m": `${boatModel.boatLength}` }
            ]
        }
    }
}

export class MobileNumberModel {
    title: string;
    category: number;
    country: number;
    city: number;
    price: any;
    createDate: string;
    endDate: any;
    user: number;
    mobileNumber: any;
    mobileProviderCompany: any;
    specification: any;
    
    constructor() {
        this.title = null;
        this.category = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.createDate = null;
        this.endDate = null;
        this.user = null;
        this.mobileNumber = null;
        this.mobileProviderCompany = null;
        this.specification = null;

        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 3;
    }

    public static mapModelToApiModel(mobileNumberModel) {
        return {
            title_c: mobileNumberModel.title,
            category_c: mobileNumberModel.category,
            year_c: mobileNumberModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: mobileNumberModel.price,
            Country_c: mobileNumberModel.country,
            city_c: mobileNumberModel.city,
            features_c: 0,
            images_c: mobileNumberModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: mobileNumberModel.createDate,
            end_c: 0,
            id_user: mobileNumberModel.user,
            act_c: 1,
            vzt_c: 1,
            cars_meta: [
                { "code_m": "mobilenumber", "value_m": `${mobileNumberModel.mobileNumber}` },
                { "code_m": "the_company_provided_the_service", "value_m": `${mobileNumberModel.mobileProviderCompany}` },
                { "code_m": "mobilecompany", "value_m": `${mobileNumberModel.mobileProviderCompany}` },
                { "code_m": "specifications", "value_m": `${mobileNumberModel.specification}` }
            ]
        }
    }
}

export class CarPalleteModel {
    title: string;
    category: number;
    country: number;
    city: number;
    price: any;
    createDate: string;
    endDate: any;
    user: number;
    specifications: any;
    carPalleteCategory: any;
    year: any;
    carPalleteType: any;
    carPalleteSymbol: any;
    palleteNumber: any;

    constructor() {
        this.title = null;
        this.country = null;
        this.city = null;
        this.price = null;
        this.createDate = null;
        this.endDate = null;
        this.user = null;
        this.specifications = null;
        this.carPalleteCategory = null;
        this.year = null;
        this.carPalleteType = null;
        this.carPalleteSymbol = null;
        this.palleteNumber = null;

        this.createDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        this.endDate = moment().add('1', 'years').utc().unix();
        this.category = 1;
    }

    public static mapModelToApiModel(mobileNumberModel) {
        return {

            title_c: mobileNumberModel.title,
            category_c: mobileNumberModel.category,
            year_c: mobileNumberModel.year,
            color_c: "",
            odometer_c: "",
            transmission_c: "",
            status_c: "",
            body_c: "",
            form_c: "",
            price_c: mobileNumberModel.price,
            Country_c: mobileNumberModel.country,
            city_c: mobileNumberModel.city,
            features_c: 0,
            images_c: mobileNumberModel.images,
            type_ads_c: "",
            shows_c: 0,
            description_c: "",
            special_c: "",
            dateadd_c: mobileNumberModel.createDate,
            end_c: 0,
            id_user: mobileNumberModel.user,
            act_c: 1,
            vzt_c: 1,
            "cars_meta": [
                { "code_m": "category", "value_m": `${mobileNumberModel.carPalleteCategory}` },
                { "code_m": "plate_number", "value_m": `[\'${mobileNumberModel.palleteNumber}\']` },
                { "code_m": "type_lo7a", "value_m": `${mobileNumberModel.carPalleteType}` },
                { "code_m": "symbol", "value_m": `${mobileNumberModel.carPalleteSymbol}` },
                { "code_m": "specifications", "value_m": `${mobileNumberModel.specifications}` }
            ]
        }
    }
}