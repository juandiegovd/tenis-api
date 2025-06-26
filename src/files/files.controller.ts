import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MulterFile) {
        const fileName = file.originalname;
        const contentType = file.mimetype;
        const fileContent = file.buffer;

        try {
            const fileUrl = await this.fileService.uploadFile(fileName, fileContent, contentType);
            return { url: fileUrl };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}
