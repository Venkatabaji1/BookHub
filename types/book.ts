export interface Book {
  id: string;
  title: string;
  author: string;
  coverPic: string;
  rating: number;
  readStatus: string;
  publishedDate?: string;
  publishedYear?: number;
}

export interface BooksResponse {
  books: Book[];
  total: number;
}