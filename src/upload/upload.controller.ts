import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post('fichex')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './fichexs',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFichex(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('fichex/:fileId')
  async serveFichex(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'fichexs' });
  }
}
