export interface PostContact {
  nameContact: string;
  phone: string;
}

export interface GetContact {
  id: number;
  nameContact: string;
  phone: string;
  idUser: number;
  photoUser: string;
  statusMessageUser: string;
  createdAt: string;
  updatedAt: string;
}