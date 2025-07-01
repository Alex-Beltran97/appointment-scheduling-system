import { Request, Response } from "express";
import { AppSource } from "../../data";
import { ProfileImg } from "../../models/auth";

class ProfileImgController {
  public async getImages(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppSource.getRepository(ProfileImg);
      const response = await repo.find();

      res.status(200).json({
        response,
        message: 'Profile images fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching profile images:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getImage(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ProfileImg);
      const image = await repo.findOneBy({ id });

      if (!image) {
        res.status(404).json({ message: 'Image not found' });
        return;
      }

      res.setHeader('Content-Type', image.mime);
      res.send(Buffer.from(image.data));
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async createImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No image file attached' });
        return;
      }

      const repo = AppSource.getRepository(ProfileImg);
      const image = repo.create({
        mime: req.file.mimetype,
        data: req.file.buffer
      });

      await repo.save(image);

      res.status(201).json({
        id: image.id,
        message: 'Image uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteImage(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    try {
      const repo = AppSource.getRepository(ProfileImg);
      const image = await repo.findOneBy({ id });

      if (!image) {
        res.status(404).json({ message: 'Image not found' });
        return;
      }

      await repo.remove(image);

      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new ProfileImgController();
