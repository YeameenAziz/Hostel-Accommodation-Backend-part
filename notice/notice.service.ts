import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  // Home page route
  setNotice_HomePage(): string {
    return "This is the Notice Page!";
  }

  // Show all notices
  async getAll_Notice() {
    return await this.noticeRepository.find();
  }

  // Search a notice by using notice_id
  async getSearchNotice(notice_id: string) {
    const notice = await this.noticeRepository.findOne({ where: { notice_id: notice_id } });
    return notice || { message: "Notice not found!" };
  }

  // Add a new notice
  async addNewNotice(data: any) {
    const newNotice = this.noticeRepository.create(data);
    await this.noticeRepository.save(newNotice);
    return {
      message: "New Notice Added Successfully",
      Data: newNotice,
    };
  }

  // Update notice information
  async updateNotice(updateId: string, updatedData: any) {
    const notice = await this.noticeRepository.findOne({ where: { notice_id: updateId } });

    if (!notice) {
      return { message: "Notice not found!" };
    }

    await this.noticeRepository.update(notice.id, updatedData);
    return {
      message: "Notice updated successfully!",
      updatedNotice: { ...notice, ...updatedData },
    };
  }

  // Delete a notice by using notice_id
  async deleteNotice(notice_id: string) {
    const notice = await this.noticeRepository.findOne({ where: { notice_id: notice_id } });

    if (!notice) {
      return { message: "Notice not found!" };
    }

    await this.noticeRepository.delete(notice.id);
    return {
      message: `Notice with ID ${notice_id} deleted successfully.`,
      deletedNotice: notice,
    };
  }
}
