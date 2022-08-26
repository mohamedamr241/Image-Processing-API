import { Router, Request, Response } from 'express';
import path from 'path';
import data from '../../../data/data';
import * as fs from 'fs';
import { checkImageExistance } from './checkImageExistance';

import { resizeImage } from './resizeImage';

const image_routes = Router();

image_routes.get('/', async (req: Request, res: Response) => {
  //FIRST TAKE QUERY PARAMETERS
  const fileName = req.query.filename as string;
  const width = req.query.width as string;
  let Width;

  const height: string = req.query.height as string;
  let Height;
  const check = data.includes(fileName);

  //CHECK IF FILE OF EDITED IMAGES IS CREATED OR NOT
  fs.access('./images/edited-images', (err) => {
    if (err) {
      fs.mkdirSync('./images/edited-images');
    }
  });

  //VALIDATIONS OF THE INPUT
  if (typeof width == 'string' && typeof height == 'string') {
    Width = parseInt(width);
    Height = parseInt(height);
  }
  if (typeof fileName != 'string') {
    return res.status(404).send('please, Enter name of the image as a string');
  }
  if (Width === undefined || Height === undefined || fileName === undefined) {
    return res
      .status(404)
      .send('please, Enter name, width and height of the image');
  }
  if (!check) {
    return res.status(404).send("This image doesn't exist");
  }
  if (Width <= 0 || Height <= 0) {
    return res
      .status(404)
      .send(
        'Please, Enter height or width that is non negative and not equal to zero'
      );
  }
  if (isNaN(Width) || isNaN(Height)) {
    return res.status(404).send('height or width are missing');
  }
  //CHECK IF THE IMAGE EXISTS OR NOT
  if (checkImageExistance(fileName, Width, Height)) {
    return res.sendFile(
      path.resolve('./') +
        `/images/edited-images/${fileName}_${Width}_${Height}.jpg`
    );
  }

  //MAKING NAME OF THE EDITED IMAGE
  const edited_image: string = fileName + '_' + Width + '_' + Height + '.jpg';

  //RESIZING THE IMAGE AND SAVE IT TO FILE OF EDITED IMAGES
  try {
    await resizeImage(fileName, Width, Height, edited_image);
    //await sharp(`images/${fileName}.jpg`).resize({width: (Width as unknown) as number,height:(Height as unknown) as number}).toFile('./images/edited-images/'+edited_image);
  } catch (error) {
    console.log(error);
  }

  //IDENTIFY THE PATH OF LOCATION OF THE EDITED IMAGES
  const locationOfImage =
    path.resolve('./') +
    `/images/edited-images/${fileName}_${Width}_${Height}.jpg`;

  //SEND THE PATH AS A RESPONSE
  res.sendFile(locationOfImage);
});

export default image_routes;
