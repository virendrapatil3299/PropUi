export interface Property {
   id: number;
   zpid:  number;
  title: string;
  price: number;
  area: string;
  url: string;
      statusType?: "for sale" | "sold" | "for rent"|"unknown" ; 
       homeType:
    | "all"
    | "condo"
    | "house"
    | "townhouse"
    | "villa"
    | "loft"
    | "commercial"
    | "unknown";
      imgSrc: string;
       has3DModel?: string;
        address?: string;
         addressCity?: string; 
         addressStreet?: string; 
         addressState?: string; 
         addressZipcode?: string; 
         lat?: number; 
         lng?: number; 
         latLong?: { latitude: number ; longitude: number  }; 
         location?: string;
         baths?: number; 
         beds?: number; 
         builderName?: string; 
         overallScore?: number; 
         cashFlowScore?: number; 
         investmentStrategy?: string; 
         recommendedAction?: string; 
         grade?: string; 
         propertyId?: string; 
         statusText?: string; 
         flexFieldText?: string; 
         marketingStatusSimplifiedCd?: string; 
         gallery?: string[]; 
         tags?: string[]; 
         description?: string; 
         isNew?: boolean; 
         createdAt?: string;
         parking?:string;
         roi?: number;
}