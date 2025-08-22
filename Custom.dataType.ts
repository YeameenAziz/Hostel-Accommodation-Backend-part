
export interface visitor_Data {
    entry_Date: Date, 
    entry_time: string, 
    visitor_name: string, 
    phone_no: string, 
    visit_reason: string
 }
 
 // Locker 
 export type LockerSizeType = 'medium' | 'normal' | 'large';
 export type LockerStatusType = 'reserved' | 'free'; 
 export type paymentStatusType = 'paid' | 'unpaid'; 
 
 
 export interface locker_Data{
    locker_id: string, 
    locker_size: LockerSizeType, 
    locker_status: LockerStatusType, 
    locker_rent_price: number, 
    locker_rent_by: string, 
    locker_rent_date:Date, 
    payment_status: paymentStatusType
 }
 
 export interface Reserve_Locker_type{
    locker_rent_by: string, 
    locker_rent_date:Date, 
    locker_status: LockerStatusType,
    payment_status: paymentStatusType
 }
 
 
 // Parking
 export type parking_type = 'car' | 'bike'; 
 export type parking_status_type = 'reserved' | 'free'; 
 export type payment_status_type = 'paid' | 'unpaid'; 
 
 export interface parkingData_type{
    parking_id: string, 
    parking_type: parking_type, 
    parking_rent: number, 
    parking_status:parking_status_type, 
    reserved_by: string | null,
    reserved_date:Date| null,
    payment_status:payment_status_type | null
 
 }