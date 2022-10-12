import { schema } from 'normalizr';

export const tagSchema = new schema.Entity('tags');
export const noticeSchema = new schema.Entity('notices', {
  tags: [tagSchema],
});
