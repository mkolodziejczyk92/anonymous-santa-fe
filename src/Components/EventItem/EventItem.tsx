import { useAuth } from "../../Context/Auth/AuthContextPovider";
import "./EventItem.css";

export type EventItemPropsType = {
  id: string;
  name: string;
  date: string;
  peopleAmount: number;
  budget: number;
  currency: string;
  picture: string;
  participants?: EventItemParticipantsType[];
  logInUserIsAnOrganizer?: boolean;
  organizerId?: string;
  afterDraw?: boolean,
  giftReceiverForLogInUser?: string,
  deleteCallback?: (id: string) => void;
  openParticipantsCallback?: (id: string) => void;
};

export type EventItemParticipantsType = {
  participantName: string;
  participantSurname: string;
  participantEmail: string;
  takePartInInEvent?: boolean;
  eventPassword?: string;
  giftReceiver?: string;
  // event: EventDto;
  // user: UserDto;
};

const EventItem = ({
  id,
  name,
  date,
  peopleAmount,
  budget,
  currency,
  picture,
  deleteCallback,
  openParticipantsCallback,
  logInUserIsAnOrganizer,
  giftReceiverForLogInUser,
  afterDraw,
}: EventItemPropsType) => {
  const { token } = useAuth();

  const deleteEvent = () => {
    if (deleteCallback) {
      deleteCallback(id);
    }
  };
  const openParticipants = () => {
    if (openParticipantsCallback) {
      openParticipantsCallback(id);
    }
  };
  return (
    <li className="EventItem">
      <div className="EventItemPicture">
        {picture ? <img alt="eventPicture" src={picture} /> : <p>No picture</p>}
        <div className="EventItemButtonsContainer">
        {logInUserIsAnOrganizer ? (
      <>
        <button className="EventsItemParticipantsButton" onClick={openParticipants}>
          Participants
        </button>
        <button className="EventsItemDeleteButton" onClick={deleteEvent}>
          Delete
        </button>
      </>
    ) : (
      <p>
        <strong>{giftReceiverForLogInUser}</strong>
      </p>
    )}
        </div>
      </div>
      <div className="EventItemData">
        {name ? <h2>{name}</h2> : <p>No data</p>}
        <p>Date:</p>
        {date ? <span>{date}</span> : <span>No date data</span>}
        <p>People amount:</p>
        {peopleAmount && <span>{peopleAmount}</span>}
        <p>Budget:</p>
        {budget && currency && (
          <span>
            {budget} {currency}
          </span>
        )}
      </div>
    </li>
  );
};

export default EventItem;
