export type EventDto = {
  id?: number;
  name: string;
  eventDate: Date;
  numberOfPeople: number;
  budget: number;
  currency: string;
  imageUrl?: string;
  eventPassword?: string;
  organizerId: string;
  giftReceiverForLogInUser?: string;
  listOfInvitationForEvent: InvitationDto[];
};

export type InvitationDto = {
  participantName: string;
  participantSurname: string;
  participantEmail: string;
  participantStatus?: boolean;
  eventPassword?: string;
  giftReceiver?: string;
  event?: EventDto;
  user?: UserDto;
};

export type UserDto = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRoles: string[];
};