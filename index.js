import { createApi } from './api/apiDevWare.js';
import { MailModel } from './api/models/mailModel.js';
import { FotoModel } from './api/models/fotoModel.js';

createApi({ mailModel: MailModel, fotoModel: FotoModel});