import { Injectable } from '@nestjs/common';
import { Locker } from './locker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LockerService {
    constructor(
        @InjectRepository(Locker)
        private readonly LockerRepository: Repository<Locker>,
      ) {}
    

    
        // Show All Locker for admin, 
        async ShowAllLocker_Admin(){
              try {
                return await this.LockerRepository.find(); 
              } catch (error) {
                return {
                    message: "Show All Locker can't work!", 
                    error_message: error.message
                }
              }
        }
    
    
        // Show Locker Status for user, 
        async ShowAllLocker_User(){
            try {
                return await this.LockerRepository.find({where: {locker_status:'free'}})                
            } catch (error) {
                return {
                    message: "Show Locker User Panel not work properly", 
                    error_message: error.message
                }
            }
        }
    
    
        // Adding new locker - admin, 
       async Add_New_Locker(lockerData){
            try {
                const registerLocker = this.LockerRepository.create(lockerData); 
                await this.LockerRepository.save(registerLocker); 
                return {
                    message: "New Locker Register Successfully", 
                    Registered_Data: registerLocker
                }
            } catch (error) {
                return {
                    message : "Add new locker can't work", 
                    error_message: error.message
                }
            }
        }
    
    
        // Update locking information - admin,
        async update_Locker_Info_Admin(lockerId,updateLockerData){
            try {
                const Locker = await this.LockerRepository.findOne({where:{locker_id:lockerId}}); 
                if(!Locker){
                    return { message: `${lockerId} locker not found!`}; 
                }
                await this.LockerRepository.update(Locker.id, updateLockerData); 
                return {
                    message: "Locker Information -Admin Panel Update Successfully!", 
                    Updated_Data : {...Locker, ...updateLockerData}
                }
            } catch (error) {
                return {
                    message: "Update Locker Information is not work properly", 
                    error_message: error.message
                }
            }
        }
    
    
        // book(Update) locker - user,
        async Reserved_locker_User(lockerId, booked_Data){
            try {
                const Locker = await this.LockerRepository.findOne({where: [{locker_id:lockerId}, {locker_status:"free"}]}); 
                if(!Locker){
                    return {message: `${lockerId} is not found!`}; 
                }
                await this.LockerRepository.update(Locker.id, booked_Data); 
                return {
                    message: `${lockerId} is reserved`, 
                    Locker_Data: {...Locker, ...booked_Data}
                }
            } catch (error) {
                return {
                    message: "User Reserve Locker is not work properly ", 
                    error_message: error.message
                }
            }
        }
        
        
        // Search Locker by admin
        async searchLocker_Admin(searchLockerId){
            try {
                const locker = await this.LockerRepository.findOne({where:{locker_id:searchLockerId}}); 
                return locker || {message: `${locker} not found`};   
            } catch (error) {
                return {
                    message: "Search Locker_Admin is not work properly", 
                    error_message: error.message
                }
            }
        }
    
    
    
        // Search locker by user, 
        async search_Locker_user(search_Locker_Id){
            try {
                const locker = await this.LockerRepository.findOne({where:[{locker_id:search_Locker_Id}, {locker_status:'free'}]}); 
                return locker || {message:`${search_Locker_Id} is not found`}; 
            } catch (error) {
                return {
                    message: "Search Locker_user is not work properly", 
                    error_message: error.message
                }
            }
        }
    
    
        // delete locker by admin, 
        async delete_Locker(deleteId){
            try {
               const  searchLocker = await this.LockerRepository.findOne({where: {locker_id:deleteId}}); 
               if(!searchLocker){
                return {message: `${searchLocker} not found`}; 
               }
               await this.LockerRepository.delete(searchLocker.id); 
               return {
                message: `${deleteId} locker is deleted successfully`, 
                Deleted_Data : searchLocker
               }
            } catch (error) {
                return {
                    message: "Delete Locker is not work properly", 
                    error_message: error.message
                }
            }
        }
}