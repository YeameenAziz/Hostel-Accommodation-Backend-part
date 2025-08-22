import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity';

@Injectable()
export class VisitorService {
    constructor(
        @InjectRepository(Visitor)
        private readonly VisitorRepository: Repository<Visitor>,
      ) {}


    // Show All Visitor
    async ShowAllVisitor(){
        try {
           return await this.VisitorRepository.find(); 
        } catch (error) {
            return {
                message : "Can't Show All Visitor", 
                error_message: error.message
            }
        }
    }


    // Register New Visitor 
    async RegisterNewVisitor(registerData){
        try {
            const newVisitor = this.VisitorRepository.create(registerData);
            await this.VisitorRepository.save(newVisitor); 
            return{
               message: "New Visitor Registered Successfully", 
               Data : newVisitor
            } 
        } catch (error) {
            return {
                message: `New Visitor Register failed`, 
                Error_Message : error.message
            }
        }
      
    }


    // Search Visitor using Date, 
    async SearchVisitor(searchDate){
        try {
            const visitor = await this.VisitorRepository.findOne({where: {entry_Date: searchDate}}); 
            return visitor || {message: "Visitor not found !"}; 
        } catch (error) {
            return {
                message: "Search Visitor can't work", 
                error_message: error.message
            }
        }
    }


    // Update visitor Information ,
    async UpdateVisitor(visitor_id, updateData){
        try {
            const visitor = await this.VisitorRepository.findOne({where: {visitor_id: visitor_id}}); 
            if(!visitor){
                return {message: "Visitor not found!"}; 
            }

            await this.VisitorRepository.update(visitor.visitor_id, updateData); 
            return {
                message: "Visitor Information Update Successfully", 
                updateVisitor_Data: {...visitor, ...updateData}
            }
        } catch (error) {
            return {
                message: "Update Visitor can't work properly", 
                error_message: error.message
            }
        }
    }



    // Delete Visitor Information, 
    async DeleteVisitor(id){
        try {
          const visitor = await this.VisitorRepository.findOne({where: {visitor_id: id}}); 
          if(!visitor){
            return {
                message: "Visitor not found!"
            }
          }
          await this.VisitorRepository.delete(visitor.visitor_id)
          return {
            message: `Visitor with ID : ${id} deleted successful`, 
            deleteVisitor: visitor
          }
        } catch (error) {
           return {
            message: "Delete Visitor can't work properly", 
            error_message: error.message
           } 
        }
    }


}