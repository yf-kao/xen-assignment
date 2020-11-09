import { Picture } from './picture.entity';
import { PICTURE_REPOSITORY } from '../../core/constants';

export const picturesProviders = [
	{
		provide: PICTURE_REPOSITORY,
		useValue: Picture
	}
];
