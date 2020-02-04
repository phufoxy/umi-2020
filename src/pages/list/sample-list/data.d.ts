export interface Member {
  avatar: String,
  name: String,
  id: String,
}

export interface BasicListItemDataType {
  id: String
  owner: String,
  title: String,
  avatar: String,
  cover: String
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
