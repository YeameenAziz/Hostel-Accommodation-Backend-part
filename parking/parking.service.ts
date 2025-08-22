import { Injectable } from '@nestjs/common';
import { Parking } from './parking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingService {
    constructor(
            @InjectRepository(Parking)
            private readonly ParkingRepository: Repository<Parking>,
          ) {}


    // 1. Register New Parking
    async Register_New_Parking(parkingData){
        try {
            const register_new_parking = this.ParkingRepository.create(parkingData); 
            await this.ParkingRepository.save(register_new_parking); 
            return {
                message: "New Parking Information Added Successfully", 
                Added_Data : register_new_parking
            }
        } catch (error) {
            return {
                message: "Register New Parking is not work properly", 
                error_message: error.message
            }
        }
    }



    // 2. Show Parking All information - Admin
    async ShowAllParkingInfo_Admin(){
        try {
            return await this.ParkingRepository.find(); 
        } catch (error) {
            return {
                message:"All Parking Information Can't work Properly", 
                error_message: error.message
            }
        }
    }



    // 3. Show Just free parking Information - User
    async ShowParkingInfo_User(){
        try {
            return await this.ParkingRepository.find({where:{parking_status:"free"}}); 
        } catch (error) {
            return {
                message:"All Parking Information Can't work Properly", 
                error_message: error.message
            }
        }
    }
    // 4. Search All Parking Information - Admin,
    async SearchAllParking_Admin(searchId){
        try {
            const searchParking = await this.ParkingRepository.findOne({where:{parking_id:searchId}}); 
            return searchParking || {message: `${searchId} is not found`}; 
        } catch (error) {
            return {
                message: "Search All Parking by Admin is not work", 
                error_message: error.message
            }
        }
    }


    // 5. Search free Parking Information - User
    async SearchParking_User(searchId){
        try {
            const searchParking = await this.ParkingRepository.findOne({where: { parking_id: searchId, parking_status: "free" }});
            return searchParking || {message:`${searchId} is not found!`};  
        } catch (error) {
            return {
                message:"User Search Parking is not working", 
                error_message: error.message
            }
        }
    }

        
    // 6. Update Parking Information - Admin,
    async UpdateInfo_Admin(parkingId, updateData){
        try {
            const parking = await this.ParkingRepository.findOne({where:{parking_id:parkingId}}); 
            if(!parking){
                return {message: `${parkingId} is not found!`}
            }
            await this.ParkingRepository.update(parking.id, updateData); 
            return {
                message:"Parking Information Update Successfully", 
                Update_Data: {...parking, ...updateData}
            }
        } catch (error) {
            return {
                message: "Admin Update Info can't work properly", 
                error_message: error.message
            }
        }
    }



    // 7. Reserved only free Parking -User
    async UpdateInfo_User(parkingId, updateData){
        try {
            const parking = await this.ParkingRepository.findOne({where:{parking_id:parkingId, parking_status:"free"}}); 
            if(!parking){
                return {message: `${parkingId} is not found!`}
            }
            await this.ParkingRepository.update(parking.id, updateData); 
            return {
                message:"Parking Information Update Successfully", 
                Update_Data: {...parking, ...updateData}
            }
        } catch (error) {
            return {
                message: "User Update Info can't work properly", 
                error_message: error.message
            }
        }
    }



    // 8. Delete Parking Information - admin
    async Remove_Parking_Info_Admin(parkingID){
        try {
            const removeParking = await this.ParkingRepository.findOne({where:{parking_id:parkingID}}); 
            if(!removeParking){
                return {message:`${parkingID} is not found`}; 
            }
            await this.ParkingRepository.delete(removeParking.id); 
            return{
                message: `${parkingID} is removed successfully`, 
                Remove_Data: removeParking
            }
        } catch (error) {
            return {
                message: "Parking Information remove can't work properly", 
                error_message: error.message
            }
        }
    }


}